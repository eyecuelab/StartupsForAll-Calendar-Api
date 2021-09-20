import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { addToGoogleCalendar } from 'src/google/google.service';
import { EventsQueryDto } from './dto/events-query.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventsRespository: Repository<Event>
  ) {}

  async findAll(): Promise<Event[]> {
    return this.eventsRespository.find();
  }

  // async findAll(query: EventsQueryDto): Promise<Event[]> {
  //   console.log('hit find all service w/query:', query);
  //   return this.eventsRespository.find();
  // }

  async findByQuery(): Promise<Event[]> {
    const result = await this.eventsRespository
      .createQueryBuilder()
      // select from the events table
      .select('event')
      // create an alias of type Event called event, used later in the query
      .from(Event, 'event')
      // use :title as a parameter instead of interpolating string as that allows sql injection
      .where('event.title = :title', { title: 'Test' })
      // optional additional where filters
      // .andWhere('event.blah = :alsoMe', { blah: 'Something Else' })
      // ascending, descending results
      .orderBy('event.start_date', 'ASC')
      // optional secondary/tertiary ordering
      // .addOrderBy('event.title', 'ASC')
      // option to print the raw sql to console, used for testing
      .printSql()
      // get more than one, maybe use getManyOrFail() instead?
      .getMany();
    console.log('findByQuery got result:', result);
    return result;
  }

  async findByCategory(category: string): Promise<Event[]> {
    console.log('hit the find by category service');
    return await this.eventsRespository
      .createQueryBuilder()
      .select('event')
      .from(Event, 'events')
      .where('events.category = :category', { category: category })
      // .orderBy('events.start_date', 'ASC')
      .getMany();

    //   where({
    // ...(name && {name: 'butternut squash'}),
    // })
  }

  async create(eventData: CreateEventDto): Promise<Event> {
    const newEvent = this.eventsRespository.create({ ...eventData });
    const res = await addToGoogleCalendar(newEvent);
    if (res.status === 200) {
      newEvent.audience = res.data.created;
    }
    return await this.eventsRespository.save(newEvent);
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
