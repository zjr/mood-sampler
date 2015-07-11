var https = require('https');
var url   = require('url');

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

var request_opts = {
  host   : urlParsed.host,
  path   : urlParsed.path,
  headers: oauth.toHeader(oauth.authorize({ url: endpoint, method: 'GET' },
    token))
};

var req = https.request(request_opts, function (res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res
    .setEncoding('utf8')
    .pipe(split(JSON.parse))
    .on('data', console.dir)
    .on('error', console.error);
});

req.on('error', function (err) {
  console.error('Problem with request: ' + err.message);
});

req.end();

