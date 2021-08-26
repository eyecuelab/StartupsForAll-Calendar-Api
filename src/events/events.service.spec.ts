import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionToken, TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import ormconfig from '../database/ormconfig';
import { Event } from './entities/event.entity';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

describe('EventsService', () => {
  let eventsService: EventsService;
  let connection: Connection;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(ormconfig), TypeOrmModule.forFeature([Event])],
      controllers: [EventsController],
      providers: [EventsService],
      exports: [TypeOrmModule, EventsService],
    }).compile();

    eventsService = module.get<EventsService>(EventsService);
    connection = module.get(getConnectionToken());
  });

  afterAll(async (done) => {
    await connection.close();
    done();
  });

  it('should be defined', () => {
    expect(eventsService).toBeDefined();
  });
  // findAll
  // create
  // findOne
  // updateOne
  // remove

  xit('should return an array of events when findAll() is called', async () => {
    let events: Promise<Event[]>;
    console.log(eventsService);
    const receivedEvents = await eventsService.findAll();
    console.log('received events', receivedEvents);
    expect(receivedEvents).toEqual(events);
  });
});
