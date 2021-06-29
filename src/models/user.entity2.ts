import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  email: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  password: string;

  @Column('datetime', {
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
