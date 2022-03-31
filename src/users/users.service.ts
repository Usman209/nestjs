import { HttpException, HttpStatus, Inject, Injectable,forwardRef } from '@nestjs/common';
import { AuthenticationService } from 'src/authentication/authentication.service';
import { Repository } from 'typeorm';
import CreateUserDto from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import User from './entities/user.entity';
@Injectable()
export class UserService {
  
  constructor(
    @Inject(forwardRef(() => AuthenticationService))
    // @Inject(User)

    // private usersRepository: Repository<User>
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async getByEmail(email: string) {
    const user = await this.usersRepository.findOne({ email });
    if (user) {
      return user;
    }
    throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
  }

  async getById(id: number) {
    const user = await this.usersRepository.findOne({ id });
    if (user) {
      return user;
    }
    throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
  }

  async create(userData: CreateUserDto) {

    const newUser = await  this.create(userData);

     await this.usersRepository.save(newUser);
    return newUser;
  }
}