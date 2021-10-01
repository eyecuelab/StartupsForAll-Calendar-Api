import { Body, Controller, Get, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from '../users/entities/user.entity';
import { LoginUserDto } from '../users/dto/loginUser.dto';
import { EventKeyUserDto } from '../users/dto/eventKeyUser.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UsersService } from 'src/users/users.service';
import { EventKeyAuthGuard } from './guards/event-key-auth.guard';
import { calendar } from 'googleapis/build/src/apis/calendar';

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

  @Get('oAuthTokenStatus')
  async checkStatusOfGoogleAuth() {
    return await this.usersService.checkGoogleAuthStatus();
  }

  @Post('google/update-calendar-id')
  @UseGuards(JwtAuthGuard)
  async updateAdminCalendarID(@Body('calendarID') calendarID?: string) {
    const updateResponse = await this.usersService.updateAdminCalendarID(calendarID);
    return updateResponse;
  }

  @Post('confirm-privileges')
  @UseGuards(EventKeyAuthGuard)
  async loginAsEvent(@Body() data: EventKeyUserDto) {
    // get the ID of the eventKey user, as this will later be required to create events w/this account
    const { id } = await this.usersService.findByUsername('eventKey');
    const user: User = {
      email: data.email,
      hashPassword: null,
      id: id,
      is_admin: false,
      password: data.password,
      username: 'eventKey',
    };
    const { access_token } = await this.authService.login(user);
    return { access_token: access_token, name: data.name, email: data.email };
  }

  @Post('eventkey/password')
  @UseGuards(JwtAuthGuard)
  async changeEventkeyPassword(@Body() body: any) {
    return this.authService.changeEventkeyPassword(body.password);
  }
}
