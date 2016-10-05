var del = require('del');

module.exports = function(cb) {
  del([
    './dist/**/*',
    './dist',
    './dist_e2e/**/*',
    './dist_e2e'
  ], cb);
}
