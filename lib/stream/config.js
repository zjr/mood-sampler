'use strict';

const url = require('url');
const qs  = require('querystring');

// TODO: move keys into private config
const OAuth = require('oauth-1.0a');
const oauth = OAuth({
  consumer: {
    'public': 'x7leIG3Fuiy0HNZddUfVWUCwu',
    secret  : 'Y2sHA5mMel3jaxew6T0LhgXdn8mC6a5HxXbzYYnT2voXInLAEm'
  }
});

const token = {
  'public': '572270938-MUU352B7ckitMoWnuNcgLJEXtIYUvI1jn5Ar87Yd',
  secret  : 'zG8kfxx8fRV0bZR9avvB2ndVM5j6caQYxAM6flgyo84fE'
};

const endpoint  = 'https://stream.twitter.com/1.1/statuses/sample.json';
const query     = qs.stringify({ language: 'en' });
const URI       = `${endpoint}?${query}`;
const urlParsed = url.parse(URI);

const oauthData = { url: URI, method: 'GET' };
let headers     = oauth.toHeader(oauth.authorize(oauthData, token));

headers.Connection         = 'keep-alive';
headers['Accept-Encoding'] = 'deflate, gzip';

module.exports = {
  host   : urlParsed.host,
  path   : urlParsed.path,
  headers: headers
};
