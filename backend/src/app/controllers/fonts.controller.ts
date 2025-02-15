import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import {
  ApiGetAllResponse,
  ApiGetOneResponse,
} from '../../common/http/responses/api-ok-response';
import { PageOptionsDto } from '../dtos/page/dto/page-options.dto';
import { PageMetaDto } from '../dtos/page/dto/page-meta.dto';
import { PageDto } from '../dtos/page/dto/page.dto';
import { JwtAuthGuard } from '../../common/guard/jwt-auth.guard';
import { Font } from '@entities/documents/font.entity';
import { FontService } from '@services/docs/fonts.service';

@ApiTags('Fonts')
@ApiExtraModels(Font)
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('fonts')
export class FontsController {
  constructor(private readonly fontService: FontService) {}

  @Get()
  @ApiOperation({ summary: 'Получить все шрифты' })
  @ApiGetAllResponse(Font)
  async findAll(@Query() page: PageOptionsDto) {
    const [files, total] = await this.fontService.findAll(page);

    return new PageDto(
      files,
      new PageMetaDto({
        pageOptionsDto: page,
        itemCount: total,
      }),
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить шрифт' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404, description: 'Шрифт не найден' })
  @ApiGetOneResponse(Font)
  findOne(@Param('id') id: string) {
    return this.fontService.findOne(id);
  }
}
