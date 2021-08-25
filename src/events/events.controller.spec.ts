import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionToken, TypeOrmModule } from '@nestjs/typeorm';
import { Connection, DeleteResult, UpdateResult } from 'typeorm';
import ormconfig from '../database/ormconfig';
import { Event } from './entities/event.entity';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { UpdateEventDto } from './dto/update-event.dto';
import { CreateEventDto } from './dto/create-event.dto';

describe('EventsController', () => {
  let eventsController: EventsController;
  let eventsService: EventsService;
  let connection: Connection;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(ormconfig), TypeOrmModule.forFeature([Event])],
      controllers: [EventsController],
      providers: [EventsService],
      exports: [TypeOrmModule, EventsService],
    }).compile();

    eventsController = module.get<EventsController>(EventsController);
    eventsService = module.get<EventsService>(EventsService);
    connection = module.get(getConnectionToken());
  });

  afterAll(async (done) => {
    await connection.close();
    done();
  });

  it('should be defined', () => {
    expect(eventsController).toBeDefined();
  });

  it('eventsController.findAll() should return all events', async () => {
    let result: Promise<Event[]>;
    jest.spyOn(eventsService, 'findAll').mockImplementation(() => result);
    expect(await eventsController.findAll()).toBe(result);
  });

  it('eventsController.findOne() should return a single event', async () => {
    let result: Promise<Event>;
    jest.spyOn(eventsService, 'findOne').mockImplementation(() => result);
    expect(await eventsController.findOne('fakeuuid')).toBe(result);
  });

  it('eventsController.update() should return an UpdateResult of an event', async () => {
    let result: Promise<UpdateResult>;
    let fakeUpdateDto: UpdateEventDto;
    jest.spyOn(eventsService, 'updateOne').mockImplementation(() => result);
    expect(await eventsController.update('fakeuuid', fakeUpdateDto)).toBe(result);
  });

  it('eventsController.remove() should delete a single event', async () => {
    let result: Promise<DeleteResult>;
    jest.spyOn(eventsService, 'remove').mockImplementation(() => result);
    expect(await eventsController.remove('fakeuuid')).toBe(result);
  });

  it('eventsController.create() should add a single event', async () => {
    let result: Promise<Event>;
    let fakeEvent: CreateEventDto;
    jest.spyOn(eventsService, 'create').mockImplementation(() => result);
    expect(await eventsController.create(fakeEvent)).toBe(result);
  });
});
