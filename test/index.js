/*global describe:false, it:false, beforeEach:false, afterEach:false*/

'use strict';

const kraken  = require('kraken-js');
const express = require('express');
const path    = require('path');
const request = require('supertest');
const sinon   = require('sinon');

const https   = require('https');


let app, mock;

beforeEach(done => {
  app = express();
  app.on('start', done);
  app.use(kraken({
    basedir: path.resolve(__dirname, '..')
  }));

  mock = app.listen(1337);
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

