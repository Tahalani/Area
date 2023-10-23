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
    RelationId,
  } from 'typeorm';

import { ServiceEntity } from './service.entity';

@Entity('Action')
@Unique(['description'])
@Check(`"description" != ''`)
export class ActionEntity extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => ServiceEntity, (service) => service.id)
  service: ServiceEntity;

  @RelationId((action: ActionEntity) => action.service)
  serviceId: number;

  @Column()
  nbr_args: number;

  @Column({ type: 'jsonb' })
  args_action: Object;
}
