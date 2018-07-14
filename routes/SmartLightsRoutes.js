const express = require('express');
const fetch = require('node-fetch');
const Logger = require('../lib/Logger');

const HUE_IP = '10.0.0.153'
const HUE_USERNAME = 'cATamjW4q-RKFR0NxTZPMxU4fBaFST3DCf9lga1S';
const router = express.Router();
const logger = new Logger('💡');

router.get('/groups', (_, res) => {
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
      logger.log('Fetched smartlight groups'); 
      res.status(200).json(rooms);
  }).catch(err => {
      logger.error(err);
      res.status(500).send(err);
   })
})


router.get('/lights', (_, res) => {
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
      });
      logger.log('Fetched smartlights');
      res.status(200).json(formattedLightData);
  }).catch(err => {
      logger.error(err);
      res.status(500).send(err);
   });
});

router.get('/lights/:id', (req, res) => {
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
      };
      logger.log(`Fetched data for light ${id}`);
      res.status(200).json(lightData);
  }).catch(err => {
      logger.error(err);
      res.status(500).send(err);
   });
});

router.put('/lights/:id/state', (req, res) => {
  const id = req.params.id;
  const requestURL = `http://${HUE_IP}/api/${HUE_USERNAME}/lights/${id}/state`;
  fetch(requestURL, {
    method: "PUT",
    body: JSON.stringify(req.body)
  }).then(response => {
    return response.json();
  }).then(json => {
    logger.log(`Updated state for light ${id}`);
    res.status(200).json(json);
  }).catch(err => {
    logger.error(err);
    res.status(500).send(err);
  });
});

module.exports = router;