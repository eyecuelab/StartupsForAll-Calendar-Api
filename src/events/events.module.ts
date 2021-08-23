import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from './entities/event.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsController } from './events.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  controllers: [EventsController],
  providers: [EventsService],
  exports: [TypeOrmModule, EventsService],
})
export class EventsModule {}
