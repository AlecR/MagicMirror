const express = require('express');
const fetch = require('node-fetch');
const Logger = require('../lib/Logger');

const GOOGLE_CALENDAR_API_KEY = process.env.GOOGLE_API_KEY;
const router = express.Router();
const logger = new Logger('⏰');


router.get('/', (_, res) => {
  const calendarId = 'alecr1997@gmail.com'
  const requestURL = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${GOOGLE_CALENDAR_API_KEY}`
  fetch(requestURL).then(response => {
    return response.json();
  }).then(json => {
    const eventData = parseCalendarData(json);
    logger.log('Fetched calendar events');
    res.status(200).json(eventData);
  }).catch(err => {
    logger.error(err);
    res.status(500).send(err);
  });
});

const parseCalendarData = json => {
  const events = json.items.map(event => {
    return {
      name: event.summary,
      id: event.id,
      start: event.start.dateTime,
      end: event.end.dateTime,
      location: event.location,
    }
  });
  return events;
}

module.exports = router;