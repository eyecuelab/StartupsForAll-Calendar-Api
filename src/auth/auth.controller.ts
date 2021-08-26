import { Body, Controller, Get, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { LoginUserDto } from '../users/dto/loginUser.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  async login(@Body() data: LoginUserDto, @Req() request) {
    return this.authService.login(request.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('admin')
  async getAdmin(@Req() req) {
    // TODO: make this return more meaningful info, events queue controls?
    return req.user;
  }
}
