import {
  CardDimensions,
  DefaultFullBleed,
  EditorMode,
  ImageProvider,
  StyleTemplate,
  TextAmount,
  TextMode,
  VerticalAlign,
} from '@common/enum/docs.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { DocSlidePropsDto } from './update-slide.dto';
import { Type } from 'class-transformer';
export class CreateDocDto {
  @ApiProperty()
  @IsString()
  public title: string;

  @ApiProperty()
  @IsUUID('4')
  public docGenerateInputId: string;

  @ApiProperty({ type: [DocSlidePropsDto] })
  @ValidateNested({ each: true })
  @Type(() => DocSlidePropsDto)
  public slides: string;
}

export class DocGenerateDto {
  @ApiProperty()
  @IsString()
  public prompt: string;
}

export class SettingsProps {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  public tone: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  public locale: string = 'ru';

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  public audience: string;

  @ApiPropertyOptional()
  @IsEnum(TextMode)
  @IsOptional()
  public textMode: TextMode = TextMode.EDIT;

  @ApiPropertyOptional()
  @IsEnum(EditorMode)
  @IsOptional()
  public editorMode: EditorMode = EditorMode.STRUCTURED;

  @ApiPropertyOptional()
  @IsEnum(TextAmount)
  @IsOptional()
  public textAmount: TextAmount = TextAmount.MEDIUM;

  @ApiPropertyOptional()
  @IsEnum(ImageProvider)
  @IsOptional()
  public imageProvider: ImageProvider = ImageProvider.AI_GENERATED;

  @ApiPropertyOptional()
  @IsEnum(StyleTemplate)
  @IsOptional()
  public styleTemplate: StyleTemplate = StyleTemplate.DEFAULT;

  @ApiPropertyOptional()
  @IsEnum(VerticalAlign)
  @IsOptional()
  public verticalAlign: VerticalAlign = VerticalAlign.CENTER;

  @ApiPropertyOptional()
  @IsEnum(CardDimensions)
  @IsOptional()
  public cardDimensions: CardDimensions = CardDimensions.FIXED;

  @ApiPropertyOptional()
  @IsEnum(DefaultFullBleed)
  @IsOptional()
  public defaultFullBleed: DefaultFullBleed = DefaultFullBleed.CONTAINED;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  public scaleContentToFit: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  public stylesDerivedFrom?: string;

  @ApiPropertyOptional()
  @IsEnum(TextAmount)
  @IsOptional()
  public defaultContentWidth: TextAmount = TextAmount.MEDIUM;

  @ApiPropertyOptional()
  @IsInt()
  @Min(8)
  @Max(16)
  @IsOptional()
  public numCards: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  public themeId: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  public fontSize: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  public imageLicense: string;
}
