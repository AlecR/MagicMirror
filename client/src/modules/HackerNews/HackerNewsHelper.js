import { SERVER_URL } from 'lib/constants';

const topStories = (callback) => {
  const requestURL = `${SERVER_URL}/api/hackernews/topstories`;
  fetch(requestURL).then(response => {
    return response.json();
  }).then(json => {
    callback(json);
  });
};

const parseDomain = (url) => {
  const domain = url.split('/')[2].replace('www.', '');
  return domain;
}

export default { topStories, parseDomain };