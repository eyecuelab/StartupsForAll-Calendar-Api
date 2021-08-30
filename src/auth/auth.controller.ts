import { Body, Controller, Get, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from '../users/entities/user.entity';
import { LoginUserDto } from '../users/dto/loginUser.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UsersService } from 'src/users/users.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly usersService: UsersService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  async login(@Body() data: LoginUserDto, @Req() request) {
    return this.authService.login(request.user);
  }

  @Get('admin')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getAdmin(@Req() request) {
    return request.user;
  }

  @Post('confirm-privileges')
  async loginAsEvent(@Body() data: LoginUserDto) {
    // get the ID of the eventKey user, as this will later be required to create events w/this account
    const { id } = await this.usersService.findByUsername('eventKey');
    const user: User = {
      id: id,
      email: null,
      hashPassword: null,
      username: 'eventKey',
      password: data.password,
    };
    return this.authService.login(user);
  }
}
