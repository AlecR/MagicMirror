import { SERVER_URL } from 'lib/constants';

const lat = '42.506484';
const lon = '-71.0728306';

const getWeatherData = (callback) => {
  const requestURL = `${SERVER_URL}/api/weather?lat=${lat}&lon=${lon}`;
  fetch(requestURL).then(response => {
    return response.json();
  }).then(json => {
    callback(json);
  });
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

export default { getWeatherData, days };