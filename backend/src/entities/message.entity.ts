import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Channel } from './channel.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roomId: number;

  @ManyToOne(() => Channel, (channel) => channel.messages)
  channel: Channel;

  @Column()
  username: string;

  @Column()
  content: string;
}
