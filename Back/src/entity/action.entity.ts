import {
    Entity,
    Column,
    BaseEntity,
    Unique,
    Check,
    PrimaryColumn,
    OneToOne,
    ManyToOne,
    OneToMany,
  } from 'typeorm';

import { ServiceEntity } from './service.entity';
import { UserEntity } from './user.entity';
import { AreaEntity } from './area.entity';

@Entity('Action')
@Unique(['description'])
@Check(`"description" != ''`)
export class ActionEntity extends BaseEntity {
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
