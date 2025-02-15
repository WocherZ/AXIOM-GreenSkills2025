import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Font } from '@entities/documents/font.entity';
import { PageOptionsDto } from '@dto/page/dto/page-options.dto';

@Injectable()
export class FontService {
  constructor(
    @InjectRepository(Font)
    private readonly fontRepository: Repository<Font>,
  ) {}

  async findAll(page: PageOptionsDto): Promise<[Font[], number]> {
    return this.fontRepository.findAndCount({
      take: page.limit,
      skip: page.skip,
    });
  }

  async findOne(id: string) {
    const font = await this.fontRepository.findOne({
      where: {
        id,
      },
    });

    if (!font) {
      throw new NotFoundException('Font not found');
    }

    return font;
  }
}
