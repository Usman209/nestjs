import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { AuthenticationService } from 'src/authentication/authentication.service';
import { Repository, Connection, getManager } from 'typeorm';
import CreateUserDto from './dto/create-user.dto';
import User from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthenticationService))
    @Inject(User)
    private usersRepository: Repository<User>,
    private readonly authenticationService: AuthenticationService,
    private readonly user123: UserRepository,
  ) {
  }

  async getByEmail(email: string) {
    const user = await this.user123.findOne({ email });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async getById(id: number) {
    const user = await this.usersRepository.findOne({ id });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async create(userData: CreateUserDto) {
    // const abc= await this.user123.c
    const newUser = await this.user123.create(userData);

    await this.user123.save(newUser);
    return newUser;
  }
}
