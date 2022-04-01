import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { getConnectionOptions } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExceptionsLoggerFilter } from './utils/exceptionsLogger.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const {httpAdapter}=app.get(HttpAdapterHost)
  app.useGlobalFilters(new ExceptionsLoggerFilter(httpAdapter)) // it is globally use 
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

