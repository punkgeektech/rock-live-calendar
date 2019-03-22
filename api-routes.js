const router = require('express').Router()
const fs = require('fs')
const readline = require('readline')
const {google} = require('googleapis')
const bandController = require('./controller/bandController')
const listController = require('./controller/listController')

// store the result feching from google calendar
let result = []

// store the bands name and value
let bands_list = []

// google calendar api call
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly']
const TOKEN_PATH = 'token.json'

function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0])

  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback)
    oAuth2Client.setCredentials(JSON.parse(token))
    callback(oAuth2Client)
  })
}

function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  })
  console.log('Authorize this app by visiting this url:', authUrl)
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close()
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err)
      oAuth2Client.setCredentials(token)
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err)
        console.log('Token stored to', TOKEN_PATH)
      })
      callback(oAuth2Client)
    })
  })
}

function listEvents(auth) {
  const calendar = google.calendar({version: 'v3', auth})
  calendar.events.list({
    calendarId: 'notoriousjay@gmail.com',
    timeMin: (new Date(2019, 1, 1, 0, 0, 0, 0)).toISOString(),
    maxResults: 2500,
    singleEvents: true,
    orderBy: 'startTime',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err)
    const events = res.data.items
    if (events.length) {
      events.map((event, i) => {
        // feched data formatting
        const start = event.start.dateTime || event.start.date;
        const bands = event.summary.slice(0, event.summary.lastIndexOf('@')).trim('').split(', ')
        const location = event.summary.slice(event.summary.lastIndexOf('@') + 2)

        // store every split band
        bands.map((v) => {
          const data = { name: v }
          bands_list.push(data)
        })

        const data = {
          date: start,
          bands: bands,
          location: location
        }
        result.push(data)
      })
    } else {
      console.log('No upcoming events found.')
    }
  })
}

fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err)
  // call fetch google calendar events
  authorize(JSON.parse(content), listEvents)
})

router.get('/', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify(result))
})

// feching data manually
router.get('/fetch', (req, res) => {
  // store band list to database
  bandController.new(bands_list)
  // store event list to database
  listController.new(result)
  res.send('Fetch Complete')
})

router.route('/lists')
  .get(listController.index)

router.route('/bands')
  .get(bandController.index)

router.route('/bands/:bands_name')
  .get(bandController.view)
  .put(bandController.update)

module.exports = router
