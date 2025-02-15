import { Injectable, NotFoundException } from '@nestjs/common';
import User from '@entities/access/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import Document from '@entities/documents/docs.entity';
import { PageOptionsDto } from '@dto/page/dto/page-options.dto';
import File from '@entities/file.entity';
import Folder from '@entities/workspace/folders.entity';
import DocGenerateInput from '@entities/documents/draft-document.entity';
import { UpdateDocDto, UpdateDraftDocDto } from '@dto/docs/update-doc.dto';
import { LlmService } from 'src/modules/llm/llm.service';
import { DocGenerateStatus } from '@common/enum/docs.enum';
import { DocSlidePropsDto } from '@dto/docs/update-slide.dto';
import Slide from '@entities/documents/slide.entity';
import { DocGenerateDto, SettingsProps } from '@dto/docs/create-doc.dto';
import { Theme } from '@entities/documents/theme.entity';
import { MemoryStorageFile } from '@blazity/nest-file-fastify';
import { FilesService } from '@services/files.service';
import { FileUploadBodyDto } from '@dto/files/upload-file.dto';
import { CreateContentSlideDto } from '@dto/docs/content-slide.dto';

@Injectable()
export class DocsService {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
    @InjectRepository(DocGenerateInput)
    private readonly documentDraftRepository: Repository<DocGenerateInput>,
    @InjectRepository(Folder)
    private readonly folderRepository: Repository<Folder>,
    @InjectRepository(Slide)
    private readonly slideRepository: Repository<Slide>,
    @InjectRepository(Theme)
    private readonly themeRepository: Repository<Theme>,
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,

    private readonly llmService: LlmService,
    private readonly fileService: FilesService,
    private readonly entityManager: EntityManager,
  ) {}

  async generateDraftDocument(data: DocGenerateDto, user: User) {
    const res = await this.llmService.generateSlides(data.prompt);

    const draft = this.documentDraftRepository.create({
      id: randomUUID(),
      prompt: data.prompt,
      content: res,
      status: DocGenerateStatus.DRAFT,
      settings: new SettingsProps(),
      createdBy: user,
    });
    await this.documentDraftRepository.insert(draft);

    return draft;
  }

  async uploadFileAsPrompt(
    file: Array<MemoryStorageFile>,
    query: FileUploadBodyDto,
    user: User,
  ) {
    await this.fileService.create(file, query);
    const res = await this.llmService.generateSlidesFromFile(
      query.prompt,
      file[0].buffer.toString(),
    );

    return this.entityManager.transaction(async (tr) => {
      const draft = this.documentDraftRepository.create({
        id: randomUUID(),
        prompt: query.prompt,
        content: res,
        status: DocGenerateStatus.DRAFT,
        settings: new SettingsProps(),
        createdBy: user,
      });

      await tr.insert(DocGenerateInput, draft);

      const doc = this.documentRepository.create({
        id: randomUUID(),
        content: res,
        docGenerateId: draft.id,
        workspaceId: user.workspace.id,
        createdBy: user,
      });

      await tr.insert(Document, doc);

      return doc;
    });
  }

  async generateContentDoc(draftId: string, user: User) {
    const draft = await this.findOneDraftOrFail(draftId, user);

    const res = await this.llmService.generateSlidesContent(
      draft.prompt,
      JSON.stringify(draft.content),
    );

    const doc = this.documentRepository.create({
      id: randomUUID(),
      content: res,
      docGenerateId: draft.id,
      workspaceId: user.workspace.id,
      createdBy: user,
    });

    await this.documentRepository.insert(doc);

    return doc;
  }

  async generateSlidesDoc(data: CreateContentSlideDto, user: User) {
    await this.documentRepository.findOneByOrFail({
      id: data.documentId,
      userId: user.id,
    });

    const slides = data.slides.map((el) => {
      return this.slideRepository.create({
        id: randomUUID(),
        documentId: data.documentId,
        attrs: el.attrs,
        content: el.content,
      });
    });

    await this.slideRepository.insert(slides);
  }

  async updateDraftDocument(id: string, data: UpdateDraftDocDto, user: User) {
    const draft = await this.findOneDraftOrFail(id, user);

    if (data.settings?.themeId) {
      await this.themeRepository.findOneByOrFail({ id: data.settings.themeId });
    }

    await this.documentDraftRepository.update(id, data);

    return draft;
  }

  async draftsFindAll(
    page: PageOptionsDto,
    user: User,
  ): Promise<[DocGenerateInput[], number]> {
    return this.documentDraftRepository.findAndCount({
      where: {
        userId: user.id,
      },
      take: page.limit,
      skip: page.skip,
    });
  }

  async findAll(
    page: PageOptionsDto,
    user: User,
  ): Promise<[Document[], number]> {
    return this.documentRepository.findAndCount({
      where: {
        userId: user.id,
      },
      relations: {
        docGenerateInput: true,
        preview: true,
        folder: true,
      },
      take: page.limit,
      skip: page.skip,
    });
  }

  async findOne(id: string, user: User) {
    const docs = await this.documentRepository.findOne({
      where: {
        id,
        userId: user.id,
      },
      relations: {
        slides: true,
        theme: true,
        preview: true,
        folder: true,
      },
    });

    if (!docs) {
      throw new NotFoundException('Document Not Found');
    }

    return docs;
  }

  async findOneDraftOrFail(id: string, user: User) {
    const draft = await this.documentDraftRepository.findOne({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!draft) {
      throw new NotFoundException('Document Not Found');
    }

    return draft;
  }

  async findOneSlideOrFail(id: string, documentId: string, user: User) {
    const slide = await this.slideRepository.findOne({
      where: {
        id,
        document: {
          id: documentId,
          userId: user.id,
        },
      },
      relations: {
        document: true,
      },
    });

    if (!slide) {
      throw new NotFoundException('Slide Not Found');
    }

    return slide;
  }

  async update(id: string, data: UpdateDocDto, user: User) {
    const doc = await this.findOne(id, user);

    if (data.folderId) {
      doc.folder = await this.folderRepository.findOneByOrFail({
        id: data.folderId,
      });
    }

    if (data.previewId) {
      doc.preview = await this.fileRepository.findOneByOrFail({
        id: data.previewId,
      });
    }

    return this.documentRepository.save({ ...doc, ...data });
  }

  async updateSlide(
    id: string,
    slideId: string,
    data: DocSlidePropsDto,
    user: User,
  ) {
    await this.findOneSlideOrFail(slideId, id, user);

    await this.slideRepository.update({ id }, data);
  }

  async deleteSlide(id: string, slideId: string, user: User) {
    await this.findOneSlideOrFail(slideId, id, user);

    await this.slideRepository.delete({ id: slideId });
  }

  async remove(id: string) {
    await this.documentRepository.delete(id);
  }
}
