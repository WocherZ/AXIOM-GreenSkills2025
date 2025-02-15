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
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import WorkspaceMember from './workspace-members.entity';
import Folder from './folders.entity';
import User from '../access/user.entity';
import File from '../file.entity';
import { Theme } from '@entities/documents/theme.entity';
import {
  AccessLinkPermissionEnum,
  WorkspaceMemberPermissionEnum,
} from '@common/enum/permission.enum';

@Entity('workspaces')
export default class Workspace {
  constructor(e?: Partial<Workspace>) {
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
  @Column({ name: 'invite_code' })
  public inviteCode: string;

  @ApiProperty()
  @ManyToMany(() => WorkspaceMember)
  @JoinTable({
    name: 'workspaces_members',
    joinColumn: {
      name: 'workspace_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'member_id',
      referencedColumnName: 'id',
    },
  })
  public workspaceMembers: WorkspaceMember[];

  @ApiProperty({ enum: WorkspaceMemberPermissionEnum })
  @Column({ name: 'workspace_member_permission' })
  public workspaceMemberPermission: WorkspaceMemberPermissionEnum;

  @ApiProperty()
  @ApiProperty({ enum: WorkspaceMemberPermissionEnum })
  @Column({ name: 'access_link_permission' })
  public accessLinkPermission: AccessLinkPermissionEnum;

  @OneToMany(() => Workspace, (org) => org.folders)
  public folders: Folder[];

  @ApiProperty()
  @ManyToOne(() => Theme, (theme) => theme, {
    nullable: true,
  })
  @JoinColumn({ name: 'theme_id' })
  public theme: Theme;

  @OneToOne(() => User, (user) => user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'owner_id' })
  public owner: User;

  @Column({ name: 'owner_id' })
  public ownerId: string;

  @ApiProperty({ type: () => File })
  @ManyToOne(() => File, (logo) => logo, {
    nullable: true,
  })
  @JoinColumn({ name: 'logo_id' })
  public logo: File;

  @ApiProperty()
  @Column({ default: false })
  public disabled: boolean;

  @ApiProperty()
  @Column({ name: 'disabled_reason', default: false })
  public disabledReason: boolean;

  @ApiProperty()
  @Column({ name: 'disabled_comment', default: false })
  public disabledComment: boolean;

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
