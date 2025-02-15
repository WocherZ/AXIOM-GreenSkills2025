import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationDto {
  @ApiPropertyOptional({
    name: 'page[page]',
    minimum: 0,
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  readonly page?: number = 1;

  @ApiPropertyOptional({
    name: 'page[limit]',
    minimum: 0,
    maximum: 100,
    default: 10,
  })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  readonly limit?: number = 10;

  get skip(): number {
    return ((this.page || 1) - 1) * (this.limit || 0);
  }
}
