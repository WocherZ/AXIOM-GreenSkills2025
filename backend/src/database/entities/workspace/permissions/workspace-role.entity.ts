import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { WorkspaceMemberRole } from '../../../../common/enum/role.enum';
import WorkspaceMember from '@entities/workspace/workspace-members.entity';

@Entity('workspace_roles')
export default class WorkspaceRole {
  public constructor(partEntity?: Partial<WorkspaceRole>) {
    if (!partEntity) {
      partEntity = {};
    }
    if (!partEntity.id) {
      partEntity.id = randomUUID();
    }

    Object.assign(this, partEntity);
  }

  @ApiProperty()
  @PrimaryColumn('uuid')
  public id: string;

  @ApiProperty()
  @Column('varchar', { unique: true })
  public name: string;

  @ApiProperty({ enum: WorkspaceMemberRole })
  @Column('varchar', { unique: true })
  public slug: WorkspaceMemberRole;

  // @ApiProperty()
  @OneToMany(() => WorkspaceMember, (member) => member.role)
  public workspaceMember?: WorkspaceMember[];
}
