import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToOne,
    JoinColumn,
    ManyToOne,
    RelationId,
  } from 'typeorm';

import { ActionEntity } from './action.entity';
import { ReactionEntity } from './reaction.entity';
import { UserEntity } from './user.entity';

@Entity('Area')
export class AreaEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.id)
  user: UserEntity;

  @ManyToOne(() => ActionEntity, (action) => action.id)
  action: ActionEntity;

  @RelationId((area: AreaEntity) => area.action)
  actionId: number;

  @ManyToOne(() => ReactionEntity, (reaction) => reaction.id)
  reaction: ReactionEntity;

  @RelationId((area: AreaEntity) => area.reaction)
  reactionId: number;

  @Column({ type: 'jsonb' })
  args_action: Object;

  @Column({ type: 'jsonb' })
  args_reaction: Object;
}
