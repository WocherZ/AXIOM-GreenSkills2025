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
import { Theme } from '@entities/documents/theme.entity';
import { ThemeService } from '@services/docs/theme.service';

@ApiTags('Themes')
@ApiExtraModels(Theme)
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('themes')
export class ThemeController {
  constructor(private readonly themeService: ThemeService) {}

  @Get()
  @ApiOperation({ summary: 'Получить все темы' })
  @ApiGetAllResponse(Theme)
  async findAll(@Query() page: PageOptionsDto) {
    const [data, total] = await this.themeService.findAll(page);

    return new PageDto(
      data,
      new PageMetaDto({
        pageOptionsDto: page,
        itemCount: total,
      }),
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить тему' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404, description: 'Шрифт не найден' })
  @ApiGetOneResponse(Theme)
  findOne(@Param('id') id: string) {
    return this.themeService.findOne(id);
  }
}
