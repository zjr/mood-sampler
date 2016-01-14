/*global describe:false, it:false, beforeEach:false, afterEach:false, before:false, after:false */

'use strict';

const mongoose = require('mongoose');
const kraken   = require('kraken-js');
const express  = require('express');
const path     = require('path');
const request  = require('supertest');
const zlib     = require('zlib');

const nock = require('nock');

const fs    = require('fs');
const https = require('https');


let app, mock, spec, wId;

const getConfig = function getConfig() {
  spec = require('../lib/spec')();
  wId  = global.wallabyId;

  if (wId !== undefined) {
    spec.setDb(`mood-test-${wId}`);
  }

  return Object.assign({
    basedir: path.resolve(__dirname, '..')
  }, spec);
};


beforeEach(done => {
  mongoose.models       = {};
  mongoose.modelSchemas = {};
 
  const options = getConfig();

  app = express();

  app.on('start', done);
  app.on('error', done);

  app.use(kraken(options));

  mock = app.listen(0);
});

afterEach(done => {
  spec.getConn().db.dropDatabase();
  mock.close(done);
  nock.cleanAll();
});

describe('index', () => {

  it('should say "hello"', done => {
    request(mock)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(/Hello, /)
      .end((err, res) => {
        console.error(err);
        done(err);
      });
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
        done(err);
      });
  });

});

