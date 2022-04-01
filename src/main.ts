import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { getConnectionOptions } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  TypeOrmModule.forRootAsync({
    useFactory: async () =>
      Object.assign(await 
       getConnectionOptions(), {
        autoLoadEntities: true,
      }),
    })
  await app.listen(3000);
}
bootstrap();

