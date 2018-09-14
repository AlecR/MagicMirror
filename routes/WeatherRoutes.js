const express = require('express');
const fetch = require('node-fetch');
const Logger = require('../lib/Logger');

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const GEOLOCATION_API_KEY = process.env.GOOGLE_API_KEY;
const router = express.Router();
const logger = new Logger('🌤');

logger.log(WEATHER_API_KEY);
logger.log(GEOLOCATION_API_KEY);

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

router.get('/location', (req, res) => {
  const lat = req.query.lat
	const lon = req.query.lon
	const requestURL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${GEOLOCATION_API_KEY}`
	fetch(requestURL).then(response => {
		return response.json(); 
	}).then(json => {
		if(json.results.length < 1) {
			const error = 'Got 0 results from geolocationg query';
			logger.error(error);
			res.status(500).send(error);
		}
		const location = parseLocation(json.results[0].address_components);

		logger.log(`Fetched geolocation for forecast (${location})`);
		res.status(200).json({location: location});
	}).catch(err => {
		logger.error(err);
		res.status(500).send(err);
	});
});

function parseLocation(addressComponents) {
	var town = null;
	var state = null;
	addressComponents.forEach(component => {
		if (component.types.includes('locality') && component.types.includes('political')) {
			town = component.long_name;
		}

		if (component.types.includes('administrative_area_level_1') && component.types.includes('political')) {
			state = component.short_name;
		}
	})

	return `${town}, ${state}`;
}

module.exports = router;