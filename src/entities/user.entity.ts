import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({
  name: 'users'
})
export class Users {
  @PrimaryGeneratedColumn('uuid', {
    name: 'user_id'
  })
  id: string;

  @Column({
    name: 'user_first_name',
    type: 'varchar',
    nullable: false,
  })
  first_name: string;

  @Column({
    name: 'user_last_name',
    type: 'varchar',
    nullable: false,
  })
  last_name: string;


  @Column({
    name: 'user_password',
    type: 'varchar',
    nullable: false,
  })
  password: string;
}