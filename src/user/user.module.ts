import { MiddlewareConsumer, Module } from '@nestjs/common';
import { userService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { JwtStrategy } from './strategy/passport-jwt.strategy';
dotenv.config();
import { ConfigService } from '@nestjs/config';
import { User } from 'src/user/entities/user.entity';
import { Post } from 'src/post/entities/post.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Post]),
    PassportModule.register({ defaultStrategy: 'jwt' }), //importer passport module
    JwtModule.register({
      //importer jwt module that provides jwt services
      secret: process.env.SECRET,
      signOptions: { expiresIn: 3600 },
    }),
  ],
  controllers: [UserController],
  providers: [userService, JwtStrategy, ConfigService],
  exports: [userService],
})
export class UserModule {}
