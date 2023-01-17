import { Injectable } from '@nestjs/common';
import { CreateSponsorDto } from './dto/create-sponsor.dto';
import { UpdateSponsorDto } from './dto/update-sponsor.dto';

@Injectable()
export class SponsorService {
  create(createSponsorDto: CreateSponsorDto) {
    return 'This action adds a new sponsor';
  }

  findAll() {
    return `This action returns all sponsor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sponsor`;
  }

  update(id: number, updateSponsorDto: UpdateSponsorDto) {
    return `This action updates a #${id} sponsor`;
  }

  remove(id: number) {
    return `This action removes a #${id} sponsor`;
  }
}
