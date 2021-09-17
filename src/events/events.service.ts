import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, getRepository, Repository, UpdateResult } from 'typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventsQueryDto } from './dto/events-query.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventsRespository: Repository<Event>
  ) {}

  async findAll(query: EventsQueryDto): Promise<Event[]> {
    console.log('hit find all service w/query:', query);
    const {
      agenda,
      audience,
      category,
      category_text,
      cost,
      creator_email,
      creator_name,
      custom_blurb,
      description,
      location,
      logo,
      start_date,
      end_date,
      start_time,
      end_time,
      panelists,
      promoted,
      summary,
      title,
      topics,
      url,
    } = query;
    // eslint-disable-next-line prefer-const
    let qb = this.eventsRespository.createQueryBuilder().select('events').from(Event, 'events').where('1=1');
    if (agenda) {
      qb.andWhere('events.agenda = :agenda', { agenda: agenda });
    }
    if (audience) {
      qb.andWhere('events.audience = :audience', { audience: audience });
    }
    if (category) {
      qb.andWhere('events.category = :category', { category: category });
    }
    if (category_text) {
      qb.andWhere('events.category_text = :category_text', { category_text: category_text });
    }
    if (cost) {
      qb.andWhere('events.cost = :cost', { cost: cost });
    }
    if (creator_email) {
      qb.andWhere('events.creator_email = :creator_email', { creator_email: creator_email });
    }
    if (creator_name) {
      qb.andWhere('events.creator_name = :creator_name', { creator_name: creator_name });
    }
    if (custom_blurb) {
      qb.andWhere('events.custom_blurb = :custom_blurb', { custom_blurb: custom_blurb });
    }
    if (description) {
      qb.andWhere('events.description = :description', { description: description });
    }
    if (location) {
      qb.andWhere('events.location = :location', { location: location });
    }
    if (logo) {
      qb.andWhere('events.logo = :logo', { logo: logo });
    }
    if (start_date) {
      qb.andWhere('events.start_date = :start_date', { start_date: start_date });
    }
    if (end_date) {
      qb.andWhere('events.end_date = :end_date', { end_date: end_date });
    }
    if (start_time) {
      qb.andWhere('events.start_time = :start_time', { start_time: start_time });
    }
    if (end_time) {
      qb.andWhere('events.end_time = :end_time', { end_time: end_time });
    }
    if (panelists) {
      qb.andWhere('events.panelists = :panelists', { panelists: panelists });
    }
    if (promoted) {
      qb.andWhere('events.promoted = :promoted', { promoted: promoted });
    }
    if (summary) {
      qb.andWhere('events.summary = :summary', { summary: summary });
    }
    if (title) {
      qb.andWhere('events.title = :title', { title: title });
    }
    if (topics) {
      qb.andWhere('events.topics = :topics', { topics: topics });
    }
    if (url) {
      qb.andWhere('events.url = :url', { url: url });
    }
    return await qb.orderBy('events.start_date', 'ASC').getMany();
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
