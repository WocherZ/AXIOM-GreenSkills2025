import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseInterceptors,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  AnyFilesInterceptor,
  // FileFieldsInterceptor,
  // MemoryStorageFile,
  UploadedFiles,
} from '@blazity/nest-file-fastify';

import {
  ApiGetAllResponse,
  ApiGetOneResponse,
} from '../../common/http/responses/api-ok-response';
import { PageOptionsDto } from '../dtos/page/dto/page-options.dto';
import { PageMetaDto } from '../dtos/page/dto/page-meta.dto';
import { PageDto } from '../dtos/page/dto/page.dto';
import { FilesService } from '../services/files.service';
import { FilesUploadDto } from '../dtos/files/upload-file.dto';
import { CreateFileDto, ResFileDto } from '../dtos/files/create-file.dto';
import { JwtAuthGuard } from '../../common/guard/jwt-auth.guard';
import { RolesGuard } from '../../common/guard/permission.guard';

@ApiTags('Files')
@ApiExtraModels(ResFileDto)
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @ApiOperation({ summary: 'Загрузить файл' })
  @ApiGetOneResponse(ResFileDto)
  @UseInterceptors(AnyFilesInterceptor())
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Загрузить один файл',
    type: FilesUploadDto,
  })
  create(
    @UploadedFiles()
    files: any[],
    @Query() data: CreateFileDto,
  ) {
    return this.filesService.create(files, data);
  }

  @Get()
  @ApiOperation({ summary: 'Получить все файлы' })
  @ApiGetAllResponse(ResFileDto)
  async findAll(@Query() page: PageOptionsDto) {
    const [files, total] = await this.filesService.findAll(page);

    return new PageDto(
      files,
      new PageMetaDto({
        pageOptionsDto: page,
        itemCount: total,
      }),
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить один файл' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404, description: 'Файл не найден' })
  @ApiGetOneResponse(ResFileDto)
  findOne(@Param('id') id: string) {
    return this.filesService.findOneOrFail(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить файл' })
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 404, description: 'Файл не найден' })
  remove(@Param('id') id: string) {
    return this.filesService.remove(id);
  }
}
