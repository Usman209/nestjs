import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
// import { CreateAuthenticationDto } from './dto/logIn.dto';
import * as bcrypt from 'bcrypt';
import RegisterDto from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { ConfigService } from '@nestjs/config';
import PostgresErrorCode from 'src/database/postgresErrorCodes.enum';
import User from 'src/users/entities/user.entity';

export class AuthenticationService {

  constructor(
    // @InjectRepository()

    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  // (...)

  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    console.log('from here');
    try {
      const user = await this.usersService.getByEmail(email);
      await this.verifyPassword(plainTextPassword, user.password);
      // user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided 1',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    console.log('from here 1 ');

    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided 2',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async register(registrationData: RegisterDto) {
    console.log(registrationData);
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    var data = { ...registrationData, password: hashedPassword };

    try {
      console.log('test')
      const createdUser = await this.usersService.create123(data);

      console.log('inside', createdUser);
      createdUser.password = '';
      return createdUser;
    } catch (error) {
      console.log(error);
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'User with that email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong ...',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  public async getCookieWithJwtToken(userId: number) {
    const payload: tokenPayload = { userId };
    const token = this.jwtService.sign(payload);

    return `Authentication=${token}; Httponly:path=/;Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME',
    )}`;
  }
  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }
}
