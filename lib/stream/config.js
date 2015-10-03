'use strict';

var url    = require('url');
var qs     = require('querystring');

// TODO: move keys into private config
var OAuth = require('oauth-1.0a');
var oauth = OAuth({
  consumer: {
    'public': 'x7leIG3Fuiy0HNZddUfVWUCwu',
    secret  : 'Y2sHA5mMel3jaxew6T0LhgXdn8mC6a5HxXbzYYnT2voXInLAEm'
  }
});

var token = {
  'public': '572270938-MUU352B7ckitMoWnuNcgLJEXtIYUvI1jn5Ar87Yd',
  secret  : 'zG8kfxx8fRV0bZR9avvB2ndVM5j6caQYxAM6flgyo84fE'
};

var endpoint  = 'https://stream.twitter.com/1.1/statuses/sample.json';
var query     = qs.stringify({ language: 'en' });
var URI       = `${endpoint}?${query}`;
var urlParsed = url.parse(URI);

var oauthData = { url: URI, method: 'GET' };
var headers   = oauth.toHeader(oauth.authorize(oauthData, token));

headers.Connection         = 'keep-alive';
headers['Accept-Encoding'] = 'deflate, gzip';

module.exports = {
  host   : urlParsed.host,
  path   : urlParsed.path,
  headers: headers
};
