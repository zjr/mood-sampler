'use strict';

var db = require('./database');

module.exports = function spec() {
  return {
    onconfig: function (config, next) {
      /*
       * Add any additional config setup or overrides here. `config` is an initialized
       * `confit` (https://github.com/krakenjs/confit/) configuration object.
       */
      db.config(config.get('databaseConfig'));
      next(null, config);
    }
  };
};
