import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

class ImageOptionsProps {
  @ApiPropertyOptional({ description: 'License type' })
  @IsOptional()
  license?: string;

  @ApiPropertyOptional({ description: 'Provider name' })
  @IsOptional()
  provider?: string;

  @ApiPropertyOptional({ description: 'Generation style' })
  @IsOptional()
  generateStyle?: string;

  @ApiPropertyOptional({ description: 'Model name' })
  @IsOptional()
  model?: string;

  @ApiPropertyOptional({ description: 'Style preset' })
  @IsOptional()
  stylePreset?: string;
}

class BackgroundProps {
  @ApiPropertyOptional({ description: 'Background type' })
  @IsOptional()
  type?: string;
}

class DocFlagsProps {
  @ApiPropertyOptional({ description: 'Card layouts enabled flag' })
  @IsOptional()
  cardLayoutsEnabled?: boolean;
}

class SettingsProps {
  @ApiPropertyOptional({ description: 'Default full bleed setting' })
  @IsOptional()
  defaultFullBleed?: string;

  @ApiPropertyOptional({ description: 'Styles derived from' })
  @IsOptional()
  stylesDerivedFrom?: string;

  @ApiPropertyOptional({ description: 'Card dimensions' })
  @IsOptional()
  cardDimensions?: string;

  @ApiPropertyOptional({ description: 'Vertical align' })
  @IsOptional()
  verticalAlign?: string;

  @ApiPropertyOptional({ description: 'Default content width' })
  @IsOptional()
  defaultContentWidth?: string;

  @ApiPropertyOptional({ description: 'Font size' })
  @IsOptional()
  fontSize?: string;

  @ApiPropertyOptional({ description: 'Scale content to fit flag' })
  @IsOptional()
  scaleContentToFit?: boolean;

  @ApiPropertyOptional({ description: 'Animations enabled flag' })
  @IsOptional()
  animationsEnabled?: boolean;
}

class GenerateInfoProps {
  @ApiPropertyOptional({ description: 'Interaction ID' })
  @IsOptional()
  interactionId?: string;

  @ApiPropertyOptional({ description: 'Stream ID' })
  @IsOptional()
  streamId?: string;

  @ApiPropertyOptional({ description: 'Last event ID' })
  @IsOptional()
  lastEventId?: string;

  @ApiPropertyOptional({ description: 'Last completed card ID' })
  @IsOptional()
  lastCompletedCardId?: string;

  @ApiPropertyOptional({ description: 'Last completed card index' })
  @IsOptional()
  lastCompletedCardIndex?: number;
}

export class CreateAttrsOptionsDto {
  @ApiPropertyOptional({ type: ImageOptionsProps, required: false })
  @ValidateNested({ each: true })
  @Type(() => ImageOptionsProps)
  @IsOptional()
  imageOptions?: ImageOptionsProps;

  @ApiPropertyOptional({ type: BackgroundProps, required: false })
  @ValidateNested({ each: true })
  @Type(() => BackgroundProps)
  @IsOptional()
  background?: BackgroundProps;

  @ApiPropertyOptional({ type: DocFlagsProps, required: false })
  @ValidateNested({ each: true })
  @Type(() => DocFlagsProps)
  @IsOptional()
  docFlags?: DocFlagsProps;

  @ApiPropertyOptional({ description: 'Format type' })
  @IsOptional()
  format?: string;

  @ApiPropertyOptional({ description: 'Custom code object' })
  @IsOptional()
  customCode?: Record<string, any>;

  @ApiPropertyOptional({ type: SettingsProps, required: false })
  @ValidateNested({ each: true })
  @Type(() => SettingsProps)
  @IsOptional()
  settings?: SettingsProps;

  @ApiPropertyOptional({ description: 'Generate status' })
  @IsOptional()
  generateStatus?: string;

  @ApiPropertyOptional({ type: GenerateInfoProps, required: false })
  @ValidateNested({ each: true })
  @Type(() => GenerateInfoProps)
  @IsOptional()
  generateInfo?: GenerateInfoProps;

  @ApiPropertyOptional({ description: 'Document ID' })
  @IsOptional()
  docId?: string;
}
