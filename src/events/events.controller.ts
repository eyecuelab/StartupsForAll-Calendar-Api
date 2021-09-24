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
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService, private readonly eventBriteService: EventbriteService) {}

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

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.eventsService.findOne(uuid);
  }

  @Get()
  findAll(@Query(new ValidationPipe({ transform: true })) query?: EventsQueryDto) {
    console.log('events controller query:', query);
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
  remove(@Param('uuid') uuid: string) {
    return this.eventsService.remove(uuid);
  }
}
