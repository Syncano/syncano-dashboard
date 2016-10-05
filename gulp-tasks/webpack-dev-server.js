var gutil            = require('gulp-util'),
    webpack          = require('webpack'),
    WebpackDevServer = require('webpack-dev-server'),
    webpackConfig    = require('../webpack.config');

module.exports = function() {
  new WebpackDevServer(webpack(webpackConfig), webpackConfig.devServer)
    .listen(8080, '0.0.0.0', function(err) {
      if (err) {
        throw new gutil.PluginError('webpack-dev-server', err);
      }
      gutil.log('[webpack-dev-server]', 'https://0.0.0.0:8080/');
    });
};

module.exports.dependencies = ['clean', 'copy'];
