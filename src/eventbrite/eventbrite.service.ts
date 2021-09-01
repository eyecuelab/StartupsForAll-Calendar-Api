import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import FormattedEvent from './formattedEvent';

@Injectable()
export class EventbriteService {
  constructor(private httpService: HttpService) {}

  getEventBrite(id: string): any {
    const url = `https://www.eventbriteapi.com/v3/events/${id}/`;
    return this.httpService.get(url).pipe(map((res) => res.data));
  }

  // async formatEventData(data: any): Promise<any> {
  formatEventData(data: any) {
    console.log('formatEventData, data:', data, typeof data);
    // const formatted = [];
    // return data.subscribe({
    //   next(x) {
    //     console.log('got data:', x);
    //     return x;
    //   },
    //   complete() {
    //     console.log('done');
    //   },
    //   error(e) {
    //     console.log('error', e);
    //   },
    // });
    // console.log('after. formatted:', formatted);
    // return {};
    // console.log('serialized', serialized);
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
