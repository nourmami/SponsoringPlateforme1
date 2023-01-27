import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from '../user/guards/jwt-auth.guard';
import { AuthenticatedUser } from 'src/common/decorators';
import { User } from '../user/entities/user.entity';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('/conversations')
  @UseGuards(JwtAuthGuard)
  conversations(@AuthenticatedUser() user: User) {
    return this.chatService.getConversations(user.id);
  }

  @Get('/conversations/:id')
  @UseGuards(JwtAuthGuard)
  conversationsById(@Param('id') id: string, @AuthenticatedUser() user: User) {
    return this.chatService.getConversationById(id, user.id);
  }

  @Post('/messages/:id')
  @UseGuards(JwtAuthGuard)
  sendMessage(
    @Param('id') id: string,
    @Body('message') message: string,
    @AuthenticatedUser() user: User,
  ) {
    return this.chatService.sendMessage(id, user.id, message);
  }

  @Post('/generate/stripe/:id')
  @UseGuards(JwtAuthGuard)
  generateStripeLink(@AuthenticatedUser() user: User, @Param('id') id: string) {
    return this.chatService.generateStripeLink(user.id, id);
  }

  @Post('/validate/stripe')
  validateSponsorship(@Body() _body: any) {
    const body = _body.data.object;
    if (body.payment_status === 'paid') {
      const amount = body.amount_total;
      const id = body.payment_link;
      return this.chatService.validateSponsorship(id, amount);
    }
  }

  // @Post(':id')
  // @UseGuards(JwtAuthGuard)
  // create(@Param('id') id: string, @AuthenticatedUser() user: User) {
  //   return this.sponsorService.sponsorUser(user.id, id);
  // }

  // @Get('doesponsor/:id')
  // @UseGuards(JwtAuthGuard)
  // doISponsor(@Param('id') id: string, @AuthenticatedUser() user: User) {
  //   return this.sponsorService.doISponsor(user.id, id);
  // }

  // @Get(':id')
  // getSponsors(@Param('id') id: string) {
  //   return this.sponsorService.getSponsors(id);
  // }

  // @Get('sponsoring/star/:id')
  // getSponsorings(@Param('id') id: string) {
  //   return this.sponsorService.getSponsorings(id);
  // }

  // @Get('sponsoring/me')
  // @UseGuards(JwtAuthGuard)
  // getMySponsorings(@AuthenticatedUser() user: User) {
  //   return this.sponsorService.getSponsorings(user.id);
  // }

  // @Get('')
  // @UseGuards(JwtAuthGuard)
  // getMySponsors(@AuthenticatedUser() user: User) {
  //   return this.sponsorService.getSponsors(user.id);
  // }

  // @Get('me/count')
  // @UseGuards(JwtAuthGuard)
  // countMySponsors(@AuthenticatedUser() user: User) {
  //   return this.sponsorService.countSponsors(user.id);
  // }

  // @Get('count/:id')
  // @UseGuards(JwtAuthGuard)
  // countSponsors(@Param('id') id: string) {
  //   return this.sponsorService.countSponsors(id);
  // }

  // @Get('sponsoring/count/:id')
  // @UseGuards(JwtAuthGuard)
  // countSponsorings(@Param('id') id: string) {
  //   return this.sponsorService.countSponsorings(id);
  // }

  // @Get('mysponsors')
  // @UseGuards(JwtAuthGuard)
  // getSponsors(@AuthenticatedUser() user: User) {
  //   return user;
  // }

  // @Get('myfollowings')
  // @UseGuards(JwtAuthGuard)
  // getfollowings(@AuthenticatedUser() user: User) {
  //   return user.following;
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSponsorDto: UpdateSponsorDto) {
  //   return this.sponsorService.update(id, updateSponsorDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.sponsorService.remove(+id);
  // }
}
