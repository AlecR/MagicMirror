const express = require('express');
const fetch = require('node-fetch');
const Logger = require('../lib/Logger');

const router = express.Router();
const logger = new Logger('👨🏼‍💻');

router.get('/topstories', (req, res) => {
  const storyCount = req.query.count;
  getTopStoryIds(5, storyIds => {
    getStories(storyIds, stories => {
      res.json(stories);
    })
  });
});

const getTopStoryIds = (count, callback) => {
  const requestURL = 'https://hacker-news.firebaseio.com/v0/topstories.json';
  fetch(requestURL).then(response => {
    return response.json();
  }).then(json => {
    ids = json.slice(0, count);
    callback(ids);
  });
};

const getStories = (storyIds, callback, stories = []) => {
  const id = storyIds.pop();
  const requestURL = `https://hacker-news.firebaseio.com/v0/item/${id}.json`
  fetch(requestURL).then(response => {
    return response.json();
  }).then(json => {
    stories.push(json);
    urlIsPDF(json.url);
    if (storyIds.length < 1) {
      logger.log(`Got top ${stories.length} HackerNews stories`);
      checkStoriesCanOpenInIframe(stories, updatedStories => {
        callback(updatedStories);
      })
    } else {
      getStories(storyIds, callback, stories);
    } 
  });
};

const checkStoriesCanOpenInIframe = (stories, callback, updatedStories = []) => {
  const pushStoryAndCheck = (story) => {
    updatedStories.push(story);
    if (stories.length < 1) {
      callback(updatedStories);
    } else {
      checkStoriesCanOpenInIframe(stories, callback, updatedStories);
    } 
  }
  const story = stories.pop();

  if (urlIsPDF(story.url)) {
    story['canOpen'] = false;
    pushStoryAndCheck(story);
  } else {
    fetch(story.url).then(response => {
      story['canOpen'] = responseAllowsIframe(response);
      pushStoryAndCheck(story);
    }).catch(err => {
      story['canOpen'] = false;
      pushStoryAndCheck(story);
    });
  }
}

const responseAllowsIframe = response => {
  var xFrameOptions = response.headers.get('x-frame-options') || '';
  xFrameOptions = xFrameOptions.toLowerCase();
  if(xFrameOptions === 'sameorigin' || xFrameOptions === 'deny') {
    return false;
  } else {
    return true;
  }
}

const urlIsPDF = (url) => {
  return url.split('.').pop().includes('pdf');
}

module.exports = router;