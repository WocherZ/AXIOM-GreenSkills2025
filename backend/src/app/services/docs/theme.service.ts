import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PageOptionsDto } from '@dto/page/dto/page-options.dto';
import { Theme } from '@entities/documents/theme.entity';

@Injectable()
export class ThemeService {
  constructor(
    @InjectRepository(Theme)
    private readonly themeRepository: Repository<Theme>,
  ) {}

  async findAll(page: PageOptionsDto): Promise<[Theme[], number]> {
    return this.themeRepository.findAndCount({
      order: {
        priority: 'DESC',
      },
      take: page.limit,
      skip: page.skip,
    });
  }

  async findOne(id: string) {
    const font = await this.themeRepository.findOne({
      where: {
        id,
      },
    });

    if (!font) {
      throw new NotFoundException('Theme not found');
    }

    return font;
  }
}
