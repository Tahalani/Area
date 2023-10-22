import {
    Entity,
    Column,
    BaseEntity,
    Unique,
    Check,
    PrimaryColumn,
    ManyToOne,
    OneToMany,
    RelationId,
  } from 'typeorm';

import { ServiceEntity } from './service.entity';
import { AreaEntity } from './area.entity';

@Entity('Reaction')
@Unique(['description'])
@Check(`"description" != ''`)
export class ReactionEntity extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => AreaEntity, (area) => area.id)
  areas: AreaEntity[];

  @Column()
  description: string;

  @ManyToOne(() => ServiceEntity, (service) => service.id)
  service: ServiceEntity;

  @RelationId((reaction: ReactionEntity) => reaction.service)
  serviceId: number;

  @Column()
  nbr_args: number;

  @Column({ type: 'jsonb' })
  args_reaction: Object;
}
