const refreshIndex = () => {
  const requestURL = 'http://localhost:3001/api/modules/index'
  fetch(requestURL).then(response => {
    console.log("RESPONSE");
    return response.json();
  }).then(json => {
    console.log("REFRESHING");
    json.forEach(warning => {
      console.log(warning);
    })
  });
}

export { refreshIndex }