import { DocGenerateStatus } from '@common/enum/docs.enum';
import { SettingsProps } from '@dto/docs/create-doc.dto';
import { DraftSlideContentProps } from '@dto/docs/res-draft.dto';
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

@Entity('doc_generate_inputs')
export default class DocGenerateInput {
  constructor(e?: Partial<DocGenerateInput>) {
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

  @ApiProperty({ enum: DocGenerateStatus })
  @Column()
  public status: string;

  @ApiProperty()
  @Column()
  public prompt: string;

  @ApiProperty({ type: [DraftSlideContentProps] })
  @Column('jsonb', { nullable: true })
  public content: DraftSlideContentProps[];

  @ApiProperty({ type: SettingsProps })
  @Column('jsonb', { nullable: true })
  public settings: SettingsProps;

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
