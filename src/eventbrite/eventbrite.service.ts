import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import FormattedEvent from './formattedEvent';

@Injectable()
export class EventbriteService {
  constructor(private httpService: HttpService) {}

  getEventBrite(id: string): Observable<FormattedEvent> {
    const url = `https://www.eventbriteapi.com/v3/events/${id}/`;
    return this.httpService.get(url).pipe(map((res) => res.data));
  }

  async formatEventData(data: any): Promise<any> {
    console.log('formatEventData, data:', data, typeof data);
    const serialized = await data.subscribe((res) => {
      console.log('got more data', res);
      return res;
    });
    console.log('serialized', serialized);
    return {};
    const formattedData: FormattedEvent = {
      name: data.name.text,
      created: data.created,
      changed: data.changed,
      currency: data.currency,
      description: data.description.text,
      summary: data.summary,
      start: data.start,
      end: data.end,
      id: data.id,
      url: data.url,
    };
    return formattedData;
  }
}
