var paths = require('./_common')().paths;
var del   = require('del');

module.exports = function(cb) {
  del([
    paths.assets + '/fonts/icons/**/*',
    paths.assets + '/fonts/icons/',
    paths.assets + '/css/synicons.css'
  ], cb);
};
