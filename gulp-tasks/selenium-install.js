var selenium = require('selenium-standalone');

module.exports = function(cb) {
  selenium.install({
    version: '2.53.0',
    baseURL: 'http://selenium-release.storage.googleapis.com',
    drivers: {
      chrome: {
        version: '2.25',
        arch: process.arch,
        baseURL: 'http://chromedriver.storage.googleapis.com'
      }
    },
    logger: function(message) {

    },
    progressCb: function(totalLength, progressLength, chunkLength) {

    }
  }, cb);
};
