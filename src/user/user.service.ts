import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { loginDto } from './DTO/login.dto';
import { signupDto } from './DTO/signup.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class userService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.userRepo.find();
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepo.findOne({where : { id : id}});
        if (!user) {
            throw new NotFoundException(`user #${id} not found`);
        }
        return user;
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

    throw new UnauthorizedException(
      `Le username/email ou le mot de passe est incorrect`,
    );
  }

  async signup(signupdata: signupDto): Promise<Partial<User>> {
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
    return {
      id: user.id,
      userName: user.userName,
      email: user.email,
      role: user.role,
    };
  }

  async logout() {}


  async updateUser(id:number,newUser:signupDto): Promise<User>{
    const newEntity = await this.userRepo.preload({id, ...newUser});
    if (!newEntity) {
        throw new NotFoundException(`User #${id} not found`);
    }
    return await this.userRepo.save(newEntity);

  }
  

  async deleteUser(id: string) {
    return await this.userRepo.delete(id);
  }
}