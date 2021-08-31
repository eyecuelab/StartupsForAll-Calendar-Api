import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { EventbriteService } from './eventbrite.service';

@Module({
  imports: [
    HttpModule.register({
      headers: { Authorization: `Bearer ${process.env.EVENTBRITE_API}` },
    }),
  ],
  providers: [EventbriteService],
  exports: [EventbriteService],
})
export class EventbriteModule {}
