import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository, IsNull } from 'typeorm';
import { CreateSponsorDto } from './dto/create-sponsor.dto';
import { UpdateSponsorDto } from './dto/update-sponsor.dto';
import { Sponsor } from './entities/sponsor.entity';

@Injectable()
export class SponsorService {
  constructor(
    @InjectRepository(Sponsor)
    private sponsorRepo: Repository<Sponsor>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async sponsorUser(_sponsorId: string, userId: string) {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: ['sponsors'],
    });

    const sponsor = await this.sponsorRepo.findOne({
      where: { id: _sponsorId },

      relations: ['sponsorings'],
    });

    if (user) {
      user.sponsors.push(sponsor);
      // sponsor.sponsorings.push(user);
      // await this.sponsorRepo.save(user);
      await this.sponsorRepo.save(sponsor);
      return user;
    }

    return null;
  }

  async doISponsor(sponsorId: string, userId: string) {
    const sponsor = await this.sponsorRepo.findOne({
      where: { id: sponsorId },
      relations: ['sponsorings'],
    });

    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: ['sponsors'],
    });

    if (sponsor && user) {
      console.log(sponsor.sponsorings);
      console.log(user.sponsors);

      console.log(user.sponsors[0].id, sponsorId);

      const isSponsor = user.sponsors.find(
        (sponsor) => sponsor.id === sponsorId,
      );

      console.log(isSponsor);

      return isSponsor ? true : false;
    }

    return false;
  }

  async getSponsors(userId: string) {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: ['sponsors'],
    });

    if (user) {
      return user.sponsors;
    }

    return null;
  }

  async countSponsors(userId: string) {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: ['sponsors'],
    });

    if (user) {
      return user.sponsors.length;
    }

    return null;
  }

  // create(createSponsorDto: CreateSponsorDto) {
  //   return 'This action adds a new sponsor';
  // }

  // findAll() {
  //   return `This action returns all sponsor`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} sponsor`;
  // }

  // update(id: string, updateSponsorDto: UpdateSponsorDto) {
  //   return `This action updates a #${id} sponsor`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} sponsor`;
  // }
}
