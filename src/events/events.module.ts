import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from './entities/event.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsController } from './events.controller';
import { UsersModule } from 'src/users/users.module';
import { EventbriteModule } from 'src/eventbrite/eventbrite.module';
import { EventbriteService } from 'src/eventbrite/eventbrite.service';

@Module({
  imports: [TypeOrmModule.forFeature([Event]), UsersModule, EventbriteModule, EventbriteService],
  controllers: [EventsController],
  providers: [EventsService, EventbriteModule, EventbriteService],
  exports: [TypeOrmModule, EventsService],
})
export class EventsModule {}
