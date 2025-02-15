import { ApiProperty } from '@nestjs/swagger';
import { PathTypes, PathTypesString } from '../../../common/types/files.types';
import { IsString, MaxLength } from 'class-validator';

export class FilesUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  public readonly files: Buffer;

  @ApiProperty({ enum: PathTypes })
  public readonly path: PathTypesString;
}

export class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  public readonly file: Buffer;

  @ApiProperty({ enum: PathTypes })
  public readonly path: PathTypesString;

  @ApiProperty()
  @IsString()
  @MaxLength(256)
  public readonly prompt: PathTypesString;
}

export class FileUploadBodyDto {
  @ApiProperty({ enum: PathTypes })
  public readonly path: PathTypesString;

  @ApiProperty()
  @IsString()
  @MaxLength(256)
  public readonly prompt: PathTypesString;
}

export class ApiSubUploadFile {
  public readonly message: string;
}
