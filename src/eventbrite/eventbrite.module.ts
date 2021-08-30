import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { EventbriteService } from './eventbrite.service';

@Module({
  imports: [
    HttpModule.register({
      headers: { Authorization: `Bearer ${process.env.EVENTBRITE_API}` },
    }),
  ],
  providers: [EventbriteService, HttpModule],
  exports: [HttpModule],
})
export class EventbriteModule {}
