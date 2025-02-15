import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { DocsService } from '../services/docs/docs.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiGetAllResponse } from '@common/http/responses/api-ok-response';
import { PageOptionsDto } from '@dto/page/dto/page-options.dto';
import { PageDto } from '@dto/page/dto/page.dto';
import { PageMetaDto } from '@dto/page/dto/page-meta.dto';
import Document from '@entities/documents/docs.entity';
import User from '@entities/access/user.entity';
import { ReqUser } from '@common/decorators/user.decorator';
import { JwtAuthGuard } from '@common/guard/jwt-auth.guard';
import { DocGenerateDto, SettingsProps } from '@dto/docs/create-doc.dto';
import { UpdateDocDto, UpdateDraftDocDto } from '@dto/docs/update-doc.dto';
import { DocSlidePropsDto } from '@dto/docs/update-slide.dto';
import Slide from '@entities/documents/slide.entity';
import DocGenerateInput from '@entities/documents/draft-document.entity';
import {
  AnyFilesInterceptor,
  MemoryStorageFile,
  UploadedFiles,
} from '@blazity/nest-file-fastify';
import { FileUploadBodyDto, FileUploadDto } from '@dto/files/upload-file.dto';
import { CreateContentSlideDto } from '@dto/docs/content-slide.dto';

@ApiTags('Docs')
@ApiExtraModels(Document, Slide, DocGenerateInput, SettingsProps)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('docs')
export class DocsController {
  constructor(private readonly docsService: DocsService) {}

  @Post('draft')
  @ApiOperation({ summary: 'Создать черновик презентации' })
  @ApiResponse({ status: 200, type: DocGenerateInput })
  draft(@Body() data: DocGenerateDto, @ReqUser() user: User) {
    return this.docsService.generateDraftDocument(data, user);
  }

  @Post(':draftId/generate')
  @ApiOperation({ summary: 'Сгенерировать контент слайдов для презентации' })
  @ApiResponse({ status: 200, type: Document })
  generateDoc(@Param('draftId') draftId: string, @ReqUser() user: User) {
    return this.docsService.generateContentDoc(draftId, user);
  }

  @Post('slides/generate')
  @ApiOperation({ summary: 'Сгенерировать контент слайдов для презентации' })
  @ApiResponse({ status: 200, type: [Slide] })
  generateSlidesDoc(
    @Body() data: CreateContentSlideDto,
    @ReqUser() user: User,
  ) {
    return this.docsService.generateSlidesDoc(data, user);
  }

  @Get('draft')
  @ApiOperation({ summary: 'Получить свои черновики презентации' })
  @ApiGetAllResponse(DocGenerateInput)
  async draftsFindAll(@Query() page: PageOptionsDto, @ReqUser() user: User) {
    const [data, total] = await this.docsService.draftsFindAll(page, user);

    return new PageDto(
      data,
      new PageMetaDto({
        pageOptionsDto: page,
        itemCount: total,
      }),
    );
  }

  @Patch('draft/:draftId')
  @ApiOperation({ summary: 'Обновить черновик презентации' })
  @ApiResponse({ status: 200, type: DocGenerateInput })
  updateDraft(
    @Param('draftId') draftId: string,
    @Body() data: UpdateDraftDocDto,
    @ReqUser() user: User,
  ) {
    return this.docsService.updateDraftDocument(draftId, data, user);
  }

  @Post('upload')
  @ApiOperation({ summary: 'Загрузить файл' })
  // @ApiGetOneResponse(File)
  @UseInterceptors(AnyFilesInterceptor())
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Загрузить один файл',
    type: FileUploadDto,
  })
  async uploadFileAsPrompt(
    @UploadedFiles()
    file: Array<MemoryStorageFile>,
    @Body() data: FileUploadBodyDto,
    @ReqUser() user: User,
  ) {
    console.log(data);
    await this.docsService.uploadFileAsPrompt(file, data, user);
  }

  @Get()
  @ApiOperation({ summary: 'Получить свои презентации' })
  @ApiGetAllResponse(Document)
  async findAll(@Query() page: PageOptionsDto, @ReqUser() user: User) {
    const [data, total] = await this.docsService.findAll(page, user);

    return new PageDto(
      data,
      new PageMetaDto({
        pageOptionsDto: page,
        itemCount: total,
      }),
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить презентацию' })
  @ApiResponse({ status: 404, description: 'Презентация не найдена' })
  @ApiResponse({ status: 200, type: Document })
  findOne(@Param('id') id: string, @ReqUser() user: User) {
    return this.docsService.findOne(id, user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить презентацию' })
  @ApiResponse({ status: 404, description: 'Презентация не найдена' })
  @ApiResponse({ status: 200, type: Document })
  update(
    @Param('id') id: string,
    @Body() data: UpdateDocDto,
    @ReqUser() user: User,
  ) {
    return this.docsService.update(id, data, user);
  }

  @Patch(':id/slide/:slideId')
  @ApiOperation({ summary: 'Обновить слайд презентации' })
  @ApiResponse({ status: 404, description: 'Слайд не найден' })
  @ApiResponse({ status: 200, type: Slide })
  updateSlide(
    @Param('id') id: string,
    @Param('slideId') slideId: string,
    @Body() data: DocSlidePropsDto,
    @ReqUser() user: User,
  ) {
    return this.docsService.updateSlide(id, slideId, data, user);
  }

  @Delete(':id/slide/:slideId')
  @ApiOperation({ summary: 'Удалить слайд презентации' })
  @ApiResponse({ status: 404, description: 'Слайд не найден' })
  @ApiResponse({ status: 201 })
  removeSlide(
    @Param('id') id: string,
    @Param('slideId') slideId: string,
    @ReqUser() user: User,
  ) {
    return this.docsService.deleteSlide(id, slideId, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить презентацию' })
  @ApiResponse({ status: 404, description: 'Презентация не найдена' })
  @ApiResponse({ status: 201 })
  remove(@Param('id') id: string) {
    return this.docsService.remove(id);
  }
}
