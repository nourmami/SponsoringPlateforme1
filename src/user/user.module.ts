import { MiddlewareConsumer, Module } from '@nestjs/common';
import { userService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { JwtStrategy } from './strategy/passport-jwt.strategy';
dotenv.config();
import { ConfigService } from '@nestjs/config';
import { roleProtector } from 'src/common/decorators';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
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
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(roleProtector).forRoutes('/user/me');
  }
}
