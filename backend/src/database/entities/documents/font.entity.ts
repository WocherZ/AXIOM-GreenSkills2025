import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('fonts')
export class Font {
  constructor(e?: Partial<Font>) {
    if (!e) {
      e = {};
    }

    Object.assign(this, e);
  }

  @ApiProperty()
  @PrimaryColumn('varchar')
  public id: string;

  @ApiProperty()
  @Column({ unique: true })
  public name: string;

  @ApiProperty()
  @Column()
  public url: string;
}
