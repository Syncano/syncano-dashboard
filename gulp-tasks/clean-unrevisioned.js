var paths = require('./_common')().paths;
var del = require('del');
var _ = require('lodash');

module.exports = function(cb) {
  var manifest = require('.' + paths.dist + '/rev-manifest.json');
  var allKeys = _.keys(manifest);
  var keysWithoutStatic = _.filter(allKeys, function(key) {
    return !_.startsWith(key, 'img/static');
  });
  var delPaths = _.map(keysWithoutStatic, function(path) {
    return paths.dist + '/' + path;
  });

  del(delPaths, cb);
};

module.exports.dependencies = ['clean', 'webpack-build', 'revision'];
