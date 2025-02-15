import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { CreateAttrsOptionsDto } from './attrs-slide.dto';
import { CreateContentSlideDto } from './content-slide.dto';

export class DocSlidePropsDto {
  @ApiProperty({ type: CreateAttrsOptionsDto })
  @ValidateNested({ each: true })
  @Type(() => CreateAttrsOptionsDto)
  @IsOptional()
  public attrs: Record<string, unknown> | null;

  @ApiProperty({ type: CreateContentSlideDto })
  @ValidateNested({ each: true })
  @Type(() => CreateContentSlideDto)
  @IsOptional()
  public content: Record<string, unknown> | null;
}

export class CreateDocSlideProps {
  @ApiProperty({ type: DocSlidePropsDto })
  @ValidateNested({ each: true })
  @Type(() => DocSlidePropsDto)
  public slides: Record<string, unknown> | null;
}
