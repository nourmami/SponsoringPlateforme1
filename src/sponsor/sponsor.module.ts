import { Module } from '@nestjs/common';
import { SponsorService } from './sponsor.service';
import { SponsorController } from './sponsor.controller';
import { User } from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sponsor } from './entities/sponsor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Sponsor])],
  controllers: [SponsorController],
  providers: [SponsorService],
})
export class SponsorModule {}
