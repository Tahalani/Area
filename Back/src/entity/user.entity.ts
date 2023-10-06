import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Unique,
  Check,
} from 'typeorm';

@Entity('User')
@Unique(['email'])
@Check(
  `"name" != '' AND "surname" != '' AND "email" != '' AND "password" != ''`,
)
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
