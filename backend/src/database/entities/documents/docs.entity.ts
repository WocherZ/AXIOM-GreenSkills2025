import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import Workspace from '../workspace/workspace.entity';
import User from '../access/user.entity';
import Folder from '@entities/workspace/folders.entity';
import File from '@entities/file.entity';
import DocGenerateInput from './draft-document.entity';
import Slide from './slide.entity';
import { Theme } from './theme.entity';
import { DocSlidePropsDto } from '@dto/docs/update-slide.dto';
import { SlideContentWithImagesDto } from '@dto/docs/res-draft.dto';

@Entity('documents')
export default class Document {
  constructor(e?: Partial<Document>) {
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

  @ApiProperty()
  @Column({ nullable: true })
  public title: string;

  @ApiProperty()
  @Column({ nullable: true, name: 'preview_url' })
  public previewUrl: string;

  @ApiProperty({ type: SlideContentWithImagesDto })
  @Column('jsonb', { nullable: true })
  public content: SlideContentWithImagesDto;

  @ApiProperty({ type: () => File })
  @ManyToOne(() => File, (org) => org, {
    nullable: true,
  })
  @JoinColumn({ name: 'preview_id' })
  public preview: File;

  @ApiProperty()
  @Column({ default: false })
  public archived: boolean;

  @ApiProperty({ type: [DocSlidePropsDto] })
  @OneToMany(() => Slide, (slide) => slide.document)
  public slides?: Record<string, unknown> | null;

  @ApiProperty()
  @Column({ name: 'is_favorite', default: false })
  public isFavorite: boolean;

  @ApiProperty({ type: () => Workspace })
  @ManyToOne(() => Workspace, (org) => org, {
    nullable: false,
  })
  @JoinColumn({ name: 'workspace_id' })
  public workspace: Workspace;

  @ApiProperty()
  @Column({ name: 'workspace_id' })
  public workspaceId: string;

  @ApiProperty({ type: () => DocGenerateInput })
  @ManyToOne(() => DocGenerateInput, (doc) => doc, {
    nullable: false,
  })
  @JoinColumn({ name: 'doc_generate_id' })
  public docGenerateInput: DocGenerateInput;

  @ApiProperty()
  @Column({ name: 'doc_generate_id' })
  public docGenerateId: string;

  @ApiProperty({ type: () => Folder })
  @ManyToOne(() => Folder, (org) => org, {
    nullable: true,
  })
  @JoinColumn({ name: 'folder_id' })
  public folder: Folder;

  @ApiProperty()
  @Column({ name: 'folder_id', nullable: true })
  public folderId: string;

  @ApiProperty()
  @ManyToOne(() => Theme, (theme) => theme, {
    nullable: true,
  })
  @JoinColumn({ name: 'theme_id' })
  public theme: Theme;

  @ApiProperty()
  @Column({ name: 'user_id' })
  public userId: string;

  @ApiProperty()
  @ManyToOne(() => User)
  @JoinColumn({
    name: 'user_id',
  })
  public createdBy: User;

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
