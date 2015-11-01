'use strict';

const https = require('https');
const zlib  = require('zlib');
const util  = require('util');

const EventEmitter = require('events').EventEmitter;

const split = require('split');

const config = require('./config');

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

let tweetStreamProto = {

  makeReq: function () {
    this.req = https.request(config, res => {
      console.log('STATUS: ' + res.statusCode);
      console.log('HEADERS: ' + JSON.stringify(res.headers));
      this.res    = res;
      this.stream = decompress(res)
        .pipe(split(JSON.parse))
        .on('data', data => this.emit('data', data))
        .on('error', err => this.emit('error', err));
    });
    this.req.end();
    this.req.on('error', e => this.emit('error', e));
    return this;
  },

  stop: function () {
    this.res.unpipe();
    this.stream.destroy();
    this.req.abort();
    this.req.on('abort', () => console.log('TweetStream req aborted.'));
    return this;
  }

};

module.exports = exports;

exports.TweetStream = function () {
  EventEmitter.call(tweetStreamProto);
  Object.assign(tweetStreamProto, EventEmitter.prototype);

  return Object.create(tweetStreamProto).makeReq();
};
