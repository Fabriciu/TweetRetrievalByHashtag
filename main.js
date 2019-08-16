'use strict';

let axios = require('axios');

let config = require('./config');

const headers = {
  "Authorization": "Bearer " + config.accessToken
};

const hashtag = encodeURIComponent(config.hashtags[0]);

const url = config.url + "?q=" + hashtag + "&result_type=" + config.resultType + "&count=" + config.count;

//axios.get('https://api.twitter.com/1.1/search/tweets.json?q=%23devops&result_type=recent&count=100', {headers})
axios.get(url, {headers})
  .then(response => {
    console.log(response.data)
  })
  .catch(error => {
    console.log(error)
  });

