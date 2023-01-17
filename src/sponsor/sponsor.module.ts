import { Module } from '@nestjs/common';
import { SponsorService } from './sponsor.service';
import { SponsorController } from './sponsor.controller';

@Module({
  controllers: [SponsorController],
  providers: [SponsorService]
})
export class SponsorModule {}
