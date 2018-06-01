const lat = '42.506484'
const lon = '-71.0728306'

const getWeatherData = (callback) => {
  const requestURL = `http://localhost:3001/api/weather?lat=${lat}&lon=${lon}`
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