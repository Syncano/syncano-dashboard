var paths = require('./_common')().paths,
    del   = require('del');

module.exports = function(cb) {
  var manifest = require('.' + paths.dist + '/rev-manifest.json'),
      delPaths = Object.keys(manifest).map(function(path) {
        return paths.dist + '/' + path;
      });

  del(delPaths, cb);
};

module.exports.dependencies = ['clean', 'webpack-build', 'revision'];
