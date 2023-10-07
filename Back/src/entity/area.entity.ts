import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToOne,
    JoinColumn,
  } from 'typeorm';

import { ActionEntity } from './action.entity';
import { ReactionEntity } from './reaction.entity';
import { UserEntity } from './user.entity';

@Entity('Area')
export class AreaEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserEntity, (user) => user.id)
  user: UserEntity;

  @OneToOne(() => ActionEntity, (action) => action.id)
  action: ActionEntity;

  @OneToOne(() => ReactionEntity, (reaction) => reaction.id)
  reaction: ReactionEntity;

  @Column('jsonb')
  args_action: object;

  @Column('jsonb')
  args_reaction: object;
}
