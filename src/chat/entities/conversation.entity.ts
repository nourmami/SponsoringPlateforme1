import {
  BaseEntity,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BasicUser } from 'src/common/BasicUser.entity';
import { Message } from './message.entity';
import { User } from 'src/user/entities/user.entity';
import { Sponsor } from 'src/sponsor/entities/sponsor.entity';

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.conversations)
  user: User;

  @ManyToOne(() => Sponsor, (sponsor) => sponsor.conversations)
  sponsor: Sponsor;

  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[];
}
