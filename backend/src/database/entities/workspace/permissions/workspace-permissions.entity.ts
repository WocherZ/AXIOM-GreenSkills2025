import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryColumn } from 'typeorm';
// import WorkspaceMember from './workspace-members.entity';

@Entity('workspace-permissions')
export default class WorkspacePermission {
  constructor(permission: Partial<WorkspacePermission>) {
    Object.assign(this, permission);
  }

  @ApiProperty()
  @PrimaryColumn('uuid')
  public id: string;

  @ApiProperty()
  @Column('boolean', {
    default: false,
  })
  public manage: boolean;

  @ApiProperty()
  @Column('boolean', {
    default: false,
  })
  public edit: boolean;

  @ApiProperty()
  @Column('boolean', {
    default: false,
  })
  public comment: boolean;

  @ApiProperty()
  @Column('boolean', {
    default: true,
  })
  public view: boolean;

  // @ApiProperty({ type: () => WorkspaceMember })
  // @ManyToOne(() => WorkspaceMember, (e) => e.permission, {
  //   nullable: false,
  // })
  // @JoinColumn({ name: 'workspave_member_id' })
  // public workspaceMember: WorkspaceMember;
}
