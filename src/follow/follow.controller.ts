import { Controller, Get, Post, Body, Patch, Param,Put, Delete,UseGuards } from '@nestjs/common';
import { FollowService } from './follow.service';
import { CreateFollowDto } from './dto/create-follow.dto';
import { JwtAuthGuard } from './../user/guards/jwt-auth.guard';
import { AuthenticatedUser } from 'src/common/decorators';
import { User } from './../user/entities/user.entity';



@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

@Post()
create(@Body() createFollowDto: CreateFollowDto) {
return this.followService.create(createFollowDto);
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
  unfollow(@AuthenticatedUser() user: User) {
    return this.followService.unfollow(user);
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  function_name(@AuthenticatedUser() user: User) {
    return functionnameService(user);

  }
}


