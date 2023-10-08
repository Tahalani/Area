import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Unique,
  Check,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { ActionEntity } from './action.entity';
import { ReactionEntity } from './reaction.entity';

@Entity('Service')
@Unique(['name'])
@Check(`"name" != '' AND "description" != ''`)
export class ServiceEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  logo_url: string;

  @OneToMany(() => ActionEntity, (action) => action.service)
  actions: ActionEntity[];

  @OneToMany(() => ReactionEntity, (reaction) => reaction.service)
  reactions: ReactionEntity[];
}
