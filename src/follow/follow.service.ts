import { Injectable } from '@nestjs/common';
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

  async unfollow(id:number,user : User) {
    const currentUser = await this.userRepo.findOne({where : { id : user.id}});
    if (currentUser.following.includes(id)){
      const oldFollowing = currentUser.following.indexOf(id);
      currentUser.following.splice(oldFollowing,1);
      const followersold= currentUser.followers.indexOf(this.functionnameService.arguments.id);
      currentUser.followers.splice(followersold,1)
      await this.userRepo.save(currentUser);
      console.log('vous n etes plus abonnée à ',user.userName);
    }
    else {
      console.log('vous n etes pas abonnée à ',user.userName);
    }
  }
  
  async follow(id:number,user : User) {
    const currentUser = await this.userRepo.findOne({where : { id : user.id}});
    if (currentUser.following.includes(id)){
      console.log('vous etes deja abonnée à ',user.userName);
    }
    else {
      currentUser.following.push(id);
      const userToFollow = await this.userRepo.findOne({where : { id : id}});
      userToFollow.followers.push(user.id);
      await this.userRepo.save(currentUser);
      await this.userRepo.save(userToFollow);
      console.log('vous etes abonnée à ',user.userName);
    }
  }
  
}
