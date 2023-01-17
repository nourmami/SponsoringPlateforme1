import { Injectable } from '@nestjs/common';
import { CreateFollowDto } from './dto/create-follow.dto';
import { User } from './../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtAuthGuard } from './../user/guards/jwt-auth.guard';
import { AuthenticatedUser } from 'src/common/decorators';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    
  ) {}

  create(createFollowDto: CreateFollowDto) {
    return 'This action adds a new follow';
  }
  functionnameService(user){}
 
  async unfollow(user : User) {
      const followingold =await this.functionnameService.arguments.following.indexOf(user);
      this.functionnameService.arguments.following.splice(followingold,1);
      const followersold= user.followers.indexOf(this.functionnameService.arguments.id);
      user.followers.splice(followersold,1)

    console.log('vous n etes plus abonnée à ',user.userName);
  }
  
}
