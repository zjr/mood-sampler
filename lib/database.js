'use strict';

var mongoose = require('mongoose');

var db = function () {
  return {

    config: function (conf) {
      mongoose.connect(`mongodb://${conf.host}/${conf.database}`);
      const db = mongoose.connection;
      db.on('error', console.error.bind(console, 'connection error:'));
      db.once('open', () => console.log('db connection open'));
      return db;
    }

  };
};

module.exports = db();
