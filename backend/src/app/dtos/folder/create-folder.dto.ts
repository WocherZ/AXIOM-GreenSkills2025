import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateFolderDto {
  @ApiProperty()
  @IsString()
  public name: string;
}
