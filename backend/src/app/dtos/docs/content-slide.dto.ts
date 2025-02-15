import { Type } from 'class-transformer';
import {
  IsOptional,
  ValidateNested,
  // IsArray,
  IsString,
  // IsNumber,
  IsObject,
  IsUUID,
  // IsBoolean,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// class BackgroundProps {
//   @ApiPropertyOptional({ description: 'Background type' })
//   @IsOptional()
//   @IsString()
//   type?: string;
// }

// class ImageProps {
//   @ApiPropertyOptional({ description: 'Image ID' })
//   @IsOptional()
//   @IsString()
//   id?: string;

//   @ApiPropertyOptional({ description: 'Horizontal align' })
//   @IsOptional()
//   @IsString()
//   horizontalAlign?: string;

//   @ApiPropertyOptional({ description: 'Saved media ID' })
//   @IsOptional()
//   @IsString()
//   savedMediaId?: string;

//   @ApiPropertyOptional({ description: 'Image source' })
//   @IsOptional()
//   @IsString()
//   src?: string;

//   @ApiPropertyOptional({ description: 'Temp URL' })
//   @IsOptional()
//   @IsString()
//   tempUrl?: string;

//   @ApiPropertyOptional({ description: 'Upload status' })
//   @IsOptional()
//   @IsNumber()
//   uploadStatus?: number;

//   @ApiPropertyOptional({ description: 'Image meta' })
//   @IsOptional()
//   @IsObject()
//   meta?: Record<string, any>;

//   @ApiPropertyOptional({ description: 'Provider meta' })
//   @IsOptional()
//   @IsObject()
//   providerMeta?: Record<string, any>;

//   @ApiPropertyOptional({ description: 'AI parameters' })
//   @IsOptional()
//   @IsObject()
//   aiParams?: Record<string, any>;

//   @ApiPropertyOptional({ description: 'Load image params' })
//   @IsOptional()
//   @IsObject()
//   loadImageParams?: Record<string, any>;

//   @ApiPropertyOptional({ description: 'Load image status' })
//   @IsOptional()
//   @IsString()
//   loadImageStatus?: string;

//   @ApiPropertyOptional({ description: 'Load image ID' })
//   @IsOptional()
//   @IsString()
//   loadImageId?: string;

//   @ApiPropertyOptional({ description: 'Image name' })
//   @IsOptional()
//   @IsString()
//   name?: string;

//   @ApiPropertyOptional({ description: 'Image query' })
//   @IsOptional()
//   @IsString()
//   query?: string;

//   @ApiPropertyOptional({ description: 'Image source' })
//   @IsOptional()
//   @IsString()
//   source?: string;

//   @ApiPropertyOptional({ description: 'Show placeholder' })
//   @IsOptional()
//   @IsString()
//   showPlaceholder?: string;

//   @ApiPropertyOptional({ description: 'Full width block' })
//   @IsOptional()
//   @IsBoolean()
//   fullWidthBlock?: boolean;

//   @ApiPropertyOptional({ description: 'Resize options' })
//   @IsOptional()
//   @IsObject()
//   resize?: Record<string, any>;

//   @ApiPropertyOptional({ description: 'Click behavior' })
//   @IsOptional()
//   @IsString()
//   clickBehavior?: string;

//   @ApiPropertyOptional({ description: 'Href' })
//   @IsOptional()
//   @IsString()
//   href?: string;

//   @ApiPropertyOptional({ description: 'Provider' })
//   @IsOptional()
//   @IsString()
//   provider?: string;
// }

// class MaskProps {
//   @ApiPropertyOptional({ description: 'Mask effect' })
//   @IsOptional()
//   @IsString()
//   effect?: string;
// }

class MarksProps {
  @ApiProperty()
  @IsString()
  type?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  attrs?: any;
}

// class CardAccentLayoutItemProps {
//   @ApiPropertyOptional({ description: 'Item ID' })
//   @IsOptional()
//   @IsString()
//   itemId?: string;

//   @ApiPropertyOptional({ description: 'Fit type' })
//   @IsOptional()
//   @IsString()
//   fitType?: string;

//   @ApiPropertyOptional({ type: BackgroundProps, required: false })
//   @ValidateNested({ each: true })
//   @Type(() => BackgroundProps)
//   @IsOptional()
//   background?: BackgroundProps;

//   @ApiPropertyOptional({ type: ImageProps, required: false })
//   @ValidateNested({ each: true })
//   @Type(() => ImageProps)
//   @IsOptional()
//   image?: ImageProps;

//   @ApiPropertyOptional({ type: MaskProps, required: false })
//   @ValidateNested({ each: true })
//   @Type(() => MaskProps)
//   @IsOptional()
//   mask?: MaskProps;
// }

// class CardLayoutItemProps {
//   @ApiPropertyOptional({ description: 'Item ID' })
//   @IsOptional()
//   @IsString()
//   itemId?: string;

//   @ApiPropertyOptional({ description: 'Content array' })
//   @IsOptional()
//   @IsArray()
//   content?: any[];
// }

// class HeadingProps {
//   @ApiPropertyOptional({ description: 'Heading level' })
//   @IsOptional()
//   @IsNumber()
//   level?: number;

//   @ApiPropertyOptional({ description: 'Content array' })
//   @IsOptional()
//   @IsArray()
//   content?: any[];
// }

// class ParagraphProps {
//   @ApiPropertyOptional({ description: 'Content array' })
//   @IsOptional()
//   @IsArray()
//   content?: any[];
// }

// class ContributorsProps {
//   @ApiPropertyOptional({ description: 'Show time' })
//   @IsOptional()
//   @IsBoolean()
//   showTime?: boolean;

//   @ApiPropertyOptional({ description: 'Hidden contributor IDs' })
//   @IsOptional()
//   @IsArray()
//   hiddenContributorIds?: string[];
// }

// class GridLayoutProps {
//   @ApiPropertyOptional({ description: 'Column widths' })
//   @IsOptional()
//   @IsArray()
//   colWidths?: number[];

//   @ApiPropertyOptional({ description: 'Full width block' })
//   @IsOptional()
//   @IsBoolean()
//   fullWidthBlock?: boolean;

//   @ApiPropertyOptional({ description: 'Content array' })
//   @IsOptional()
//   @IsArray()
//   content?: any[];
// }

// class GridCellProps {
//   @ApiPropertyOptional({ description: 'Content array' })
//   @IsOptional()
//   @IsArray()
//   content?: any[];
// }

// class SmartLayoutProps {
//   @ApiPropertyOptional({ description: 'Variant key' })
//   @IsOptional()
//   @IsString()
//   variantKey?: string;

//   @ApiPropertyOptional({ description: 'Options' })
//   @IsOptional()
//   @IsObject()
//   options?: Record<string, any>;

//   @ApiPropertyOptional({ description: 'Full width block' })
//   @IsOptional()
//   @IsBoolean()
//   fullWidthBlock?: boolean;

//   @ApiPropertyOptional({ description: 'Content array' })
//   @IsOptional()
//   @IsArray()
//   content?: any[];
// }

// class SmartLayoutCellProps {
//   @ApiPropertyOptional({ description: 'Cell ID' })
//   @IsOptional()
//   @IsString()
//   id?: string;

//   @ApiPropertyOptional({ description: 'Options' })
//   @IsOptional()
//   @IsObject()
//   options?: Record<string, any>;

//   @ApiPropertyOptional({ description: 'Content array' })
//   @IsOptional()
//   @IsArray()
//   content?: any[];
// }

export class ContentAttrsProps {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  layout?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  itemId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  fitType?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  cardSize?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  container?: Record<string, any>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  background?: Record<string, any>;
}

class ContentProps {
  @ApiProperty({ description: 'Text type' })
  @IsString()
  type: string;

  @ApiProperty({ description: 'Text content' })
  @IsString()
  text: string;

  @ApiPropertyOptional({ type: [MarksProps] })
  @ValidateNested({ each: true })
  @Type(() => MarksProps)
  @IsOptional()
  marks?: MarksProps[];
}

class ContentSlideProps {
  @ApiPropertyOptional({ description: 'Heading type' })
  @IsOptional()
  @IsString()
  type?: string;
  // cardAccentLayoutItem
  // cardLayoutItem
  // smartLayout
  // smartLayoutCell

  @ApiPropertyOptional({ description: 'Heading attributes' })
  @IsOptional()
  @IsObject()
  attrs?: Record<string, any>;

  @ApiPropertyOptional({ type: [ContentProps], required: false })
  @ValidateNested({ each: true })
  @Type(() => ContentProps)
  @IsOptional()
  content?: ContentProps[];
}

export class CreateSlidesPropsDto {
  @ApiPropertyOptional({ description: 'Card attributes' })
  @IsOptional()
  @IsObject()
  attrs?: Record<string, unknown> | null;

  @ApiPropertyOptional({ type: [ContentSlideProps], required: false })
  @ValidateNested({ each: true })
  @Type(() => ContentSlideProps)
  @IsOptional()
  content?: Record<string, unknown> | null;
}

export class CreateContentSlideDto {
  @ApiProperty()
  @IsUUID('4')
  documentId: string;

  @ApiPropertyOptional({ type: [CreateSlidesPropsDto], required: false })
  @ValidateNested({ each: true })
  @Type(() => CreateSlidesPropsDto)
  @IsOptional()
  slides?: CreateSlidesPropsDto[];
}
