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

  it('eventsController.findAll() should call eventsService.findAll()', async () => {
    jest.spyOn(eventsService, 'findAll').mockImplementation(() => undefined);
    await eventsController.findAll();
    expect(eventsService.findAll).toHaveBeenCalled();
  });

  it('eventsController.findOne() should call eventsService.findOne()', async () => {
    jest.spyOn(eventsService, 'findOne').mockImplementation(() => undefined);
    await eventsController.findOne(fakeUuid);
    expect(eventsService.findOne).toHaveBeenCalled();
  });

  it('eventsController.update() should call eventsService.update()', async () => {
    let result: Promise<UpdateResult>;
    jest.spyOn(eventsService, 'updateOne').mockImplementation(() => result);
    await eventsController.update(fakeUuid, fakeUpdateDto);
    expect(eventsService.updateOne).toHaveBeenCalled();
  });

  it('eventsController.remove() should call eventsService.remove()', async () => {
    let result: Promise<DeleteResult>;
    jest.spyOn(eventsService, 'remove').mockImplementation(() => result);
    await eventsController.remove(fakeUuid);
    expect(eventsService.remove).toHaveBeenCalled();
  });

  it('eventsController.create() should call eventsService.create()', async () => {
    let result: Promise<Event>;
    jest.spyOn(eventsService, 'create').mockImplementation(() => result);
    await eventsController.create(fakeEvent);
    expect(eventsService.create).toHaveBeenCalled();
  });
});
