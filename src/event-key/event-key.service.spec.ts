import { Test, TestingModule } from '@nestjs/testing';
import { EventKeyService } from './event-key.service';

describe('EventKeyService', () => {
  let service: EventKeyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventKeyService],
    }).compile();

    service = module.get<EventKeyService>(EventKeyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
