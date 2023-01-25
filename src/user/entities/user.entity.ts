import { Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { BasicUser } from 'src/common/BasicUser.entity';
import { Sponsor } from 'src/sponsor/entities/sponsor.entity';
import { Message } from 'src/chat/entities/message.entity';
import { Conversation } from 'src/chat/entities/conversation.entity';

@Entity()
export class User extends BasicUser {
  @ManyToMany(() => User, (user) => user.followers)
  @JoinTable()
  following: User[];

  @ManyToMany(() => User, (user) => user.following)
  @JoinTable()
  followers: User[];

  @ManyToMany(() => Sponsor, (sponsor) => sponsor.sponsorings)
  @JoinTable()
  sponsors: Sponsor[];

  @OneToMany(() => Message, (message) => message.senderAsUser)
  messages: Message[];

  @OneToMany(() => Conversation, (conversation) => conversation.user)
  conversations: Conversation[];
}
