import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { AdminGoogleService } from 'src/google/google.service';
import { EventsQueryDto } from './dto/events-query.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventsRespository: Repository<Event>,
    private adminGoogleService: AdminGoogleService // private usersRepository: Repository<User>
  ) {}

  async findAll(query: EventsQueryDto): Promise<Event[]> {
    console.log('hit find all service w/query:', query);
    // eslint-disable-next-line prefer-const
    let qb = this.eventsRespository.createQueryBuilder().select('events').from(Event, 'events');
    if (query.in_google_cal) {
      qb.orWhere('events.in_google_cal = :in_google_cal', {
        in_google_cal: query.in_google_cal,
      });
    }

    if (query.category && query.category.length > 0) {
      console.log('get categories:', query.category);
      qb.orWhere(`events.category = ANY(:category)`, { category: query.category });
    }
    if (query.category_text) {
      qb.orWhere('events.category_text = :category_text', { category_text: query.category_text });
    }
    if (query.cost) {
      qb.orWhere('events.cost = :cost', { cost: query.cost });
    }
    if (query.creator_email) {
      qb.orWhere('events.creator_email = :creator_email', { creator_email: query.creator_email });
    }
    if (query.creator_name) {
      qb.orWhere('events.creator_name = :creator_name', { creator_name: query.creator_name });
    }
    if (query.custom_blurb) {
      qb.orWhere('events.custom_blurb = :custom_blurb', { custom_blurb: query.custom_blurb });
    }
    if (query.location) {
      qb.orWhere('events.location = :location', { location: query.location });
    }
    if (query.logo) {
      qb.orWhere('events.logo = :logo', { logo: query.logo });
    }
    if (query.start_date) {
      qb.orWhere('events.start_date = :start_date', { start_date: query.start_date });
    }
    if (query.end_date) {
      qb.orWhere('events.end_date = :end_date', { end_date: query.end_date });
    }
    if (query.promoted) {
      qb.orWhere('events.promoted = :promoted', { promoted: query.promoted });
    }
    if (query.summary) {
      qb.orWhere('events.summary = :summary', { summary: query.summary });
    }
    if (query.title) {
      qb.orWhere('events.title = :title', { title: query.title });
    }
    if (query.topics && query.topics.length > 0) {
      // && means they have any overlap between array event.topics and  array query.topics
      // SELECT title, topics FROM event WHERE topics && '{🧩 Strategy,🌎 Social Impact}';
      qb.orWhere('events.topics && :topics', { topics: query.topics });
    }
    if (query.url) {
      qb.orWhere('events.url = :url', { url: query.url });
    }
    console.log('running query:', qb.expressionMap.wheres);
    return await qb.orderBy('events.start_date', 'ASC').getMany();
  }

  async create(eventData: CreateEventDto): Promise<Event | Error> {
    const newEvent = this.eventsRespository.create({ ...eventData });
    try {
      const saveResult = await this.eventsRespository.save(newEvent);
      try {
        const res = await this.adminGoogleService.addEventToGoogleCalendar(saveResult);
        // if (res.instanceof(Error)) {
        //   const adminGoogle = await this.adminGoogleService.findAdminGoogle()
        //   const { id } = adminGoogle
        //   this.usersRepository.update(id, { google_refresh_token: null })
        // }
        const googleCreated = new Date(res.data.created);
        saveResult.in_google_cal = googleCreated;
        const { id } = saveResult;
        await this.eventsRespository.update(id, { in_google_cal: googleCreated });
        return saveResult;
      } catch (error) {
        console.log('ERROR IN GOOGLE SAVE', error);
        return saveResult;
      }
    } catch (err) {
      return new Error(`${err.routine} ${err.message}`);
    }
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
    const response = await this.adminGoogleService.deleteEventFromGoogleCalendar(id);
    console.log(response);
    return await this.eventsRespository.delete({ id });
  }
}
