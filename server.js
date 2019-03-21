const express = require('express')
const app = express()
const port = 3001
const fs = require('fs')
const readline = require('readline');
const {google} = require('googleapis');
const cors = require('cors')

let result = []

const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
const TOKEN_PATH = 'token.json';

function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

function listEvents(auth) {
  const calendar = google.calendar({version: 'v3', auth});
  calendar.events.list({
    calendarId: 'notoriousjay@gmail.com',
    timeMin: (new Date(2019, 1, 1, 0, 0, 0, 0)).toISOString(),
    maxResults: 2500,
    singleEvents: true,
    orderBy: 'startTime',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const events = res.data.items;
    if (events.length) {
      events.map((event, i) => {
        const start = event.start.dateTime || event.start.date;
        bands = event.summary.slice(0, event.summary.lastIndexOf('@')).trim('').split(', ')
        location = event.summary.slice(event.summary.lastIndexOf('@') + 2)
        data = {
          date: start,
          bands: bands,
          location: location
        }
        result.push(data)
      });
      return result;
    } else {
      console.log('No upcoming events found.');
    }
  });
}

fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  authorize(JSON.parse(content), listEvents);
});

app.use(cors())

app.get('/', (req, res) => res.send('我想想这个页面放啥'))
app.get('/api', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(result))
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
