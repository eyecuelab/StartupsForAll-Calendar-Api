import { Module } from '@nestjs/common';
import { EventKeyService } from './event-key.service';
import { EventKeyController } from './event-key.controller';

@Module({
  controllers: [EventKeyController],
  providers: [EventKeyService],
})
export class EventKeyModule {}
