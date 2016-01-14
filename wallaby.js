'use strict';


module.exports = function (wallaby) {
  return {

    files: [
      'index.js',
      'server.js',
      'config/*.json',
      'lib/**/*.js',
      'models/*.js',
      'test/mock-data/*',
      'controllers/**/*.js',
      { 'pattern': 'public/**', 'instrument': false },
      { 'pattern': 'locales/**', 'instrument': false }
    ],

    tests: [
      'test/*.js'
    ],

    env: {
      'type': 'node',

      params: {
        env: 'NODE_ENV=test'
      }

    },

    testFramework: 'mocha',

    /**
     * These methods have weird isolated scope.
     */
    bootstrap: function (wallaby) {
      global.wallabyId = wallaby.sessionId;
    }

  };
};

