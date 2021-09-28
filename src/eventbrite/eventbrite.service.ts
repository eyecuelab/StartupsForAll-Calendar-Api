import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { map, Observable } from 'rxjs';
import FormattedEvent from './formattedEvent';

@Injectable()
export class EventbriteService {
  constructor(private httpService: HttpService) {}

  getEventBrite(id: string): Observable<FormattedEvent> {
    const url = `https://www.eventbriteapi.com/v3/events/${id}?expand=series_dates`;
    const res = this.httpService.get(url).pipe(
      map((res: AxiosResponse) => {
        return {
          name: res.data.name.text,
          created: res.data.created,
          changed: res.data.changed,
          currency: res.data.currency,
          description: res.data.description.text,
          summary: res.data.summary,
          start: res.data.start,
          end: res.data.end,
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
