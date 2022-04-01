import { Module,forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './entities/user.entity';
import { UsersController } from './users.controller';
import { AuthenticationService } from 'src/authentication/authentication.service';
import {  ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationModule } from 'src/authentication/authentication.module';
import { UserRepository } from './repositories/user.repository';
 
@Module({
  imports: [TypeOrmModule.forFeature([User,UserRepository]),JwtModule.register({})],
  providers: [UsersService,AuthenticationService,ConfigService],
  exports: [UsersService,AuthenticationService,ConfigService],
  controllers:[UsersController]
})
export class UsersModule {}