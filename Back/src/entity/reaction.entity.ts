import {
    Entity,
    Column,
    BaseEntity,
    Unique,
    Check,
    PrimaryColumn,
    ManyToOne,
    OneToMany,
  } from 'typeorm';

import { ServiceEntity } from './service.entity';
import { AreaEntity } from './area.entity';

@Entity('Reaction')
@Unique(['description'])
@Check(`"description" != ''`)
export class ReactionEntity extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @OneToMany(() => AreaEntity, (area) => area.id)
  areas: AreaEntity[];

  @Column()
  description: string;

  @ManyToOne(() => ServiceEntity, (service) => service.id)
  service: ServiceEntity;

  @Column()
  nbr_args: number;
}
