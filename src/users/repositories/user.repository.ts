import { EntityRepository, Repository } from 'typeorm';
import  User  from '../entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findOneBySlugUsingName(name: string) {
    const categoryName = name.trim().toLowerCase();
    const slug = categoryName.replace(/ /g, '-');

    const user = await this.findOne( slug );

    if (!user) {
      return undefined;
    }
    return user;
  }
}