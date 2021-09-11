import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { EventbriteService } from 'src/eventbrite/eventbrite.service';
import { Observable } from 'rxjs';
import EventbriteEvent from 'src/eventbrite/EventbriteEvent';
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService, private readonly eventBriteService: EventbriteService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  create(@Body() createEventDto: CreateEventDto) {
    console.log('HIT POST NEW EVENT, w/createEventDto:', createEventDto);
    return this.eventsService.create(createEventDto);
  }

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Get('/ordered_date')
  findAllDateASC() {
    return this.eventsService.findAllDateASC();
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.eventsService.findOne(uuid);
  }

  @Get('event-brite/:id')
  async getEventBriteData(@Param('id') id: string): Promise<Observable<EventbriteEvent>> {
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
  remove(@Param('uuid') uuid: string) {
    return this.eventsService.remove(uuid);
  }
}
