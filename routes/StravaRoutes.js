const express = require('express');
const fetch = require('node-fetch');
const Logger = require('../lib/Logger');

const STRAVA_CLIENT_ID = '27346';
const STRAVA_CLIENT_SECRET = '4b24ee8b01a912913acd6fde8d5be511763979aa';
const STRAVA_AUTH_COOKIE_NAME = 'strava_token';
const router = express.Router();
const logger = new Logger('👟');

router.get('/authorized', (req, res) => {
  const token = req.cookies[STRAVA_AUTH_COOKIE_NAME];
  if(token) {
    logger.log('User is authorized');
    res.status(200).json({'authorized': true});
  } else {
    logger.log('User is NOT authorized');
    res.status(200).json({'authorized': false});
  }
})

router.get('/auth', (req, res) => {
  if(req.cookies[STRAVA_AUTH_COOKIE_NAME]) { return; }
  const code = req.query.code;
  if(!code) res.status(500).send('Code not provided');
  const requestURL = `https://www.strava.com/oauth/token?client_id=${STRAVA_CLIENT_ID}&client_secret=${STRAVA_CLIENT_SECRET}&code=${code}`;
  fetch(requestURL, {
    method: "POST",
  }).then(response => {
    return response.json();
  }).then(json => {
    logger.error(JSON.stringify(json));
    const token = json.access_token;
    if (!token) { 
      logger.log('Didn\'t get a token!');
      res.status(500).send("Didn't get a token");
      return;
    }
    logger.log('Successfully authorized user');
    res.cookie(STRAVA_AUTH_COOKIE_NAME, token, {
      path: '/', 
      httpOnly: false,
      domain: `.alecrodgers.ngrok.io`,
      maxAge: 3600 * 1000 * 25 * 365 * 10,
    }).sendStatus(200);
  }).catch(err => {
    logger.error(err);
    res.status(500).send(err);
  })
})

router.get('/activities/current-week', (req, res) => {
  const startOfWeek = this.startOfWeek();
  logger.warn(startOfWeek);
  const token = req.cookies[STRAVA_AUTH_COOKIE_NAME];
  logger.warn(token);
  const requestURL = `https://www.strava.com/api/v3/athlete/activities?after=${startOfWeek}`
  fetch(requestURL, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then(response => {
    return response.json();
  }).then(json => {
    logger.log('Fetched activities');
    res.status(200).json(json);
  }).catch(err => {
    logger.error(err);
    res.status(500).send(err);
  })
})

this.startOfWeek = () => {
  const today = new Date();
  const startOfWeekDate = today.getDate() - today.getDay();
  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeekDate);
  startOfWeek.setHours(0, 0, 0, 0);
  return startOfWeek.getTime() / 1000;
}

module.exports = router;
