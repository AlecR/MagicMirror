const express = require('express');
const fetch = require('node-fetch');

const WEATHER_API_KEY = '211442508a4f74ccbc238952adc10e13';
const router = express.Router();

router.get('/forecast', (req, res) => {
  const lat = req.query.lat
  const lon = req.query.lon
  const requestURL = `https://api.darksky.net/forecast/${WEATHER_API_KEY}/${lat},${lon}`
  fetch(requestURL).then(response => {
      return response.json(); 
  }).then(json => {
      logger.log(`Fetched forecast data for (${lat}, ${lon})`);
      res.json(json);
  }).catch(err => {
      logger.log(err);
      console.log(err);
  });
});

module.exports = router;