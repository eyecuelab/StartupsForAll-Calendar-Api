import { Test, TestingModule } from '@nestjs/testing';
import { EventKeyController } from './event-key.controller';
import { EventKeyService } from './event-key.service';

describe('EventKeyController', () => {
  let controller: EventKeyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventKeyController],
      providers: [EventKeyService],
    }).compile();

    controller = module.get<EventKeyController>(EventKeyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
