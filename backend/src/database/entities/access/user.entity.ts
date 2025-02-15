import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import Role from './roles.entity';
import UserPasswordReset from './user-password-reset.entity';
import Workspace from '../workspace/workspace.entity';
import File from '../file.entity';

@Entity('users')
export default class User {
  public constructor(partEntity?: Partial<User>) {
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
  @Column({ name: 'first_name' })
  public firstName: string;

  @ApiProperty()
  @Column({ name: 'last_name' })
  public lastName: string;

  @ApiProperty()
  @Column({ unique: true })
  public email: string;

  @ApiProperty({ type: () => File })
  @ManyToOne(() => File, (org) => org, {
    nullable: true,
  })
  @JoinColumn({ name: 'profile_image_id' })
  public profileImage: File;

  // @ApiProperty()
  @Column({ nullable: true, select: false })
  public password: string;

  @ApiProperty({ type: () => Role })
  @ManyToOne(() => Role, (role) => role.users, {
    nullable: false,
  })
  @JoinColumn({ name: 'role_id' })
  public role: Role;

  @OneToOne(() => Workspace, (org) => org.owner, {
    cascade: true,
  })
  public workspace: Workspace;

  @Column({
    select: false,
    type: 'text',
    nullable: true,
    name: 'refresh_token',
  })
  public refreshToken?: string;

  @OneToOne(() => UserPasswordReset, (passwordReset) => passwordReset.user, {
    cascade: true,
  })
  public passwordReset: UserPasswordReset;

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
