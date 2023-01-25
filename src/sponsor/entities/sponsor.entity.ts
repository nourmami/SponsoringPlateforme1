import { Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { BasicUser } from 'src/common/BasicUser.entity';
import { User } from 'src/user/entities/user.entity';
import { Message } from 'src/chat/entities/message.entity';
import { Conversation } from 'src/chat/entities/conversation.entity';

@Entity()
export class Sponsor extends BasicUser {
  @ManyToMany(() => User, (user) => user.followers)
  @JoinTable()
  following: User[];

  @ManyToMany(() => User, (user) => user.following)
  @JoinTable()
  followers: User[];

  @ManyToMany(() => User, (user) => user.sponsors)
  sponsorings: User[];

  @OneToMany(() => Message, (message) => message.senderAsSponsor)
  messages: Message[];

  @OneToMany(() => Conversation, (conversation) => conversation.sponsor)
  conversations: Conversation[];
}
