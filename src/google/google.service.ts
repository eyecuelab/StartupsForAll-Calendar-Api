// import { Injectable } from "@nestjs/common";
// const http = require('http');
// const url = require('url');
// const opn = require('open');
// const destroyer = require('server-destroy');

// const { google } = require('googleapis');

// const { OAuth2 } = google.auth;

// const oAuth2Client = new OAuth2(
//   process.env.GOOGLE_AUTH_CLIENT_ID,
//   process.env.GOOGLE_AUTH_CLIENT_SECRET,
//   process.env.GOOGLE_AUTH_REDIRECT_URL
// );

// @Injectable()
// export class AdminGoogleService {
//   constructor() { }

// async authenticateGoogle() {
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

//   async addEventToCalendar() {
//     console.log("OAUTH DEETS", oAuth2Client.credentials);
//     const today = new Date();
//     const tomorrow = new Date(today);
//     tomorrow.setDate(tomorrow.getDate() + 1)
//     console.log("DATES", today, tomorrow);
//     const googleEvent = {
//       summary: 'Event',
//       start: {
//         dateTime: today,
//       },
//       end: {
//         dateTime: tomorrow
//       }
//     }
//     const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })
//     return await calendar.events.insert({
//       calendarId: 'douglasfunnae@gmail.com',
//       resource: googleEvent
//     })
//   }
// }
