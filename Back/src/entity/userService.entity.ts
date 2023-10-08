import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Check,
  ManyToOne,
  Unique,
  Index,
  JoinColumn,
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
  @JoinColumn()
  user: UserEntity;

  @ManyToOne(() => ServiceEntity, (service) => service.id)
  @JoinColumn()
  service: ServiceEntity;

  @Column()
  token: string;
}
