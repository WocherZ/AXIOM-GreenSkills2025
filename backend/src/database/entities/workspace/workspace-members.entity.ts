import User from '@entities/access/user.entity';
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
import Workspace from './workspace.entity';
import WorkspaceRole from '@entities/workspace/permissions/workspace-role.entity';
// import WorkspacePermission from './workpace-permissions.entity';

@Entity('workspace_members')
export default class WorkspaceMember {
  constructor(e?: Partial<WorkspaceMember>) {
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

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user, {
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  public user: User;

  @Column({ name: 'user_id' })
  public userId: string;

  @ApiProperty({ type: () => Workspace })
  @ManyToOne(() => Workspace, (org) => org, {
    nullable: false,
  })
  @JoinColumn({ name: 'workspace_id' })
  public workspace: Workspace;

  @Column({ name: 'workspace_id' })
  public workspaceId: string;

  @ApiProperty({ type: () => WorkspaceRole })
  @ManyToOne(() => WorkspaceRole, (role) => role, {
    nullable: false,
  })
  @JoinColumn({ name: 'workspace_role_id' })
  public role: WorkspaceRole;

  // @ApiProperty({ type: () => WorkspacePermission })
  // @ManyToOne(() => WorkspacePermission, (e) => e.workspaceMember, {
  //   nullable: false,
  // })
  // @JoinColumn({ name: 'permission_id' })
  // public permission: WorkspacePermission;

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
