'use strict';

var app     = module.exports = require('express')();
var options = require('./lib/spec');
var kraken  = require('kraken-js');

/*
 * Create and configure application. Also exports application instance for use by tests.
 * See https://github.com/krakenjs/kraken-js#options for additional configuration options.
 */

app.use(kraken(options));
app.on('start', function () {
  console.log('Application ready to serve requests.');
  console.log('Environment: %s', app.kraken.get('env:env'));
});
