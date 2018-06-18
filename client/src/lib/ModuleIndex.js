const refreshIndex = () => {
  const requestURL = 'http://localhost:3001/api/modules/index'
  fetch(requestURL).then(response => {
    return response.json();
  }).then(json => {
    json.forEach(warning => {
      console.log(warning);
    })
  });
}

export { refreshIndex }