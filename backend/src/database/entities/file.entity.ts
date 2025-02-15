import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('files')
export default class File {
  constructor(file?: Partial<File>) {
    if (!file) {
      file = {};
    }
    if (!file.id) {
      file.id = randomUUID();
    }

    Object.assign(this, file);
  }

  @ApiProperty()
  @PrimaryColumn('uuid')
  public id: string;

  @ApiProperty()
  @Column()
  public fileKey: string;

  @ApiProperty()
  @Column()
  public fileName: string;

  @ApiProperty()
  @Column()
  public type: string;

  @ApiProperty()
  @Column()
  public dir: string;

  @ApiProperty()
  @Column()
  public size: number;

  @ApiProperty()
  @Column()
  public extension: string;

  @ApiProperty()
  @Column({ default: 'unknown' })
  public mime: string;

  @ApiProperty()
  @Column()
  public s3id: string;

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

  @ApiProperty()
  @Column()
  public fileUrl: string;
}
