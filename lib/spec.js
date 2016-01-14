'use strict';

var db = require('./database');

module.exports = function spec() {
  let conn;
  let dbConfig = {};

  return {

    getConn: function getConn() {
      return conn;
    },

    setDb: function setDb(db) {
      dbConfig.database = db;
    },

    onconfig: function (config, next) {
      /*
       * Add any additional config setup or overrides here. `config` is an initialized
       * `confit` (https://github.com/krakenjs/confit/) configuration object.
       */
      dbConfig = Object.assign(config.get('databaseConfig'), dbConfig);
      conn     = db.config(dbConfig);
      next(null, config);
    }

  };
};
