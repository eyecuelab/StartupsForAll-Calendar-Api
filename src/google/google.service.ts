import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Event } from 'src/events/entities/event.entity';
import { UsersService } from 'src/users/users.service';
import { topicsEmojis, googleCategoryColors, googleCategoryText } from './constants';
import { google } from 'googleapis';

const { OAuth2 } = google.auth;

const oAuth2Client = new OAuth2(
  process.env.GOOGLE_AUTH_CLIENT_ID,
  process.env.GOOGLE_AUTH_CLIENT_SECRET,
  process.env.GOOGLE_AUTH_REDIRECT_URL
);

@Injectable()
export class AdminGoogleService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>, private usersService: UsersService) {}

  async findAdminGoogle() {
    const adminGoogle = await this.usersRepository.findOne({
      where: {
        username: 'adminGoogle',
      },
    });
    return adminGoogle;
  }

  async authenticateGoogle() {
    const authorizeURL = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: process.env.GOOGLE_AUTH_SCOPES,
    });
    return authorizeURL;
  }

  async collectRefreshTokens(code: string) {
    const { tokens } = await oAuth2Client.getToken(code);
    const adminGoogle = await this.findAdminGoogle();
    const { id } = adminGoogle;
    await this.usersRepository.update(id, { google_refresh_token: tokens.refresh_token });
    //redirect to localhost:3000
  }

  async addEventToGoogleCalendar(event: Event): Promise<any> {
    const adminGoogle = await this.findAdminGoogle();
    console.log('ADMIN GOOGLE', adminGoogle);

    try {
      oAuth2Client.setCredentials({
        refresh_token: adminGoogle.google_refresh_token,
      });
      console.log('OAUTH2CLIENT', oAuth2Client);
    } catch (error) {
      return console.log('ERROR IN COLLECTING TOKEN FROM DATABASE', error);
    }

    const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

    const { category, creator_name, custom_blurb, end_date, location, start_date, summary, title, topics, url } = event;

    const googleEventEmojis = topics.map((topic) => topicsEmojis[topic]).join(' ');

    const googleEvent: Record<any, any> = {
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