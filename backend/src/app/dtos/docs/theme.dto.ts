import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

class Color {
  @ApiPropertyOptional({ description: 'Hex color code' })
  @IsOptional()
  @IsString()
  hex?: string;
}

class ImageMeta {
  @ApiPropertyOptional({ description: 'Image width' })
  @IsOptional()
  @IsNumber()
  width?: number;

  @ApiPropertyOptional({ description: 'Image height' })
  @IsOptional()
  @IsNumber()
  height?: number;

  @ApiPropertyOptional({ description: 'Image colorspace' })
  @IsOptional()
  @IsString()
  colorspace?: string;

  @ApiPropertyOptional({ description: 'Image frame count' })
  @IsOptional()
  @IsNumber()
  frame_count?: number;

  @ApiPropertyOptional({ description: 'Image aspect ratio' })
  @IsOptional()
  @IsNumber()
  aspect_ratio?: number;

  @ApiPropertyOptional({ description: 'Image average color' })
  @IsOptional()
  @IsString()
  average_color?: string;

  @ApiPropertyOptional({ description: 'Image has transparency' })
  @IsOptional()
  @IsBoolean()
  has_transparency?: boolean;

  @ApiPropertyOptional({ description: 'Image has clipping path' })
  @IsOptional()
  @IsBoolean()
  has_clipping_path?: boolean;

  @ApiPropertyOptional({ description: 'Image date file modified' })
  @IsOptional()
  @IsString()
  date_file_modified?: string;
}

class Image {
  @ApiPropertyOptional({ description: 'Image src' })
  @IsOptional()
  @IsString()
  src?: string;

  @ApiPropertyOptional({ description: 'Image meta' })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ImageMeta)
  meta?: ImageMeta;

  @ApiPropertyOptional({ description: 'Image name' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Image source' })
  @IsOptional()
  @IsString()
  source?: string;

  @ApiPropertyOptional({ description: 'Image upload status' })
  @IsOptional()
  @IsNumber()
  uploadStatus?: number;

  @ApiPropertyOptional({ description: 'Image show placeholder' })
  @IsOptional()
  @IsBoolean()
  showPlaceholder?: boolean;

  @ApiPropertyOptional({ description: 'Image upload result step' })
  @IsOptional()
  @IsString()
  uploadResultStep?: string;
}

class Background {
  @ApiPropertyOptional({ description: 'Background type' })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiPropertyOptional({ type: Color, required: false })
  @ValidateNested({ each: true })
  @Type(() => Color)
  @IsOptional()
  color?: Color;

  @ApiPropertyOptional({ type: Image, required: false })
  @ValidateNested({ each: true })
  @Type(() => Image)
  @IsOptional()
  image?: Image;

  @ApiPropertyOptional({ description: 'Background source' })
  @IsOptional()
  @IsString()
  source?: string;
}

class AccentGradient {
  @ApiPropertyOptional({ description: 'Gradient angle' })
  @IsOptional()
  @IsNumber()
  angle?: number;

  @ApiPropertyOptional({ description: 'Gradient colors' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  colors?: string[];

  @ApiPropertyOptional({ description: 'Gradient disabled' })
  @IsOptional()
  @IsBoolean()
  disabled?: boolean;
}

class CardBackground {
  @ApiPropertyOptional({ description: 'Card background type' })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiPropertyOptional({ type: Color, required: false })
  @ValidateNested({ each: true })
  @Type(() => Color)
  @IsOptional()
  color?: Color;
}

class AccentBackground {
  @ApiPropertyOptional({ description: 'Accent background type' })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiPropertyOptional({ type: Image, required: false })
  @ValidateNested({ each: true })
  @Type(() => Image)
  @IsOptional()
  image?: Image;

  @ApiPropertyOptional({ description: 'Accent background source' })
  @IsOptional()
  @IsString()
  source?: string;

  @ApiPropertyOptional({ description: 'Accent background accent ID' })
  @IsOptional()
  @IsString()
  accentId?: string;

  @ApiPropertyOptional({ description: 'Accent background original source' })
  @IsOptional()
  @IsString()
  originalSource?: string;
}

class ConfigKeyWordsProps {
  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tone?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  color?: string[];
}
class Config {
  @ApiPropertyOptional({ description: 'Font size' })
  @IsOptional()
  @IsNumber()
  fontSize?: number;

  @ApiPropertyOptional({ description: 'Keywords' })
  @ValidateNested({ each: true })
  @Type(() => ConfigKeyWordsProps)
  @IsOptional()
  keywords?: ConfigKeyWordsProps;

  @ApiPropertyOptional({ description: 'Body color' })
  @IsOptional()
  @IsString()
  bodyColor?: string;

  @ApiPropertyOptional({ description: 'Theme base' })
  @IsOptional()
  @IsString()
  themeBase?: string;

  @ApiPropertyOptional({ type: Background, required: false })
  @ValidateNested({ each: true })
  @Type(() => Background)
  @IsOptional()
  background?: Background;

  @ApiPropertyOptional({ description: 'Style prompt' })
  @IsOptional()
  @IsString()
  stylePrompt?: string;

  @ApiPropertyOptional({ description: 'Heading color' })
  @IsOptional()
  @IsString()
  headingColor?: string;

  @ApiPropertyOptional({ type: AccentGradient, required: false })
  @ValidateNested({ each: true })
  @Type(() => AccentGradient)
  @IsOptional()
  accentGradient?: AccentGradient;

  @ApiPropertyOptional({ type: CardBackground, required: false })
  @ValidateNested({ each: true })
  @Type(() => CardBackground)
  @IsOptional()
  cardBackground?: CardBackground;

  @ApiPropertyOptional({ description: 'Accent backgrounds' })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AccentBackground)
  accentBackgrounds?: AccentBackground[];

  @ApiPropertyOptional({ description: 'Secondary accent colors' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  secondaryAccentColors?: string[];

  @ApiPropertyOptional({ description: 'Disable readability adjustment' })
  @IsOptional()
  @IsBoolean()
  disableReadabilityAdjustment?: boolean;
}

class ThemeFont {
  @ApiPropertyOptional({ description: 'Font ID' })
  @IsOptional()
  @IsString()
  id?: string;

  @ApiPropertyOptional({ description: 'Font name' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Font URL' })
  @IsOptional()
  @IsString()
  url?: string;
}

export class ThemeDto {
  @ApiPropertyOptional({ description: 'Theme ID' })
  @IsOptional()
  @IsString()
  id?: string;

  @ApiPropertyOptional({ description: 'Workspace ID' })
  @IsOptional()
  @IsString()
  workspaceId?: string;

  @ApiPropertyOptional({ description: 'Theme name' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Heading font' })
  @IsOptional()
  @IsString()
  headingFont?: string;

  @ApiPropertyOptional({ description: 'Heading font weight' })
  @IsOptional()
  @IsNumber()
  headingFontWeight?: number;

  @ApiPropertyOptional({ description: 'Body font' })
  @IsOptional()
  @IsString()
  bodyFont?: string;

  @ApiPropertyOptional({ description: 'Body font weight' })
  @IsOptional()
  @IsNumber()
  bodyFontWeight?: number;

  @ApiPropertyOptional({ description: 'Accent color' })
  @IsOptional()
  @IsString()
  accentColor?: string;

  @ApiPropertyOptional({ description: 'Logo URL' })
  @IsOptional()
  @IsString()
  logoUrl?: string;

  @ApiPropertyOptional({ type: Config, required: false })
  @ValidateNested({ each: true })
  @Type(() => Config)
  @IsOptional()
  config?: Config;

  @ApiPropertyOptional({ description: 'Priority' })
  @IsOptional()
  @IsNumber()
  priority?: number;

  @ApiPropertyOptional({ description: 'Preview URL' })
  @IsOptional()
  @IsString()
  previewUrl?: string;

  @ApiPropertyOptional({ description: 'Archived' })
  @IsOptional()
  @IsBoolean()
  archived?: boolean;

  @ApiPropertyOptional({ description: 'Created time' })
  @IsOptional()
  @IsString()
  createdTime?: string;

  @ApiPropertyOptional({ description: 'Updated time' })
  @IsOptional()
  @IsString()
  updatedTime?: string;

  @ApiPropertyOptional({ description: 'Fonts' })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ThemeFont)
  fonts?: ThemeFont[];
}
