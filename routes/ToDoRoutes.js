const express = require('express');
const fetch = require('node-fetch');
const Logger = require('../lib/Logger');

const TODOIST_CLIENT_ID = '4ddd8c32dc914bc7b5f5ef4b4f8637b3';
const TODOIST_CLIENT_SECRET = 'ae06fdc4a4084f96986b836fd615632c';
const TODOIST_AUTH_COOKIE_NAME = 'todoist_token';
const router = express.Router();
const logger = new Logger('✅');

router.get('/auth', (req, res) => {
  if(req.cookies['todoist_token']) { return; }
  const code = req.query.code;
  const secret = req.query.state;
  if(!code || !secret) res.status(500).send('Code or secret not provided');
  if(secret !== TODOIST_CLIENT_SECRET) res.status(500).send('Provided secret does not match app secret');
  const requestURL = `https://todoist.com/oauth/access_token?client_id=${TODOIST_CLIENT_ID}&client_secret=${secret}&code=${code}`;
  fetch(requestURL, {
    method: "POST",
  }).then(response => {
    return response.json();
  }).then(json => {
    const token = json.access_token;
    if (!token) { 
      logger.log('Didn\'t get a token!');
      res.sendStatus(500).send("Didn't get a token");
    }
    logger.log('Successfully authorized user');
    res.cookie(TODOIST_AUTH_COOKIE_NAME, token, {
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

router.get('/authorized', (req, res) => {
  const token = req.cookies['todoist_token'];
  if(token) {
    logger.log('User is authorized');
    res.status(200).json({'authorized': true});
  } else {
    logger.log('User is NOT authorized');
    res.status(200).json({'authorized': false});
  }
})

router.get('/tasks', (req, res) => {
  const token = req.cookies['todoist_token'];
  const requestURL = 'https://beta.todoist.com/API/v8/tasks'
  fetch(requestURL, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then(response => {
    return response.json();
  }).then(json => {
    logger.log('Fetched tasks');
    res.status(200).json(json);
  }).catch(err => {
    logger.error(err);
    res.status(500).send(err);
  })
})

router.get('/tasks/:id/close', (req, res) => {
  const token = req.cookies['todoist_token'];
  const id = req.params.id;
  const requestURL = `https://beta.todoist.com/API/v8/tasks/${id}/close`
  fetch(requestURL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then(_ => {
    logger.log(`Closed task ${id}`)
    res.sendStatus(200);
  }).catch(err => {
    logger.error(err);
    res.status(500).send(err);
  })
})

router.get('/projects', (req, res) => {
  const token = req.cookies['todoist_token'];
  const requestURL = 'https://beta.todoist.com/API/v8/projects'
  fetch(requestURL, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }).then(response => {
    return response.json();
  }).then(json => {
    logger.log('Fetched projects');
    res.status(200).json(json);
  }).catch(err => {
    logger.error(err);
    res.status(500).send(err);
  })
})

module.exports = router;