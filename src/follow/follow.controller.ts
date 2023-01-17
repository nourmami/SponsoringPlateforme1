import { Controller, Get, Post, Body, Patch, Param,Put, Delete,UseGuards } from '@nestjs/common';
import { FollowService } from './follow.service';
import { JwtAuthGuard } from './../user/guards/jwt-auth.guard';
import { AuthenticatedUser } from 'src/common/decorators';
import { User } from './../user/entities/user.entity';



@Controller('follow')
@UseGuards(JwtAuthGuard)
export class FollowController {
  constructor(private readonly followService: FollowService) {}

@Post()
@UseGuards(JwtAuthGuard)
create(@Param('id') id : number , @AuthenticatedUser() user: User) {
return this.followService.follow(id,user);
}
 
@Get('myfollowers')
@UseGuards(JwtAuthGuard)
getFollowers(@AuthenticatedUser() user: User) {
    return user.followers;

  }

@Get('myfollowings')
@UseGuards(JwtAuthGuard)
getfollowings(@AuthenticatedUser() user: User) {
    return user.following;
  
  }


@Delete(':id')
@UseGuards(JwtAuthGuard)
async unfollow(@Param('id') id : number , @AuthenticatedUser() user: User) {
    return this.followService.unfollow(id,user);
  }

  
}


