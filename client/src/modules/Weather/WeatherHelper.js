import { SERVER_URL } from 'lib/constants';

const lat = '42.506484';
const lon = '-71.0728306';

const getWeatherData = (callback) => {
  const requestURL = `${SERVER_URL}/api/weather/forecast?lat=${lat}&lon=${lon}`;
  fetch(requestURL).then(response => {
    return response.json();
  }).then(json => {
    callback(json);
  });
}

const getLocation = callback => {
  const requestURL = `${SERVER_URL}/api/weather/location?lat=${lat}&lon=${lon}`;
  fetch(requestURL).then(response => {
    return response.json();
  }).then(json => {
    callback(json.location);
  });
}

const hourToTime = hour => {
  if(hour === 0) {
    return "12 AM";
  } else if(hour === 12) {
    return "12 PM";
  }

  if (hour <= 12) {
    return `${hour} AM`;
  } else {
    return `${hour-12} PM`;
  }
}

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
]

export default { getWeatherData, getLocation, days, hourToTime };