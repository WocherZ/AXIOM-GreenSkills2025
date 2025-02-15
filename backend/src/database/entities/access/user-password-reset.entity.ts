import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import User from './user.entity';

@Entity('user_password_resets')
export default class UserPasswordReset {
  @PrimaryColumn('uuid')
  public id: string;

  @Column()
  public hash: string;

  @OneToOne(() => User, (user) => user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  public user?: User;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
  })
  public createdAt: Date;
}
