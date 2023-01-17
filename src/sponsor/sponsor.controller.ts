import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SponsorService } from './sponsor.service';
import { CreateSponsorDto } from './dto/create-sponsor.dto';
import { UpdateSponsorDto } from './dto/update-sponsor.dto';
import { JwtAuthGuard } from './../user/guards/jwt-auth.guard';
import { AuthenticatedUser } from 'src/common/decorators';
import { User } from './../user/entities/user.entity';


@Controller('sponsor')
export class SponsorController {
  constructor(private readonly sponsorService: SponsorService) {}

  @Post()
  create(@Body() createSponsorDto: CreateSponsorDto) {
    return this.sponsorService.create(createSponsorDto);
  }

  @Get('mysponsors')
@UseGuards(JwtAuthGuard)
getSponsors(@AuthenticatedUser() user: User) {
    return user;

  }

@Get('myfollowings')
@UseGuards(JwtAuthGuard)
getfollowings(@AuthenticatedUser() user: User) {
    return user.following;
  
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSponsorDto: UpdateSponsorDto) {
    return this.sponsorService.update(+id, updateSponsorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sponsorService.remove(+id);
  }
}
