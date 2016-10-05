var webpack = require('webpack'),
    config  = require('./common');

config.bail     = true;
config.debug    = false;
config.profile  = false;
config.devtool  = 'source-map';
config.progress = false;
config.plugins.unshift(
  new webpack.DefinePlugin({SYNCANO_BASE_URL: "'https://api.syncano.io'"}),
  new webpack.DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify('beta')}}),
  new webpack.optimize.OccurenceOrderPlugin(true),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      drop_console: true,
      drop_debugger: true
    },
    output: {
      comments: false
    }
  }),
  new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.js', minChunks: Infinity})
);

module.exports = config;
