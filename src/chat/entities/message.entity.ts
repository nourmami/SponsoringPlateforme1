import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BasicUser } from 'src/common/BasicUser.entity';
import { Conversation } from './conversation.entity';
import { Sponsor } from 'src/sponsor/entities/sponsor.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (senderAsUser) => senderAsUser.messages)
  senderAsUser: User;

  @ManyToOne(() => Sponsor, (senderAsSponsor) => senderAsSponsor.messages)
  senderAsSponsor: Sponsor;

  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  conversation: Conversation;

  @Column({
    type: 'enum',
    enum: ['text', 'image', 'file', 'stripe'],
    default: 'text',
  })
  type: string;

  @Column()
  content: string;

  @Column({ nullable: true })
  payload: string;

  @CreateDateColumn({ update: false })
  createdAt: Date;
}
