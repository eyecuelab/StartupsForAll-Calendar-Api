import { google } from 'googleapis';
import { topicsEmojis, googleCategoryColors, googleCategoryText } from './constants';
import { Event } from 'src/events/entities/event.entity';

export async function addToGoogleCalendar(event: Event) {
  const { OAuth2 } = google.auth;

  const oAuth2Client = new OAuth2(process.env.GOOGLE_AUTH_CLIENT_ID, process.env.GOOGLE_AUTH_CLIENT_SECRET);

  oAuth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_AUTH_REFRESH_TOKEN,
  });

  const calendar = google.calendar({
    version: 'v3',
    auth: oAuth2Client,
  });

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
    description: `${googleCategoryText[category_text]}
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
