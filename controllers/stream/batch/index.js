'use strict';

var Promise     = require('bluebird');

var TweetStream = require('../../../lib/stream/tweet-stream');
var Tweet       = require('../../../models/tweet');

const count     = 20;

module.exports  = function (router) {

  router.get('/', function (req, res) {
    var tweetPromises = [];
    var tweetStream = new TweetStream();

    tweetStream.on('data', data => {
      tweetPromises.push(Tweet.create(data));

      if (tweetPromises.length < count) { return; }

      tweetStream.stop();

      Promise
        .all(tweetPromises)
        .then(tweets => res.json(tweets))
        .catch(err => res.json(err));
    });

    tweetStream.on('error', err => res.json(err));
  });

};


