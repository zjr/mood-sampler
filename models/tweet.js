'use strict';

var mongoose = require('mongoose');

var tweetModel = function () {

  var tweetSchema = mongoose.Schema({
    id_str      : String,
    text        : String,
    created_at  : Date,
    timestamp_ms: String,
    lang        : String,
    place       : Object, // possible 'place' tweeted from

    coordinates : {
      coordinates: [Number],
      type       : { type: String }
    },

    user        : {
      id_str            : String,
      name              : String,
      description       : String,
      screen_name       : String,
      location          : String, // user defined location
      geo_enabled       : Boolean,
      time_zone         : String, // user declared
      utc_offset        : Number,
      profile_image_url : String,
      profile_banner_url: String
    }
  });

  return mongoose.model('Tweet', tweetSchema);

};

module.exports = new tweetModel();
