import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { EventbriteService } from 'src/eventbrite/eventbrite.service';
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService, private readonly eventBriteService: EventbriteService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.eventsService.findOne(uuid);
  }

  @Get('event-brite/:id')
  async getEventBriteData(@Param('id') id: string) {
    const rawData = this.eventBriteService.getEventBrite(id);
    return await this.eventBriteService.formatEventData(rawData);
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
