'use strict';

var https  = require('https');
var zlib   = require('zlib');
var util   = require('util');
var events = require('events');

var split  = require('split');

var config = require('./config');

var TweetStream = function TweetStream() {
  events.EventEmitter.call(this);

  this.req = this.makeReq();
};

util.inherits(TweetStream, events.EventEmitter);

TweetStream.prototype.makeReq = function makeReq() {
  var self = this;
  return https.request(config, res => {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    decompress(res)
      .pipe(split(JSON.parse))
      .on('data', data => {
        self.emit('data', data);
      })
      .on('error', err => {
        self.emit('error', err);
      });
  });
};

TweetStream.prototype.start = function start() {
  this.req.end();
};

TweetStream.prototype.stop = function stop() {
  this.req.close(() => console.log('TweetStream closed.'));
};

function decompress(res) {
  switch (res.headers['content-encoding']) {
    case 'gzip':
      return res.pipe(zlib.createGunzip());
    case 'deflate':
      return res.pipe(zlib.createDeflate());
    default:
      return res.setEncoding('utf8');
  }
}

module.exports = TweetStream;
