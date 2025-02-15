import { MemoryStorageFile } from '@blazity/nest-file-fastify';
import { BadRequestException, PipeTransform, Injectable } from '@nestjs/common';
import { extname } from 'path';

const MEGABYTE = 1024 * 1024;

const MAX_FILE_SIZE_IN_MB = 12;
const MAX_FILE_SIZE = MAX_FILE_SIZE_IN_MB * MEGABYTE;

const MAX_VIDEO_SIZE_IN_MB = 100;
const MAX_VIDEO_SIZE = MAX_VIDEO_SIZE_IN_MB * MEGABYTE;

const FILE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.tiff'];
const VIDEO_EXTENSIONS = ['.mp4', '.mov', '.avi'];

@Injectable()
export class ParseFile implements PipeTransform<unknown, unknown> {
  transform(value: { files: MemoryStorageFile[] }) {
    console.log('value', value);
    if (!value || !value?.files?.length)
      throw new BadRequestException('Запись отсутствует');

    value.files.forEach((el) => {
      const ext = extname(el.fieldname).toLowerCase();

      if (![...FILE_EXTENSIONS, ...VIDEO_EXTENSIONS].includes(ext)) {
        throw new BadRequestException('Недопустмый формат файла');
      }
      if (el.size >= MAX_FILE_SIZE && FILE_EXTENSIONS.includes(ext)) {
        throw new BadRequestException(
          `Размер файла ${el.fieldname} превышает ${MAX_FILE_SIZE_IN_MB}MB`,
        );
      }

      if (el.size >= MAX_VIDEO_SIZE && VIDEO_EXTENSIONS.includes(ext)) {
        throw new BadRequestException(
          `Размер файла ${el.fieldname} превышает ${MAX_VIDEO_SIZE_IN_MB}MB`,
        );
      }
    });

    return value;
  }
}
