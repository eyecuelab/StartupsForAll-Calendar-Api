import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionToken, TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import ormconfig from '../database/ormconfig';
import { Event } from './entities/event.entity';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

describe('EventsService', () => {
  let service: EventsService;
  let connection: Connection;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(ormconfig), TypeOrmModule.forFeature([Event])],
      controllers: [EventsController],
      providers: [EventsService],
      exports: [TypeOrmModule, EventsService],
    }).compile();

    service = module.get<EventsService>(EventsService);
    connection = module.get(getConnectionToken());
  });

  afterAll(async (done) => {
    await connection.close();
    done();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
