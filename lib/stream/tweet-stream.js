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
  this.req.end();
  this.req.on('error', e => this.emit('error', e));
};

util.inherits(TweetStream, events.EventEmitter);

TweetStream.prototype.makeReq = function makeReq() {
  var self = this; // shouldn't have to do this?
  return https.request(config, res => {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    this.res = res;
    this.stream = decompress(res)
      .pipe(split(JSON.parse))
      .on('data', data => self.emit('data', data))
      .on('error', err => self.emit('error', err));
  });
};

TweetStream.prototype.stop = function stop() {
  this.res.unpipe();
  this.stream.destroy();
  this.req.abort();
  this.req.on('abort', () => console.log('TweetStream req aborted.'));
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
