import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventsRespository: Repository<Event>
  ) {}

  async findAll(): Promise<Event[]> {
    return this.eventsRespository.find();
  }

  async create(eventData: CreateEventDto): Promise<Event> {
    const newEvent = await this.eventsRespository.create({ ...eventData });
    await this.eventsRespository.save(newEvent);
    return newEvent;
  }

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
