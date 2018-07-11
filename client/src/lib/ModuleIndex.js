import { SERVER_URL } from 'lib/constants';

const refreshIndex = () => {
  const requestURL = `${SERVER_URL}/api/modules/index`
  fetch(requestURL).then(response => {
    return response.json();
  }).then(json => {
    json.forEach(warning => {
      console.log(warning);
    })
  });
}

export { refreshIndex }