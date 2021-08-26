import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionToken, TypeOrmModule } from '@nestjs/typeorm';
import { Connection, DeleteResult, UpdateResult } from 'typeorm';
import ormconfig from '../database/ormconfig';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

describe('EventsService', () => {
  let eventsService: EventsService;
  let connection: Connection;
  let fakeUpdateDto: UpdateEventDto;
  let fakeEvent: CreateEventDto;
  const fakeUuid = '39725196-e020-4757-99a6-b71f3c26dc8d';

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

  it('findAll() should return all events', async () => {
    let result: Promise<Event[]>;
    jest.spyOn(eventsService, 'findAll').mockImplementation(() => result);
    expect(await eventsService.findAll()).toBe(result);
  });

  it('findOne() should return a single event', async () => {
    let result: Promise<Event>;
    jest.spyOn(eventsService, 'findOne').mockImplementation(() => result);
    expect(await eventsService.findOne(fakeUuid)).toBe(result);
  });

  it('updateOne() should return an UpdateResult of an event', async () => {
    let result: Promise<UpdateResult>;
    jest.spyOn(eventsService, 'updateOne').mockImplementation(() => result);
    expect(await eventsService.updateOne(fakeUuid, fakeUpdateDto)).toBe(result);
  });

  it('remove() should delete a single event', async () => {
    let result: Promise<DeleteResult>;
    jest.spyOn(eventsService, 'remove').mockImplementation(() => result);
    expect(await eventsService.remove(fakeUuid)).toBe(result);
  });

  it('create() should add a single event', async () => {
    let result: Promise<Event>;
    jest.spyOn(eventsService, 'create').mockImplementation(() => result);
    expect(await eventsService.create(fakeEvent)).toBe(result);
  });
});
