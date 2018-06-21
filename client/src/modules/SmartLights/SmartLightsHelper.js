const username = 'DAnFznZlBxomPBwJljCyyAtBmYvd4D3wO9Pn4Dr0';
const bridgeIP = '10.0.0.153';

const getRooms = (callback) => {
  const requestURL = `http://${bridgeIP}/api/${username}/groups`;
  fetch(requestURL).then(response => {
    return response.json();
  }).then(rooms => {
    const filteredRooms = []
    Object.keys(rooms).forEach(roomKey => {
      const room = rooms[roomKey];
      if(room.type === 'Room'){ 
        filteredRooms.push(room);
      }
    })
    callback(filteredRooms);
  });
}

export default { getRooms }