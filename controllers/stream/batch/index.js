'use strict';

const Promise = require('bluebird');

const TweetStream = require('../../../lib/stream/tweet-stream').TweetStream;
const Tweet       = require('../../../models/tweet');

const count = 20;

module.exports = function (router) {

  router.get('/', function (req, res) {
    let tweetPromises = [];
    let tweetStream   = TweetStream();

    tweetStream.on('data', data => {
      tweetPromises.push(Tweet.create(data));

      if (tweetPromises.length === count) {

        tweetStream.stop();

        Promise
          .all(tweetPromises)
          .then(tweets => res.json(tweets))
          .catch(err => res.json(err));
      }
    });

    tweetStream.on('error', err => console.error(err));
  });

};


