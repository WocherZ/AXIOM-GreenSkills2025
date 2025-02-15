import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Font } from './font.entity';

@Entity('themes')
export class Theme {
  constructor(e?: Partial<Theme>) {
    if (!e) {
      e = {};
    }

    Object.assign(this, e);
  }

  @ApiProperty()
  @PrimaryColumn('varchar')
  public id: string;

  @ApiProperty()
  @Column({ nullable: true })
  name?: string;

  @ApiProperty()
  @Column({ name: 'heading_font', nullable: true })
  headingFont?: string;

  @ApiProperty()
  @Column({ name: 'heading_font_weight', nullable: true })
  headingFontWeight?: number;

  @ApiProperty()
  @Column({ name: 'body_font', nullable: true })
  bodyFont?: string;

  @ApiProperty()
  @Column({ name: 'body_font_weight', nullable: true })
  bodyFontWeight?: number;

  @ApiProperty()
  @Column({ name: 'accent_color', nullable: true })
  accentColor?: string;

  @ApiProperty()
  @Column({ name: 'logo_url', nullable: true })
  logoUrl?: string;

  @ApiProperty()
  @Column('jsonb', { nullable: true })
  config?: any;

  @ApiProperty()
  @Column({ nullable: true })
  priority?: number;

  @ApiProperty()
  @Column({ name: 'preview_url', nullable: true })
  previewUrl?: string;

  @ApiProperty()
  @Column({ nullable: true })
  archived?: boolean;

  @ApiProperty()
  @ManyToMany(() => Font)
  @JoinTable({
    name: 'themes_fonts',
    joinColumn: {
      name: 'theme_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'font_id',
      referencedColumnName: 'id',
    },
  })
  public fonts: Font[];

  @ApiProperty()
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
  })
  public createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
  })
  public updatedAt: Date;
}
