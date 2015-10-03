'use strict';

var Promise     = require('bluebird');

var TweetStream = require('./tweet-stream');
var Tweet       = require('../../models/tweet');

TweetStream
  .on('data', data => {
    console.log(data.coordinates);
    Promise.resolve(Tweet.create(data))
      .then(function (tweet) {
        debugger;
      })
      .catch(console.error);
  })
  .on('error', console.error);
