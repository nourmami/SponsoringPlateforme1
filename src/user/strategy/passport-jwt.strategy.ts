import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PayloadInterface } from '../interfaces/payload.interface';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Sponsor } from 'src/sponsor/entities/sponsor.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Sponsor)
    private sponsorRepository: Repository<Sponsor>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('SECRET'),
    });
  }

  // function to validate the token every time a request is made
  async validate(payload: PayloadInterface) {
    if (payload.role === 'sponsor') {
      const sponsor = await this.sponsorRepository.findOne({
        where: { userName: payload.userName },
      });
      if (!sponsor) {
        throw new UnauthorizedException();
      }
      //return user without password and salt
      delete sponsor.salt;
      delete sponsor.password;
      return sponsor;
    } else {
      const user = await this.userRepository.findOne({
        where: { userName: payload.userName },
      });
      if (!user) {
        throw new UnauthorizedException();
      }
      //return user without password and salt
      delete user.salt;
      delete user.password;
      return user;
    }
  }
}
