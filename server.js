const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const spawn = require('child_process').spawn;
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3001;
const WEATHER_API_KEY = '211442508a4f74ccbc238952adc10e13';
const GOOGLE_CALENDAR_API_KEY = 'AIzaSyCdSizt6KqOy3_t_HwUk93fsKOR6Nt1rX0';
const HUE_IP = '10.0.0.153'
const HUE_USERNAME = 'cATamjW4q-RKFR0NxTZPMxU4fBaFST3DCf9lga1S';

const TODOIST_CLIENT_ID = '4ddd8c32dc914bc7b5f5ef4b4f8637b3';
const TODOIST_CLIENT_SECRET = 'ae06fdc4a4084f96986b836fd615632c';
const TODOIST_REDIRECT_URI = 'http://localhost:3000/';

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', ['GET', 'PUT']);
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.use(bodyParser.json());
app.use(cookieParser());

app.get('/api/modules/index', (req, res) => {
    const indexProcess = spawn('python', ['./index_modules.py']);
    indexProcess.stdout.on('data', data => {
        const data_string = data.toString();
        const data_json = JSON.parse(data_string);
        indexProcess.kill();
        res.json(data_json);
    })
}) 

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
        const eventData = parseCalendarData(json);
        res.json(eventData);
    });
})

app.post('/api/mirror/config', (req, res) => {
    const moduleData = JSON.stringify(req.body);
    fs.writeFile('./client/src/config.json', moduleData, (err) => {
        if(err) {
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    })
})

app.get('/api/smartlights/groups', (req, res) => {
    const requestURL = `http://${HUE_IP}/api/${HUE_USERNAME}/groups`
    fetch(requestURL).then(response => {
        return response.json();
    }).then(json => {
        const keys = Object.keys(json)
        const rooms = []
        keys.forEach(key => {
            const room = json[key] 
            if(room.type === 'Room'){
                rooms.push({
                    'name': room.name,
                    'lights': room.lights
                })
            }
        }) 
        res.json(rooms);
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
     })
})


app.get('/api/smartlights/lights', (req, res) => {
    const id = req.params.id
    const requestURL = `http://${HUE_IP}/api/${HUE_USERNAME}/lights/`
    fetch(requestURL).then(response => {
        return response.json();
    }).then(lights => {
        lightIds = Object.keys(lights);
        var formattedLightData = {}
        lightIds.forEach(lightId => {
            const light = lights[lightId];
            formattedLightData[lightId] = {
                name: light.name,
                on: light.state.on,
                brightness: light.state.bri,
                lightId: lightId
            }
        })
        res.json(formattedLightData);
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
     })
})

app.get('/api/smartlights/lights/:id', (req, res) => {
    const id = req.params.id
    const requestURL = `http://${HUE_IP}/api/${HUE_USERNAME}/lights/${id}`
    fetch(requestURL).then(response => {
        return response.json();
    }).then(json => {
        const lightData = {
            name: json.name,
            on: json.state.on,
            brightness: json.state.bri,
            lightId: id
        }
        res.json(lightData);
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
     })
})

app.put('/api/smartlights/lights/:id/state', (req, res) => {
    const id = req.params.id;
    const requestURL = `http://${HUE_IP}/api/${HUE_USERNAME}/lights/${id}/state`;
    fetch(requestURL, {
        method: "PUT",
        body: JSON.stringify(req.body)
    }).then(response => {
        return response.json();
    }).then(json => {
        res.json(json);
    })
})

app.get('/api/todo/auth', (req, res) => {
    const code = req.query.code;
    const secret = req.query.state;
    if(!code || !secret) res.sendStatus(500).send('Code or secret not provided');
    if(secret !== TODOIST_CLIENT_SECRET) res.sendStatus(500).send('Provided secret does not match app secret');
    const requestURL = `https://todoist.com/oauth/access_token?client_id=${TODOIST_CLIENT_ID}&client_secret=${secret}&code=${code}&redirect_uri=${TODOIST_REDIRECT_URI}`;
    fetch(requestURL, {
        method: "POST",
    }).then(response => {
        return response.json();
    }).then(json => {
        res.json(json);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500)
    })
})

app.get('/api/todo/tasks', (req, res) => {
    const token = req.cookies['todoist_token'];
    const requestURL = 'https://beta.todoist.com/API/v8/tasks'
    fetch(requestURL, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(response => {
        return response.json();
    }).then(json => {
        res.json(json);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500)
    })
})

app.get('/api/todo/tasks/:id/close', (req, res) => {
    const token = req.cookies['todoist_token'];
    const id = req.params.id;
    const requestURL = `https://beta.todoist.com/API/v8/tasks/${id}/close`
    fetch(requestURL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).catch(err => {
        console.log(err);
        res.sendStatus(500)
    })
})

app.get('/api/todo/projects', (req, res) => {
    const token = req.cookies['todoist_token'];
    const requestURL = 'https://beta.todoist.com/API/v8/projects'
    fetch(requestURL, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(response => {
        return response.json();
    }).then(json => {
        res.json(json);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500)
    })
})

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

app.listen(port, () => {
    console.log(`Server started on port ${port}!`);
})


