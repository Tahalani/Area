import {
    Entity,
    Column,
    BaseEntity,
    Unique,
    Check,
    PrimaryColumn,
    OneToOne,
    ManyToOne,
  } from 'typeorm';

import { ServiceEntity } from './service.entity';
import { UserEntity } from './user.entity';

@Entity('Action')
@Unique(['description'])
@Check(`"description" != ''`)
export class ActionEntity extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @OneToOne(() => UserEntity, (user) => user.id)
  user: UserEntity;

  @Column()
  description: string;

  @ManyToOne(() => ServiceEntity, (service) => service.id)
  service: ServiceEntity;

  @Column()
  nbr_args: number;
}
