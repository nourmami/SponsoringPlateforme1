import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WebSocketServer } from '@nestjs/websockets';
import { Sponsor } from 'src/sponsor/entities/sponsor.entity';
import { processTransaction } from 'src/stripe';
import { User } from 'src/user/entities/user.entity';
import { Repository, IsNull } from 'typeorm';
import { ChatGateway } from './chat.gateway';
import { Conversation } from './entities/conversation.entity';
import { Message } from './entities/message.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Sponsor)
    private sponsorRepo: Repository<Sponsor>,

    @InjectRepository(User)
    private userRepo: Repository<User>,

    @InjectRepository(Conversation)
    private conversationRepo: Repository<Conversation>,

    @InjectRepository(Message)
    private messageRepo: Repository<Message>,

    private readonly chatGateway: ChatGateway,
  ) {}

  async create(userId: string, sponsorId: string) {
    const user = await this.userRepo.findOne({
      where: { id: userId },
    });

    const sponsor = await this.sponsorRepo.findOne({
      where: { id: sponsorId },
    });

    if (!user || !sponsor) {
      return null;
    }

    const conversation = this.conversationRepo.create({});
    conversation.user = user;
    conversation.sponsor = sponsor;
    await this.conversationRepo.save(conversation);
    return conversation;
  }

  async getConversationById(id: string, me: string) {
    const conversation = await this.conversationRepo.findOne({
      where: { id },
      relations: [
        'sponsor',
        'user',
        'messages',
        'messages.senderAsSponsor',
        'messages.senderAsUser',
      ],
    });

    if (conversation) {
      if (conversation.user.id !== me && conversation.sponsor.id !== me) {
        return null;
      }

      delete conversation.user.password;
      delete conversation.sponsor.password;
      delete conversation.user.salt;
      delete conversation.sponsor.salt;
      return conversation;
    }

    return null;
  }

  async validateSponsorship(payload: string, amount: number) {
    const message = await this.messageRepo.findOne({
      where: { payload },
    });

    if (message) {
      message.content =
        'Sponsorship Payment of amount ' + amount.toString() + '$ Successful';
      await this.messageRepo.save(message);
      // this.chatGateway.server.emit('message', message);
    }
  }
  async generateStripeLink(userId: string, conversationId: string) {
    const conversation = await this.conversationRepo.findOne({
      where: { id: conversationId },
      relations: ['sponsor'],
    });

    const sponsor = conversation.sponsor;

    const { id, url } = await processTransaction(
      userId,
      'Sponsorship for ' + sponsor.fullname,
      'Sponsorship for ' + sponsor.fullname,
    );

    // create message
    const message = this.messageRepo.create({
      type: 'stripe',
      content: 'Sponsorship Payment Initiated...',
      payload: id,
    });

    message.senderAsUser = await this.userRepo.findOne({
      where: { id: userId },
    });

    message.conversation = conversation;
    await this.messageRepo.save(message);

    return { url };
  }

  async getConversations(userId: string) {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: [
        'conversations',
        'conversations.sponsor',
        'conversations.user',
      ],
    });

    if (user) {
      for (const conversation of user.conversations) {
        delete conversation.user.password;
        delete conversation.sponsor.password;
        delete conversation.user.salt;
        delete conversation.sponsor.salt;
      }
      return user.conversations;
    }

    const sponsor = await this.sponsorRepo.findOne({
      where: { id: userId },
      relations: [
        'conversations',
        'conversations.sponsor',
        'conversations.user',
      ],
    });

    if (sponsor) {
      for (const conversation of sponsor.conversations) {
        delete conversation.user.password;
        delete conversation.sponsor.password;
        delete conversation.user.salt;
        delete conversation.sponsor.salt;
      }
      return sponsor.conversations;
    }

    return [];
  }

  async sendMessage(conversationId: string, senderId: string, content: string) {
    const conversation = await this.conversationRepo.findOne({
      where: { id: conversationId },
      relations: ['sponsor', 'user'],
    });

    if (conversation) {
      if (
        conversation.user.id !== senderId &&
        conversation.sponsor.id !== senderId
      ) {
        return null;
      }

      const message = this.messageRepo.create({
        content,
      });

      if (conversation.user.id === senderId) {
        message.senderAsUser = conversation.user;
      } else {
        message.senderAsSponsor = conversation.sponsor;
      }

      message.conversation = conversation;
      await this.messageRepo.save(message);

      const payload = {
        ...message,
        senderAsUser: null,
        senderAsSponsor: null,
        conversation: null,
      };

      this.chatGateway.sendMessage(JSON.stringify(payload));

      return payload;
    }
  }

  // async sponsorUser(_sponsorId: string, userId: string) {
  //   const user = await this.userRepo.findOne({
  //     where: { id: userId },
  //     relations: ['sponsors'],
  //   });

  //   const sponsor = await this.sponsorRepo.findOne({
  //     where: { id: _sponsorId },

  //     relations: ['sponsorings'],
  //   });

  //   if (user) {
  //     user.sponsors.push(sponsor);
  //     sponsor.sponsorings.push(user);
  //     await this.sponsorRepo.save(user);
  //     await this.sponsorRepo.save(sponsor);
  //     return user;
  //   }

  //   return null;
  // }

  // async doISponsor(sponsorId: string, userId: string) {
  //   const sponsor = await this.sponsorRepo.findOne({
  //     where: { id: sponsorId },
  //     relations: ['sponsorings'],
  //   });

  //   const user = await this.userRepo.findOne({
  //     where: { id: userId },
  //     relations: ['sponsors'],
  //   });

  //   if (sponsor && user) {
  //     console.log(sponsor.sponsorings);
  //     console.log(user.sponsors);

  //     const isSponsor = user.sponsors.find(
  //       (sponsor) => sponsor.id === sponsorId,
  //     );

  //     console.log(isSponsor);

  //     return isSponsor ? true : false;
  //   }

  //   return false;
  // }

  // async getSponsors(userId: string) {
  //   const user = await this.userRepo.findOne({
  //     where: { id: userId },
  //     relations: ['sponsors'],
  //   });

  //   if (user) {
  //     return user.sponsors;
  //   }

  //   return null;
  // }

  // async countSponsors(userId: string) {
  //   const user = await this.userRepo.findOne({
  //     where: { id: userId },
  //     relations: ['sponsors'],
  //   });

  //   if (user) {
  //     return user.sponsors.length;
  //   }

  //   return null;
  // }

  // async getSponsorings(userId: string) {
  //   const user = await this.sponsorRepo.findOne({
  //     where: { id: userId },
  //     relations: ['sponsorings'],
  //   });

  //   if (user) {
  //     return user.sponsorings;
  //   }

  //   return null;
  // }

  // async countSponsorings(userId: string) {
  //   const user = await this.sponsorRepo.findOne({
  //     where: { id: userId },
  //     relations: ['sponsorings'],
  //   });

  //   if (user) {
  //     return user.sponsorings.length;
  //   }

  //   return null;
  // }

  // create(createSponsorDto: CreateSponsorDto) {
  //   return 'This action adds a new sponsor';
  // }

  // findAll() {
  //   return `This action returns all sponsor`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} sponsor`;
  // }

  // update(id: string, updateSponsorDto: UpdateSponsorDto) {
  //   return `This action updates a #${id} sponsor`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} sponsor`;
  // }
}
