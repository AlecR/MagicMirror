import { SERVER_URL } from 'lib/constants';

const month= [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const getCalendarData = (callback) => {
  const requestURL = `${SERVER_URL}/api/calendar`
  fetch(requestURL).then(response => {
    return response.json();
  }).then(json => {
    callback(json);
  });
}

const isSameDay = (dateOne, dateTwo) => {
  return dateOne.getDate() === dateTwo.getDate()
    && dateOne.getMonth() === dateTwo.getMonth()
    && dateOne.getYear() === dateTwo.getYear()
}

const convertDateToTime = (date, displayAmPm = false) => {
  const formattedDate = date.toLocaleTimeString(this.locale, { hour: 'numeric', minute: '2-digit' });
  var time = formattedDate.split(' ')[0];
  if (displayAmPm) {
    const hours = date.getHours();
    const amPm = hours >= 12 ? "PM" : "AM";
    time = time + ` ${amPm}`; 
  }
  return time;
}

const unixToDate = unix => {
  var date = new Date(unix);
  const dateString = `${month[date.getMonth()]} ${date.getDate()}`;
  return dateString;
}

export default { getCalendarData, isSameDay, convertDateToTime, unixToDate };