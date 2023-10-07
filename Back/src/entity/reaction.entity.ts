import {
    Entity,
    Column,
    BaseEntity,
    Unique,
    Check,
    PrimaryColumn,
    ManyToOne,
  } from 'typeorm';

import { ServiceEntity } from './service.entity';

@Entity('Reaction')
@Unique(['description'])
@Check(`"description" != ''`)
export class ReactionEntity extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  description: string;

  @ManyToOne(() => ServiceEntity, (service) => service.id)
  service: ServiceEntity;

  @Column()
  nbr_args: number;
}
