'use strict';

let axios = require('axios');

let projects = [];

const headers = {
  "Authorization": "Bearer AAAAAAAAAAAAAAAAAAAAACnV%2FQAAAAAAkzfzakK%2BE5NPvqN9ess7cwYUqoI%3Dk6P7OQOFmfXHjQiiyZ3WRNLweO0sJIpfDzwVpP2UUzLOIB6Viy"
};

axios.get('https://api.twitter.com/1.1/search/tweets.json?q=%23devops&result_type=recent&count=100', {headers})
  .then(response => {
    console.log(response.data)
  })
  .catch(error => {
    console.log(error)
  });

