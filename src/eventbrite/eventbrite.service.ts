import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { map, Observable } from 'rxjs';
import FormattedEvent from './EventbriteEvent';

@Injectable()
export class EventbriteService {
  constructor(private httpService: HttpService) {}

  getEventBrite(id: string): Observable<FormattedEvent> {
    const url = `https://www.eventbriteapi.com/v3/events/${id}?expand=series_dates,ticket_classes`;
    // return this.httpService.get(url).pipe(map((res) => res.data));
    const res = this.httpService.get(url).pipe(
      map((res: AxiosResponse) => {
        // console.log(
        //   'got results:',
        //   res.data.series_dates,
        //   res.data.start.utc,
        //   res.data.end.utc,
        //   res.data.series_dates[0].start.utc
        // );
        // TODO: somewhere in here, figure out if multi-day series or single event and update start/end date/times...
        return {
          title: res.data.name.text,
          created: res.data.created,
          changed: res.data.changed,
          cost: res.data?.ticket_classes[0]?.cost?.display,
          currency: res.data.currency,
          description: res.data.description.text,
          summary: res.data.summary,
          start_date: res.data.series_dates ? res.data.series_dates[0].start.utc : res.data.start.utc,
          end_date: res.data.series_dates ? res.data.series_dates[0].end.utc : res.data.end.utc,
          start_time: res.data.series_dates ? res.data.series_dates[0].start.utc : res.data.start.utc,
          end_time: res.data.series_dates ? res.data.series_dates[0].end.utc : res.data.end.utc,
          id: res.data.id,
          url: res.data.url,
          logo: res.data?.logo?.url,
          series_dates: res.data.series_dates,
        };
      })
    );
    return res;
  }
}
