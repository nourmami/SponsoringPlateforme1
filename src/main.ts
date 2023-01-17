import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from '@nestjs/common';
import * as morgan from 'morgan';
import * as dotenv from 'dotenv';

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(morgan('dev'));
  const options = {
    origin: 'http://[::1]:3000',
  };

  app.enableCors(options);

  app.useGlobalPipes(new ValidationPipe({
    transform : true ,
    whitelist : true ,
    forbidNonWhitelisted : true
  })); 

  await app.listen(4000);
}

bootstrap();
