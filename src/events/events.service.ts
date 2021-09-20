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

  async findAll(query: EventsQueryDto): Promise<Event[]> {
    console.log('hit find all service w/query:', query);
    // eslint-disable-next-line prefer-const
    let qb = this.eventsRespository.createQueryBuilder().select('events').from(Event, 'events').where('1=1');
    if (query.agenda) {
      qb.andWhere('events.agenda = :agenda', { agenda: query.agenda });
    }
    if (query.audience) {
      qb.andWhere('events.audience = :audience', { audience: query.audience });
    }
    if (query.category) {
      qb.andWhere('events.category = :category', { category: query.category });
    }
    if (query.category_text) {
      qb.andWhere('events.category_text = :category_text', { category_text: query.category_text });
    }
    if (query.cost) {
      qb.andWhere('events.cost = :cost', { cost: query.cost });
    }
    if (query.creator_email) {
      qb.andWhere('events.creator_email = :creator_email', { creator_email: query.creator_email });
    }
    if (query.creator_name) {
      qb.andWhere('events.creator_name = :creator_name', { creator_name: query.creator_name });
    }
    if (query.custom_blurb) {
      qb.andWhere('events.custom_blurb = :custom_blurb', { custom_blurb: query.custom_blurb });
    }
    if (query.description) {
      qb.andWhere('events.description = :description', { description: query.description });
    }
    if (query.location) {
      qb.andWhere('events.location = :location', { location: query.location });
    }
    if (query.logo) {
      qb.andWhere('events.logo = :logo', { logo: query.logo });
    }
    if (query.start_date) {
      qb.andWhere('events.start_date = :start_date', { start_date: query.start_date });
    }
    if (query.end_date) {
      qb.andWhere('events.end_date = :end_date', { end_date: query.end_date });
    }
    if (query.start_time) {
      qb.andWhere('events.start_time = :start_time', { start_time: query.start_time });
    }
    if (query.end_time) {
      qb.andWhere('events.end_time = :end_time', { end_time: query.end_time });
    }
    if (query.panelists) {
      qb.andWhere('events.panelists = :panelists', { panelists: query.panelists });
    }
    if (query.promoted) {
      qb.andWhere('events.promoted = :promoted', { promoted: query.promoted });
    }
    if (query.summary) {
      qb.andWhere('events.summary = :summary', { summary: query.summary });
    }
    if (query.title) {
      qb.andWhere('events.title = :title', { title: query.title });
    }
    if (query.topics) {
      qb.andWhere('events.topics = :topics', { topics: query.topics });
    }
    if (query.url) {
      qb.andWhere('events.url = :url', { url: query.url });
    }
    return await qb.orderBy('events.start_date', 'ASC').getMany();
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
