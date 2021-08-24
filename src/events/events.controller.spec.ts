import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionToken, TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import ormconfig from '../database/ormconfig';
import { Event } from './entities/event.entity';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

describe('EventsController', () => {
  let controller: EventsController;
  let connection: Connection;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(ormconfig), TypeOrmModule.forFeature([Event])],
      controllers: [EventsController],
      providers: [EventsService],
      exports: [TypeOrmModule, EventsService],
    }).compile();

    controller = module.get<EventsController>(EventsController);
    connection = module.get(getConnectionToken());
  });

  afterAll(async (done) => {
    await connection.close();
    done();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
