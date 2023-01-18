import { Injectable, Logger } from '@nestjs/common';
import { User } from './../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async doesFollow(id: string, user: User) {
    const followedUser = await this.userRepo.findOne({
      where: { id: id },
      relations: ['following', 'followers'],
    });

    const doesIt = followedUser.followers.find(
      (following) => following.id === user.id,
    );

    if (doesIt) {
      return true;
    } else {
      return false;
    }
  }

  async follow(id: string, user: User) {
    const currentUser = await this.userRepo.findOne({
      where: { id: user.id },
      relations: ['following', 'followers'],
    });

    console.log(currentUser);

    const userToFollow = currentUser.following.find(
      (following) => following.id === id,
    );
    if (userToFollow) {
      console.log('vous etes deja abonnée à ', user.userName);
    } else {
      const followedUser = await this.userRepo.findOne({
        where: { id: id },
        relations: ['following', 'followers'],
      });

      // currentUser.following.push(followedUser);
      followedUser.followers.push(currentUser);

      await this.userRepo.save(currentUser);
      await this.userRepo.save(followedUser);
      console.log('vous etes abonnée à ', user.userName);
    }
  }

  async unfollow(id: string, user: User) {
    const followedUser = await this.userRepo.findOne({
      where: { id },
      relations: ['following', 'followers'],
    });

    followedUser.followers = followedUser.followers.filter(
      (followers) => followers.id !== user.id,
    );

    // currentUser.following = [];
    // unfollowed.followers = [];
    await this.userRepo.save(followedUser);
    // await this.userRepo.save(unfollowed);
    console.log('youre no longer following ', user.userName);
    // } else {
    // console.log('youre not following ', user.userName);
    // }
  }

  async getFollowers(user: User) {
    const currentUser = await this.userRepo.findOne({
      where: { id: user.id },
      relations: ['following', 'followers'],
    });

    return currentUser.followers;
  }
}
