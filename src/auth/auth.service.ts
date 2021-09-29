import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { PostgresErrorCode } from '../database/postgresErrorCodes.enum';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      return null;
    }
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      delete user.password;
      return user;
    }
    return null;
  }

  async login(user: Omit<User, 'password'>) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async changeEventkeyPassword(password: string) {
    const hash = await bcrypt.hash(password, 10);
    const user = await this.usersService.findByUsername('eventKey');
    user.password = hash;
    return await this.usersRepository.save(user);
  }
}
