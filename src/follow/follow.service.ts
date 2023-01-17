import { Injectable } from '@nestjs/common';
import { CreateFollowDto } from './dto/create-follow.dto';


@Injectable()
export class FollowService {
  create(createFollowDto: CreateFollowDto) {
    return 'This action adds a new follow';
  }

  async unfollow(id: number) {
    return await this.followRepo.delete(id);
  }
}
