import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { PathTypes } from '../../../common/types/files.types';

export class CreateFileDto {
  @ApiProperty()
  @IsEnum(PathTypes)
  public readonly path: string;
}

export class ResFileDto {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public fileKey: string;

  @ApiProperty()
  public fileName: string;

  @ApiProperty()
  public type: string;

  @ApiProperty()
  public dir: string;

  @ApiProperty()
  public size: number;

  @ApiProperty()
  public extension: string;

  @ApiProperty()
  public mime: string;

  @ApiProperty()
  public s3id: string;

  @ApiProperty()
  public createdAt: Date;

  @ApiProperty()
  public updatedAt: Date;

  @ApiProperty()
  public fileUrl: string;
}
