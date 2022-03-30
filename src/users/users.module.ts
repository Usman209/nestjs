import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './entities/user.entity';
import { UsersController } from './users.controller';
import { AuthenticationService } from 'src/authentication/authentication.service';
 
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService,AuthenticationService],
  exports: [UsersService],
  controllers:[UsersController]
})
export class UsersModule {}