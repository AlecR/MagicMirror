const express = require('express');
const fetch = require('node-fetch');
const Logger = require('../lib/Logger');

const WEATHER_API_KEY = '211442508a4f74ccbc238952adc10e13';
const router = express.Router();
const logger = new Logger('🌤');

router.get('/forecast', (req, res) => {
  const lat = req.query.lat
  const lon = req.query.lon
  const requestURL = `https://api.darksky.net/forecast/${WEATHER_API_KEY}/${lat},${lon}`
  fetch(requestURL).then(response => {
      return response.json(); 
  }).then(json => {
      logger.log(`Fetched forecast data for (${lat}, ${lon})`);
      res.status(200).json(json);
  }).catch(err => {
      logger.error(err);
      res.status(500).send(err);
  });
});

module.exports = router;