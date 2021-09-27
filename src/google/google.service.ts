import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Event } from 'src/events/entities/event.entity';
import { UsersService } from 'src/users/users.service';
import { topicsEmojis, googleCategoryColors, googleCategoryText } from './constants';
import { calendar_v3, google } from 'googleapis';

const { OAuth2 } = google.auth;

const oAuth2Client = new OAuth2(
  process.env.GOOGLE_AUTH_CLIENT_ID,
  process.env.GOOGLE_AUTH_CLIENT_SECRET,
  process.env.GOOGLE_AUTH_REDIRECT_URL
);

@Injectable()
export class AdminGoogleService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>, private usersService: UsersService) {}

  async findAdminGoogle(): Promise<User> {
    const adminGoogle: User = await this.usersRepository.findOne({
      where: {
        username: 'admin',
      },
    });
    return adminGoogle;
  }

  async authenticateGoogle(): Promise<string> {
    const authorizeURL: string = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: process.env.GOOGLE_AUTH_SCOPES,
    });
    return authorizeURL;
  }

  async authorizeUser(code: string): Promise<UpdateResult> {
    const { tokens } = await oAuth2Client.getToken(code);
    const adminGoogle = await this.findAdminGoogle();
    const { id } = adminGoogle;
    return await this.usersRepository.update(id, { google_refresh_token: tokens.refresh_token });
  }

  async initGoogleCalendar(): Promise<calendar_v3.Calendar> {
    const adminGoogle = await this.findAdminGoogle();

    try {
      oAuth2Client.setCredentials({
        refresh_token: adminGoogle.google_refresh_token,
      });
    } catch (error) {
      console.log('ERROR IN COLLECTING TOKEN FROM DATABASE', error);
    }
    const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });
    return calendar;
  }

  async deleteEventFromGoogleCalendar(id: string): Promise<any> {
    const calendar = await this.initGoogleCalendar();
    const googleID = id.replace(/-/g, '');

    return calendar.events.delete({
      calendarId: 'douglasfunnae@gmail.com',
      eventId: googleID,
    });
  }

  async addEventToGoogleCalendar(event: Event): Promise<any> {
    const calendar = await this.initGoogleCalendar();

    const { category, creator_name, custom_blurb, end_date, id, location, start_date, summary, title, topics, url } =
      event;
    const googleID = id.replace(/-/g, '');
    const googleEventEmojis = topics.map((topic) => topicsEmojis[topic]).join(' ');

    const googleEvent: Record<any, any> = {
      id: googleID,
      summary: googleEventEmojis + '[' + creator_name + ']' + title,
      location: location,
      description: `${googleCategoryText[category]}

Info from ${creator_name}:
${custom_blurb}

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

    return calendar.events.insert({
      calendarId: 'douglasfunnae@gmail.com',
      requestBody: googleEvent,
    });
  }
}
