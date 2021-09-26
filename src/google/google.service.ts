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

  async addEventToGoogleCalendar(event: Event): Promise<any> {
    const adminGoogle = await this.findAdminGoogle();
    console.log('ADMIN GOOGLE', adminGoogle);

    try {
      oAuth2Client.setCredentials({
        refresh_token: adminGoogle.google_refresh_token,
      });
      console.log('OAUTH2CLIENT', oAuth2Client);
    } catch {
      console.log('ERROR IN COLLECTING TOKEN FROM DATABASE');
    }

    const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

    const {
      category,
      category_text,
      creator_name,
      custom_blurb,
      end_date,
      location,
      start_date,
      summary,
      title,
      topics,
      url,
    } = event;

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

  // async authenticateGoogle() {
  // const http = require('http');
  // const url = require('url');
  // const opn = require('open');
  // const destroyer = require('server-destroy');
  //   return new Promise((resolve, reject) => {
  //     //returns the authorization url
  //     const authorizeURL = oAuth2Client.generateAuthUrl({
  //       access_type: 'offline',
  //       scope: process.env.GOOGLE_AUTH_SCOPES,
  //     })
  //     const server = http.createServer(async (req, res) => {
  //       try {
  //         if (req.url.indexOf('/oauth2callback') > -1) {
  //           const qs = new url.URL(req.url, 'http://localhost:3000')
  //             .searchParams;
  //           res.writeHead(301, { Location: qs })
  //           // res.end('Authentication successful! Please return to the app.');
  //           server.destroy();
  //           const { tokens } = await oAuth2Client.getToken(qs.get('code'));
  //           /////This will make sure to always store the freshest tokens\\\\\\\
  //           // oAuth2Client.on('tokens', (tokens) => {
  //           //   if (tokens.refresh_token) {
  //           //     //store the refresh token in database
  //           //     console.log(tokens.refresh_token);
  //           //   }
  //           //   console.log(tokens.access_token);
  //           // })
  //           ////////////To set the refresh_token at a later time\\\\\\\\\\\\
  //           // oAuth2Client.setCredentials({
  //           //   refresh_token: `STORED_REFRESH_TOKEN`
  //           // })
  //           oAuth2Client.credentials = tokens; //eslint-disable-line require-atomic-updates
  //           console.log("OAUTH2 CLIENT", oAuth2Client.credentials)
  //           resolve(oAuth2Client);
  //         }
  //       } catch (err) {
  //         reject(err);
  //         console.log("REJECT ERROR", err);
  //       }
  //     })
  //       .listen(3000, () => {
  //         //open the browser to the authorize url to start the workflow
  //         opn(authorizeURL, { wait: false }).then(cp => cp.unref());
  //       })
  //     destroyer(server);
  //   })
  // }
}
