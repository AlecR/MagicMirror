import { SERVER_URL } from 'lib/constants'; 

const getRooms = (callback) => {
  const requestURL = `${SERVER_URL}/api/smartlights/groups`;
  fetchGet(requestURL, callback);
}

const getLight = (id, callback) => {
  const requestURL = `${SERVER_URL}/api/smartlights/lights/${id}`;
  fetchGet(requestURL, callback);
}

const getAllLights = (callback) => {
  const requestURL = `${SERVER_URL}/api/smartlights/lights`;
  fetchGet(requestURL, callback);
}

const updateState = (id, body, callback) => {
  const requestURL = `${SERVER_URL}/api/smartlights/lights/${id}/state`;
  const requestBody = JSON.stringify(body);
  fetch(requestURL, {
    method: "PUT",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: requestBody
  }).then(response => {
    return response.json();
  }).then(json => {
    callback(json);
  }).catch(error =>{
    console.log(`[ERROR]: ${requestURL}`);
    console.log(error);
  })
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

export default { getRooms, getLight, getAllLights, updateState }