import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { Connection } from 'typeorm';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionsLoggerFilter } from './utils/exceptionsLogger.filter';
 
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true ,
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
      autoLoadEntities: true,

      })

    }),
    
    DatabaseModule,
    UsersModule,
    AuthenticationModule,
  ],
  controllers: [],
  providers: [{
    provide:APP_FILTER,
    useClass:ExceptionsLoggerFilter // also goblly can use this way 
  }],
})
export class AppModule {
  constructor(private connection: Connection) {}
}