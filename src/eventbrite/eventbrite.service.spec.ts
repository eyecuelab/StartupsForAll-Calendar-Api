import { Test, TestingModule } from '@nestjs/testing';
import { EventbriteService } from './eventbrite.service';

describe('EventbriteService', () => {
  let service: EventbriteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventbriteService],
    }).compile();

    service = module.get<EventbriteService>(EventbriteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
