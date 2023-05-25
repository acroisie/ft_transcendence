import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Message } from './message.entity';

@Entity()
export class Channel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  isPrivate: boolean;

  @Column({ nullable: true })
  password: string;

  @Column()
  ownerId: number;

  @OneToMany(() => Message, (message) => message.channel)
  messages: Message[];
}
