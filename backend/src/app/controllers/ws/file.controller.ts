import {
  FileFieldsInterceptor,
  MemoryStorageFile,
} from '@blazity/nest-file-fastify';
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AsyncApiPub, AsyncApiSub } from 'nestjs-asyncapi';
import {
  ApiSubUploadFile,
  FileUploadDto,
} from '../../dtos/files/upload-file.dto';

@Controller('ws')
@ApiTags('WebSocket')
export class WebsocketController {
  @Post('upload')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'files', maxCount: 50 }]))
  @AsyncApiPub({
    channel: 'uploadFile',
    summary: 'Upload a file',
    message: {
      payload: FileUploadDto,
    },
  })
  @AsyncApiSub({
    channel: 'uploadFile',
    summary: 'Receive file upload confirmation',
    message: {
      payload: ApiSubUploadFile,
    },
  })
  uploadFile(@UploadedFile() file: Array<MemoryStorageFile>) {
    // Здесь вы можете обработать загруженный файл
    return { message: 'File uploaded successfully' };
  }
}
