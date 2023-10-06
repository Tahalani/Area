import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Unique,
  Check,
} from 'typeorm';

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
}
