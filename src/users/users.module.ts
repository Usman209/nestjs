import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './entities/user.entity';
import { UsersController } from './users.controller';
import { AuthenticationService } from 'src/authentication/authentication.service';
import {  ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
 
@Module({
  imports: [TypeOrmModule.forFeature([User]),JwtModule.register({})],
  providers: [UserService,AuthenticationService,ConfigService],
  exports: [UserService,AuthenticationService,ConfigService],
  controllers:[UsersController]
})
export class UsersModule {}