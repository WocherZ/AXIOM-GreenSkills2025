import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import WorkspaceMember from './workspace-members.entity';
import Workspace from './workspace.entity';

@Entity('folders')
export default class Folder {
  constructor(e?: Partial<Folder>) {
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
  @Column()
  public name: string;

  @ApiProperty()
  @Column()
  public slug: string;

  @ApiProperty()
  @ManyToMany(() => WorkspaceMember)
  @JoinTable({
    name: 'folders_members',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'folder_id',
      referencedColumnName: 'id',
    },
  })
  public members: WorkspaceMember[];

  @ApiProperty({ type: () => Workspace })
  @ManyToOne(() => Workspace, (org) => org, {
    nullable: false,
  })
  @JoinColumn({ name: 'workspace_id' })
  public workspace: Workspace;

  @ApiProperty()
  @Column({ name: 'workspace_id' })
  public workspaceId: string;

  @ApiProperty()
  @Column({ name: 'member_count' })
  public memberCount: number;

  @ApiProperty()
  @Column({ name: 'is_member', default: true })
  public isMember: boolean;

  @ApiProperty()
  @Column({ default: false })
  public archived: boolean;

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
