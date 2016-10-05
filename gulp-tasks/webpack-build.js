var webpack       = require('webpack'),
    webpackConfig = require('../webpack.config');

module.exports = function(callback) {
  webpack(webpackConfig).run(callback);
};

module.exports.dependencies = ['clean', 'copy'];
