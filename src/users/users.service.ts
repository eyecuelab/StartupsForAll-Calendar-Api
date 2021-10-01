import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { admin } from 'googleapis/build/src/apis/admin';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async findOne(attributes: Partial<User>): Promise<User | undefined> {
    const options: FindOneOptions<User> = {
      where: {
        ...attributes,
      },
    };
    const user = await this.usersRepository.findOne(options);
    delete user.password;
    return user;
  }

  async findByUsername(username: string) {
    return this.usersRepository.findOne({
      where: {
        username,
      },
    });
  }

  async create(userData: CreateUserDto) {
    const newUser = await this.usersRepository.create(userData);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async checkGoogleAuthStatus() {
    const adminGoogle = await this.usersRepository.findOne({
      where: {
        username: 'admin',
      },
    });
    if (adminGoogle.google_refresh_token.length) {
      return true;
    } else {
      return false;
    }
  }

  async updateAdminCalendarID(calendarID: string) {
    const adminGoogle = await this.usersRepository.findOne({
      where: {
        username: 'admin',
      },
    });
    const { id } = adminGoogle;
    return await this.usersRepository.update(id, { calendar_id: calendarID });
  }
}
