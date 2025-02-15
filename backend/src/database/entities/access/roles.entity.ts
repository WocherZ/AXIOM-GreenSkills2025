import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import User from './user.entity';
import { RoleEnum } from '@common/enum/role.enum';

@Entity('roles')
export default class Role {
  public constructor(partEntity?: Partial<Role>) {
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

  @ApiProperty({ enum: RoleEnum })
  @Column('varchar', { unique: true })
  public slug: RoleEnum;

  // @ApiProperty()
  @OneToMany(() => User, (user) => user.role)
  public users?: User[];
}
