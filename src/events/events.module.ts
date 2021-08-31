import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from './entities/event.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsController } from './events.controller';
import { UsersModule } from '../users/users.module';
import { EventbriteModule } from '../eventbrite/eventbrite.module';

@Module({
  imports: [TypeOrmModule.forFeature([Event]), UsersModule, EventbriteModule],
  controllers: [EventsController],
  providers: [EventsService],
  exports: [TypeOrmModule, EventsService],
})
export class EventsModule {}
