const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3001;
const WEATHER_API_KEY = '211442508a4f74ccbc238952adc10e13'
const GOOGLE_CALENDAR_API_KEY = 'AIzaSyCdSizt6KqOy3_t_HwUk93fsKOR6Nt1rX0'

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.use(bodyParser.json());

app.get('/api/weather', (req, res) => {
    const lat = req.query.lat
    const lon = req.query.lon
    const requestURL = `https://api.darksky.net/forecast/${WEATHER_API_KEY}/${lat},${lon}`
    fetch(requestURL).then(response => {
        return response.json(); 
    }).then(json => {
        res.json(json);
    });
})

app.get('/api/calendar/', (req, res) => {
    const calendarId = 'alecr1997@gmail.com'
    const requestURL = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${GOOGLE_CALENDAR_API_KEY}`
    fetch(requestURL).then(response => {
        return response.json();
    }).then(json => {
        const eventData = parseCalendarData(json)
        res.json(eventData);
    });
})

const parseCalendarData = json => {
    const events = json.items.map(event => {
        return {
            name: event.summary,
            id: event.id,
            start: event.start.dateTime,
            end: event.end.dateTime,
        }
    });
    return events;
}

app.listen(port, () => {
    console.log(`Server started on port ${port}!`);
})


