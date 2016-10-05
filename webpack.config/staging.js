var webpack = require('webpack'),
    config  = require('./common');

config.devtool = 'source-map';
config.plugins.unshift(
  new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js')
);

module.exports = config;
