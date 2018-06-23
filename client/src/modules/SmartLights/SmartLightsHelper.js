const getRooms = (callback) => {
  const requestURL = 'http://localhost:3001/api/smartlights/groups';
  fetchGet(requestURL, callback);
}

const getLight = (id, callback) => {
  const requestURL = `http://localhost:3001/api/smartlights/lights/${id}`;
  fetchGet(requestURL, callback);
}

const getAllLights = (callback) => {
  const requestURL = `http://localhost:3001/api/smartlights/lights`;
  fetchGet(requestURL, callback);
}

const toggleLight = (id, on, callback) => {
  const requestURL = `http://localhost:3001/api/smartlights/lights/${id}/${on}`;
  fetchGet(requestURL, callback);
}

const fetchGet = (url, callback) => {
  fetch(url).then(response => {
    return response.json();
  }).then(json => {
    callback(json);
  }).catch(error =>{
    console.log(`[ERROR]: ${url}`);
    console.log(error);
  })
}

export default { getRooms, getLight, getAllLights, toggleLight }