import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DraftSlideContentProps {
  @ApiProperty()
  title: string;
}

export class DraftDocContentProps {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  text: string;

  @ApiPropertyOptional()
  @IsString({ each: true })
  list: string[];
}

export class SlideContentWithImagesDto {
  @ApiProperty()
  images: string[];

  @ApiProperty({ type: [DraftDocContentProps] })
  data: DraftDocContentProps[];
}
