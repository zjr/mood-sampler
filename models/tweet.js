'use strict';

var mongoose = require('mongoose');

var tweetModel = function () {

  var tweetSchema = mongoose.Schema({

  });

  return mongoose.model('Tweet', tweetSchema);

};

module.exports = new tweetModel();
