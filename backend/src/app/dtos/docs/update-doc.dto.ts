import { ApiPropertyOptional } from '@nestjs/swagger';
import { SettingsProps } from '../../dtos/docs/create-doc.dto';
import {
  IsBoolean,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { DraftSlideContentProps } from './res-draft.dto';

export class UpdateDocDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  public title: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID('4')
  public previewId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID('4')
  public folderId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  public archived: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  public isFavorite: boolean;
}

export class UpdateDraftDocDto {
  @ApiPropertyOptional({ type: [DraftSlideContentProps], required: false })
  @ValidateNested({ each: true })
  @Type(() => DraftSlideContentProps)
  @IsOptional()
  public content: DraftSlideContentProps[];

  @ApiPropertyOptional({ type: SettingsProps, required: false })
  @ValidateNested({ each: true })
  @Type(() => SettingsProps)
  @IsOptional()
  public settings: SettingsProps;
}
