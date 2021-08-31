import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class EventbriteService {
  constructor(private httpService: HttpService) {}

  getEventBrite(id: string): Observable<AxiosResponse> {
    const url = `https://www.eventbriteapi.com/v3/events/${id}/`;
    return this.httpService.get(url).pipe(map((res) => res.data));
  }
}
