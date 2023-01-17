import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import * as dotenv from 'dotenv';
dotenv.config();
import {HelmetMiddleware} from '@nest-middlewares/helmet';
import { PostModule } from './post/post.module';
import { User } from './user/entities/user.entity';
import { Post } from './post/entities/post.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Post],
      // autoLoadEntities: true,
      synchronize: true,
      ssl: process.env.DB_SSL === 'true' ? true : false,
    }),
    UserModule,
    PostModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(HelmetMiddleware).forRoutes('');
  }
}
