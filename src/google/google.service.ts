import { google } from 'googleapis';
import { Injectable } from '@nestjs/common';
import { topicsEmojis, googleCategoryColors, googleCategoryText } from './constants';
import { Event } from 'src/events/entities/event.entity';

const { OAuth2 } = google.auth;

const oAuth2Client = new OAuth2(`${process.env.GOOGLE_AUTH_CLIENT_ID}`, `${process.env.GOOGLE_AUTH_CLIENT_SECRET}`);

oAuth2Client.setCredentials({
  refresh_token: `${process.env.GOOGLE_AUTH_REFRESH_TOKEN}`,
});

const calendar = google.calendar({
  version: 'v3',
  auth: oAuth2Client,
});

@Injectable()
export class GoogleService {
  async addToGoogleCalendar(event: Event) {
    const {
      category,
      category_text,
      creator_name,
      description,
      end_date,
      location,
      start_date,
      summary,
      title,
      topics,
      url,
    } = event;

    const googleEventEmojis = topics.map((topic) => topicsEmojis[topic]).join(' ');

    const googleEventFormat: Record<any, any> = {
      summary: googleEventEmojis + '[' + creator_name + ']' + title,
      location: location,
      description: `${googleCategoryText[category_text]}
      ${description}
        
      ${url}

      About this event: 
      ${summary}

      ${url}
      `,
      colorId: googleCategoryColors[category],
      start: {
        dateTime: start_date,
      },
      end: {
        dateTime: end_date,
      },
    };

    const res = calendar.events.insert(
      {
        calendarId: 'douglasfunnae@gmail.com',
        requestBody: googleEventFormat,
      },
      (err: any) => {
        if (err) {
          return console.log('Calendar event creation unsuccessful', err);
        }
        return console.log('Calendar event successfully created');
      }
    );
    return res;
  }
}
