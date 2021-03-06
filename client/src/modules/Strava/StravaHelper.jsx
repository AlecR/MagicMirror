import { SERVER_URL } from 'lib/constants';
import React from 'react';
import { Redirect } from 'react-router-dom';

const METERS_PER_MILE = 1609.344

const authorizeUser = (query) => {
  if(!query) {
    console.log('No query provided. Returning');
    return;
  }
  
  const requestURL = `${SERVER_URL}/api/strava/auth${query}`;
  fetch(requestURL, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }).then(_ => {
    return <Redirect to="/dashboard"/>
  }).catch(err => {
    console.log(err);
  })
}

const isAuthorized = (callback) => {
  const requestURL = `${SERVER_URL}/api/strava/authorized`;
  fetch(requestURL, {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include'
  }).then(response => {
    return response.json()
  }).then(json => {
    const authorized = json.authorized;
    callback(authorized);
  }).catch(err => {
    console.log(err);
    return;
  })
}

const getWeeklyActivities = (callback) => {
  const requestURL = `${SERVER_URL}/api/strava/activities/current-week`;
  fetch(requestURL, {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include'
  }).then(response => {
    return response.json()
  }).then(json => {
    callback(json);
  }).catch(err => {
    console.log(err);
  })
}

const metersToMiles = meters => {
  const miles = meters / METERS_PER_MILE;
  return parseFloat(miles.toFixed(1));
}

const averageSpeedToPace = speed => {
  if(speed === 'Infinity:NaN' || speed === 0){
    return (<span className='strava-latest-run-info__pace--large'>--</span>)
  }
  const secondsPerMile = METERS_PER_MILE / speed;
  const pace = secondsToFormattedTimeString(secondsPerMile); 
  return (<div><span className='strava-latest-run-info__pace--large'>{pace}</span> / mile</div>);
}

const secondsToFormattedTimeString = totalSeconds => {
  const minutes = Math.floor(totalSeconds / 60);
  var seconds = parseInt(totalSeconds - minutes * 60, 10);
  if(seconds < 10) {
    seconds = `0${seconds}`;
  }
  const time = `${minutes}:${seconds}`;
  return time;
}

export default { 
  authorizeUser, 
  isAuthorized, 
  getWeeklyActivities, 
  metersToMiles,
  averageSpeedToPace,
  secondsToFormattedTimeString
}