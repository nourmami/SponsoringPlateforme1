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
  
  async follow(id:number,user : User) {
    const currentUser = await this.userRepo.findOne({where : { id : user.id}});
    const userToFollow = currentUser.following.find(following => following.id === id);
    if (userToFollow){
      console.log('vous etes deja abonnée à ',user.userName);
    }
    else {
      currentUser.following.push(userToFollow);
      userToFollow.followers.push(currentUser);
      await this.userRepo.save(currentUser);
      await this.userRepo.save(userToFollow);
      console.log('vous etes abonnée à ',user.userName);
    }
  }

  async unfollow(id:number,user : User) {
    const currentUser = await this.userRepo.findOne({where : { id : user.id}});
    const userToUnfollow = currentUser.following.find(following => following.id === id);
    if (userToUnfollow){
      currentUser.following = currentUser.following.filter(following => following.id !== id);
      userToUnfollow.followers = userToUnfollow.followers.filter(followers => followers.id !== user.id);
      await this.userRepo.save(currentUser);
      await this.userRepo.save(userToUnfollow);
      console.log('youre no longer following ',user.userName);
    }
    else {
      console.log('youre not following ',user.userName);
    }
  }
  
}
