const getCalendarData = (callback) => {
  const requestURL = 'http://localhost:3001/api/calendar'
  fetch(requestURL).then(response => {
    return response.json();
  }).then(json => {
    callback(json);
  });
}

export default { getCalendarData };