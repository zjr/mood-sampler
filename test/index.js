/*global describe:false, it:false, beforeEach:false, afterEach:false, before:false, after:false */

'use strict';

const kraken  = require('kraken-js');
const express = require('express');
const path    = require('path');
const request = require('supertest');
const zlib    = require('zlib');

const nock = require('nock');

const fs    = require('fs');
const https = require('https');

const spec = require('../lib/spec')();

let app, mock;

const options = Object.assign({
  basedir: path.resolve(__dirname, '..')
}, spec);

beforeEach(done => {
  app = express();
  app.on('start', done);
  app.use(kraken(options));

  mock = app.listen(0);
});

afterEach(done => {
  mock.close(done);
});

describe('index', () => {

  it('should say "hello"', done => {
    request(mock)
      .get('/')
      .expect(200)
      .expect('Content-Type', /html/)
      .expect(/Hello, /)
      .end(done);
  });

});

describe('stream batch', () => {

  before(() => {
    nock('https://stream.twitter.com/1.1')
      .get('/statuses/sample.json?language=en')
      .reply(200, () => {
        const fPath = path.resolve(__dirname, 'mock-data/tweets.txt');
        return fs.createReadStream(fPath);
      });
  });

  it('should get a batch of tweets', function (done) {
    request(mock)
      .get('/stream/batch')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (err, res) {
        console.dir(res);
        done(err);
      });
  });

});

