import { Injectable } from '@nestjs/common';
import { CreateFollowDto } from './dto/create-follow.dto';
import { User } from './../user/entities/user.entity';


@Injectable()
export class FollowService {
  create(createFollowDto: CreateFollowDto) {
    return 'This action adds a new follow';
  }

  async unfollow(user : User) {
    
    return;
  }
}
