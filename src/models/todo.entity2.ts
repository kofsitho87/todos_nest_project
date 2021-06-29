import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity2';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: User;

  @Column('varchar', { length: 255 })
  title: string;

  @Column('boolean')
  completed = false;

  @Column('varchar', { length: 255, default: null })
  memo: string;

  @Column('datetime', {
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
