import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { map, Observable } from 'rxjs';
import FormattedEvent from './formattedEvent';

@Injectable()
export class EventbriteService {
  constructor(private httpService: HttpService) {}

  getEventBrite(id: string): Observable<FormattedEvent> {
    const url = `https://www.eventbriteapi.com/v3/events/${id}?expand=series_dates,ticket_classes`;
    // return this.httpService.get(url).pipe(map((res) => res.data));
    const res = this.httpService.get(url).pipe(
      map((res: AxiosResponse) => {
        console.log('got results:', res.data);
        return {
          name: res.data.name.text,
          created: res.data.created,
          changed: res.data.changed,
          cost: (
            Number(res.data?.ticket_classes[0]?.cost.display.substring(1)) +
            Number(res.data?.ticket_classes[0]?.fee.display.substring(1))
          ).toFixed(2),
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
