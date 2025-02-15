import { PipeTransform, Type } from '@nestjs/common';

export class ParseArray implements PipeTransform {
  private readonly type: Type<unknown>;
  private readonly separator: string;

  constructor(options: { type: StringConstructor; separator: ',' }) {
    this.type = options.type;
    this.separator = options.separator;
  }

  transform(value: string) {
    let items: string[];
    try {
      items = value.split(this.separator);
    } catch (error) {
      throw new Error('Given input is not parsable.');
    }
    return items;
  }
}
