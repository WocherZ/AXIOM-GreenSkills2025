import DocGenerateInput from '@entities/documents/draft-document.entity';
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

export class DraftSlideContentDto {
  @ApiProperty({ type: DocGenerateInput })
  draft: DocGenerateInput;

  @ApiProperty({ type: [DraftSlideContentProps] })
  data: DraftSlideContentProps[];
}
