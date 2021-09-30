import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  BadRequestException,
  ValidationPipe,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { EventbriteService } from 'src/eventbrite/eventbrite.service';
import { Observable } from 'rxjs';
import FormattedEvent from 'src/eventbrite/formattedEvent';
import { EventsQueryDto } from './dto/events-query.dto';
import { AdminGoogleService } from 'src/google/google.service';
@Controller('events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
    private readonly eventBriteService: EventbriteService,
    private readonly adminGoogleService: AdminGoogleService
  ) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createEventDto: CreateEventDto) {
    const saveResult = await this.eventsService.create(createEventDto);
    if (saveResult instanceof Error) {
      throw new BadRequestException();
    }
    return saveResult;
  }

  @Get('/google/google_consent')
  returnConsentUrl() {
    return this.adminGoogleService.authenticateGoogle();
  }

  @Post('/google/oauth2callback')
  async collectRefreshTokens(@Body('code') code?: string) {
    console.log(code);
    return await this.adminGoogleService.authorizeUser(code);
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.eventsService.findOne(uuid);
  }

  @Get()
  findAll(@Query(new ValidationPipe({ transform: true })) query?: EventsQueryDto) {
    return this.eventsService.findAll(query);
  }

  @Get('event-brite/:id')
  async getEventBriteData(@Param('id') id: string): Promise<Observable<FormattedEvent>> {
    return this.eventBriteService.getEventBrite(id);
  }

  @Patch(':uuid')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  update(@Param('uuid') uuid: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.updateOne(uuid, updateEventDto);
  }

  @Delete(':uuid')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async remove(@Param('uuid') uuid: string) {
    try {
      const res = await this.eventsService.remove(uuid);
      if (res instanceof Error) throw new Error(res.message);
      return { sucess: true, data: res, error: false };
    } catch (error) {
      return { success: false, data: {}, error: error.message };
    }
  }
}
