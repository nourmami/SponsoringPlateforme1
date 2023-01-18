import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SponsorService } from './sponsor.service';
import { CreateSponsorDto } from './dto/create-sponsor.dto';
import { UpdateSponsorDto } from './dto/update-sponsor.dto';
import { JwtAuthGuard } from './../user/guards/jwt-auth.guard';
import { AuthenticatedUser } from 'src/common/decorators';
import { User } from './../user/entities/user.entity';

@Controller('sponsor')
export class SponsorController {
  constructor(private readonly sponsorService: SponsorService) {}

  @Post(':id')
  @UseGuards(JwtAuthGuard)
  create(@Param('id') id: string, @AuthenticatedUser() user: User) {
    return this.sponsorService.sponsorUser(user.id, id);
  }

  @Get('doesponsor/:id')
  @UseGuards(JwtAuthGuard)
  doISponsor(@Param('id') id: string, @AuthenticatedUser() user: User) {
    return this.sponsorService.doISponsor(user.id, id);
  }

  @Get(':id')
  getSponsors(@Param('id') id: string) {
    return this.sponsorService.getSponsors(id);
  }

  @Get('')
  @UseGuards(JwtAuthGuard)
  getMySponsors(@AuthenticatedUser() user: User) {
    return this.sponsorService.getSponsors(user.id);
  }

  @Get('me/count')
  @UseGuards(JwtAuthGuard)
  countMySponsors(@AuthenticatedUser() user: User) {
    return this.sponsorService.countSponsors(user.id);
  }

  @Get('count/:id')
  @UseGuards(JwtAuthGuard)
  countSponsors(@Param('id') id: string) {
    return this.sponsorService.countSponsors(id);
  }

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
