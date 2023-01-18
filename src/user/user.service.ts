import {ConflictException,Injectable,NotFoundException,UnauthorizedException,} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { User } from './entities/user.entity';
import { loginDto } from './DTO/login.dto';
import { signupDto, updateDto } from './DTO/signup.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserRoleEnum } from 'src/enums/user-role.enum';
import { Sponsor } from 'src/sponsor/entities/sponsor.entity';

@Injectable()
export class userService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService,
    @InjectRepository(Sponsor)
    private sponsorRepo: Repository<Sponsor>,
  ) {}

  async getUsers(except: string) {
    return await this.userRepo.find({
      where: { id: Not(except) },
    });
  }

  async getUserById(id: string, me: string) {
    const user = await this.userRepo.findOne({ where: { id: id } });

    // const doIFollow = await user.f

    if (!user) {
      throw new NotFoundException(`user #${id} not found`);
    }
    return user;
  }

  async signup(role: string, signupdata: signupDto) {
    if (role === UserRoleEnum.USER) {
      const user = this.userRepo.create({
        ...signupdata,
      });
      user.salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(user.password, user.salt);
      try {
        await this.userRepo.save(user);
      } catch (e) {
        throw new ConflictException(
          `Le username et le email doivent être unique`,
        );
      }
    } else {
      // TODO: test with sponsor
      const sponsor = this.sponsorRepo.create({
        ...signupdata,
        role: UserRoleEnum.SPONSOR,
      });

      sponsor.salt = await bcrypt.genSalt();
      sponsor.password = await bcrypt.hash(sponsor.password, sponsor.salt);
      try {
        await this.sponsorRepo.save(sponsor);
      } catch (e) {
        throw new ConflictException(
          `Le username et le email doivent être unique`,
        );
      }
    }
  }

  async login(logindata: loginDto) {
    const user = await this.userRepo
      .createQueryBuilder('user')
      .where('user.userName = :userName or user.email = :email ', {
        userName: logindata.userName,
        email: logindata.email,
      })
      .getOne();

    if (user) {
      const valid = await bcrypt.compare(logindata.password, user.password);
      if (valid) {
        const payload = {
          id: user.id,
          userName: user.userName,
          role: user.role,
        };
        const token = this.jwtService.sign(payload);
        return { token: token };
      }
    }

    const sponsor = await this.sponsorRepo
      .createQueryBuilder('sponsor')
      .where('sponsor.userName = :userName or sponsor.email = :email ', {
        userName: logindata.userName,
        email: logindata.email,
      })
      .getOne();

    if (sponsor) {
      const valid = await bcrypt.compare(logindata.password, sponsor.password);
      if (valid) {
        const payload = {
          id: sponsor.id,
          userName: sponsor.userName,
          role: sponsor.role,
        };

        const token = this.jwtService.sign(payload);
        return { token: token };
      }
    }

    // TODO: test with sponsor

    throw new UnauthorizedException(
      `Le username/email ou le mot de passe est incorrect`,
    );
  }

  async logout() {}

  async updateUser(role: string, id: string, newUser: any) {
    if (role === UserRoleEnum.USER) {
      const newEntity = await this.userRepo.preload({ id, ...newUser });
      if (!newEntity) {
        throw new NotFoundException(`User #${id} not found`);
      }
      return await this.userRepo.save(newEntity);
    } else {
      const newEntity = await this.sponsorRepo.preload({ id, ...newUser });
      if (!newEntity) {
        throw new NotFoundException(`Sponsor #${id} not found`);
      }
      return await this.sponsorRepo.save(newEntity);
    }
  }

  async deleteUser(id: string) {
    return await this.userRepo.delete(id);
  }
}