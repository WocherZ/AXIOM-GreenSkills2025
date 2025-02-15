/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { randomUUID } from 'crypto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as PATH from 'path';

import { StorageService } from '../../modules/storage/storage.service';
import { CreateFileDto } from '../dtos/files/create-file.dto';
import { PageOptionsDto } from '../dtos/page/dto/page-options.dto';
import File from '../../database/entities/file.entity';
import { MemoryStorageFile } from '@blazity/nest-file-fastify';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private readonly filesRepository: Repository<File>,
    private readonly storageService: StorageService,
  ) {}

  async create(
    files: Array<MemoryStorageFile>,
    data: CreateFileDto,
  ): Promise<any[]> {
    const { path } = data;
    const filesResult = [];

    for (const file of files) {
      const [type, dir] = path.split('/');
      // const fileOriginalName = Buffer.from(
      //   //@ts-ignore
      //   file.originalFilename,
      //   'binary',
      // ).toString('utf8');
      //@ts-ignore
      const fileOriginalName = file?.originalFilename;
      //@ts-ignore
      console.log(1, file?.originalFilename);
      console.log(2, fileOriginalName);
      const extension = PATH.extname(fileOriginalName);
      const basename = PATH.basename(fileOriginalName, extension);
      const fileName = `${basename}-${Date.now()}${extension}`;
      const fileKey = `${path}/${fileName}`;
      const uploadFile = await this.storageService.uploadFile(
        file.buffer,
        fileKey,
      );

      const result = await this.filesRepository.save({
        id: randomUUID(),
        fileName,
        fileKey,
        type,
        dir,
        extension,
        fileUrl: `${process.env.MINIO_PUBLIC_ENDPOINT}/${process.env.MINIO_BUCKET_NAME}/${fileKey}`,
        mime: file.mimetype,
        size: file.size,
        s3id: uploadFile.ETag,
      });

      filesResult.push(result);
    }

    return filesResult;
  }

  public async findOneOrFail(id: string): Promise<File | never> {
    const file = await this.filesRepository.findOne({ where: { id } });

    if (!file) {
      throw new NotFoundException('Файл не найден');
    }

    return file;
  }

  async findAll(page: PageOptionsDto): Promise<[File[], number]> {
    return this.filesRepository.findAndCount({
      take: page.limit,
      skip: page.skip,
    });
  }

  async remove(id: string): Promise<void> {
    const file = await this.findOneOrFail(id);

    await this.storageService.deleteFile(file.fileKey);
    await this.filesRepository.delete(id);
  }
}
