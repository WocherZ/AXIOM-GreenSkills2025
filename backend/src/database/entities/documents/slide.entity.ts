import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import Document from './docs.entity';
import { CreateAttrsOptionsDto } from '@dto/docs/attrs-slide.dto';
import { CreateContentSlideDto } from '@dto/docs/content-slide.dto';

@Entity('slides')
export default class Slide {
  constructor(e?: Partial<Slide>) {
    if (!e) {
      e = {};
    }
    if (!e.id) {
      e.id = randomUUID();
    }

    Object.assign(this, e);
  }

  @ApiProperty()
  @PrimaryColumn('uuid')
  public id: string;

  @ApiProperty({ type: CreateAttrsOptionsDto })
  @Column('jsonb', { nullable: true })
  public attrs: Record<string, unknown> | null;

  @ApiProperty({ type: CreateContentSlideDto })
  @Column('jsonb', { nullable: true })
  public content: Record<string, unknown> | null;

  @ApiProperty({ type: () => Document })
  @ManyToOne(() => Document, (org) => org, {
    nullable: false,
  })
  @JoinColumn({ name: 'document_id' })
  public document: Document;

  @ApiProperty()
  @Column({ name: 'document_id' })
  public documentId: string;

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
