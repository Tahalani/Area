import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Check,
  ManyToOne,
  Unique,
  Index,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { ServiceEntity } from './service.entity';

@Entity('User_Service')
@Unique(['user', 'service'])
@Index(['user', 'service'])
@Check(`"token" != ''`)
export class UserServiceEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.id)
  user: UserEntity;

  @ManyToOne(() => ServiceEntity, (service) => service.id)
  service: ServiceEntity;

  @Column()
  token: string;
}
