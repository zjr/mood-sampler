var https = require('https');
var url   = require('url');
var zlib  = require('zlib');

var split = require('split');

// TODO: move keys into private config
var OAuth = require('oauth-1.0a');
var oauth = OAuth({
  consumer: {
    public: 'x7leIG3Fuiy0HNZddUfVWUCwu',
    secret: 'Y2sHA5mMel3jaxew6T0LhgXdn8mC6a5HxXbzYYnT2voXInLAEm'
  }
});

var token = {
  public: '572270938-MUU352B7ckitMoWnuNcgLJEXtIYUvI1jn5Ar87Yd',
  secret: 'zG8kfxx8fRV0bZR9avvB2ndVM5j6caQYxAM6flgyo84fE'
};

var endpoint  = 'https://stream.twitter.com/1.1/statuses/sample.json';
var urlParsed = url.parse(endpoint);

var oauthData = { url: endpoint, method: 'GET' };
var headers   = oauth.toHeader(oauth.authorize(oauthData, token));

headers['Connection']      = 'keep-alive';
headers['Accept-Encoding'] = 'deflate, gzip';

var request_opts = {
  host   : urlParsed.host,
  path   : urlParsed.path,
  headers: headers
};

var req = https.request(request_opts, res => {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  var stream;
  switch (res.headers['content-encoding']) {
    case 'gzip':
      stream = res.pipe(zlib.createGunzip());
      break;
    case 'deflate':
      stream = res.pipe(zlib.createDeflate());
      break;
    default:
      stream = res.setEncoding('utf8');
      break;
  }
  stream
    .pipe(split(JSON.parse))
    .on('data', console.dir)
    .on('error', console.error);
});

req.on('error', function (err) {
  console.error('Problem with request: ' + err.message);
});

req.end();

