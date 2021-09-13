import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdvancedConsoleLogger, DeleteResult, Repository, UpdateResult } from 'typeorm';
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

  async findAllDateASC(): Promise<Event[]> {
    return this.eventsRespository.find({ order: { start_date: 'ASC' } });
  }

  async create(eventData: CreateEventDto): Promise<Event> {
    const newEvent = this.eventsRespository.create({ ...eventData });
    await this.eventsRespository.save(newEvent);
    return newEvent;
  }

  async findOne(id: string): Promise<Event | undefined> {
    return await this.eventsRespository.findOne({
      where: {
        id: id,
      },
    });
  }

  async updateOne(id: string, eventData: Partial<UpdateEventDto>): Promise<UpdateResult> {
    return await this.eventsRespository.update(id, eventData);
  }

  async remove(id: string): Promise<DeleteResult> {
    return await this.eventsRespository.delete({ id });
  }
}
