import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository, IsNull } from 'typeorm';
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
      sponsor.sponsorings.push(user);
      await this.sponsorRepo.save(user);
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

  async getSponsorings(userId: string) {
    const user = await this.sponsorRepo.findOne({
      where: { id: userId },
      relations: ['sponsorings'],
    });

    if (user) {
      return user.sponsorings;
    }

    return null;
  }

  async countSponsorings(userId: string) {
    const user = await this.sponsorRepo.findOne({
      where: { id: userId },
      relations: ['sponsorings'],
    });

    if (user) {
      return user.sponsorings.length;
    }

    return null;
  }

  
}
