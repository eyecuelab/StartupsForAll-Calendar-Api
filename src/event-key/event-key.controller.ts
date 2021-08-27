import { Controller, Post, Body, UseGuards, HttpCode, Req } from '@nestjs/common';
import { EventKeyService } from './event-key.service';
import { CreateEventKeyDto } from './dto/create-event-key.dto';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';

@Controller('event-key')
export class EventKeyController {
  constructor(private readonly eventKeyService: EventKeyService) {}

  @Post()
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  async eventKey(@Body() data: CreateEventKeyDto, @Req() request) {
    return this.eventKeyService.createEventKey(request.user);
  }
}
