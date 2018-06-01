const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3001;
const api_key = '211442508a4f74ccbc238952adc10e13'

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
    const requestURL = `https://api.darksky.net/forecast/${api_key}/${lat},${lon}`
    fetch(requestURL).then(response => {
        return response.json(); 
    }).then(json => {
        res.json(json);
    });
})

app.listen(port, () => {
    console.log(`Server started on port ${port}!`);
})