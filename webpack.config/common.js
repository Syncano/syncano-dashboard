var ENV     = process.env.NODE_ENV || 'development',
    path    = require('path'),
    webpack = require('webpack'),
    version = require('../package.json').version,
    envVars = null,
    plugin  = {ENV: JSON.stringify(ENV), VERSION: JSON.stringify(version)},
    package = require('../package.json');

envVars = [
  'ANALYTICS_WRITE_KEY',
  'CIRCLE_BRANCH',
  'CIRCLE_SHA1',
  'FACEBOOK_ID',
  'GITHUB_ID',
  'GOOGLE_ID',
  'SENTRY_DSN',
  'STRIPE_PUBLISHABLE_KEY',
  'SYNCANO_BASE_DOMAIN',
  'SYNCANO_BILLING_EMAIL',
  'SYNCANO_DEMO_APPS_ACCOUNT_KEY',
  'SYNCANO_CUSTOM_SOCKETS_REGISTRY_ACCOUNT_KEY',
  'SYNCANO_SUPPORT_EMAIL'
];

// check env variables like this: DEVELOPMENT_FACEBOOK_ID or FACEBOOK_ID or null
for (var i = 0; i < envVars.length; i++) {
  var name = envVars[i];
  var envName = ENV.toUpperCase() + '_' + name;

  plugin[name] = JSON.stringify(process.env[envName] || process.env[name] || '');
}

module.exports = {
  target: 'web',
  entry: {
      app: [path.resolve(__dirname, '../src/app.jsx')],
      vendor: Object.keys(package.dependencies)
  },
  output: {
    path: path.resolve(__dirname, '../dist/js'),
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: 'js/',
  },
  plugins: [
    new webpack.DefinePlugin(plugin),
    new webpack.DefinePlugin({ SYNCANO_BASE_URL: `"${process.env.SYNCANO_BASE_URL || 'https://api.syncano.io'}"` })
  ],
  module: {
    preLoaders: [],
    loaders: [
      {test: /\.(svg)$/, loader: 'raw-loader'},
      {test: /\.js(|x)$/, exclude: [/node_modules/, /syncano-components/, /material-ui/], loader: 'babel'},
      {test: /\.css$/, loader: 'style-loader!css-loader!autoprefixer-loader?browsers=last 2 version'},
      {test: /\.styl/, loader: 'style-loader!stylus-loader!autoprefixer-loader?browsers=last 2 version'},
      {
        test: /\.sass$/,
        loader: "style!css!sass?sourceMap&indentedSyntax&outputStyle=expanded&precision=8&" +
          "includePaths[]=" + (path.resolve(__dirname, "../node_modules/compass-mixins/lib")) + "&" +
          "includePaths[]=" + (path.resolve(__dirname, "../src/assets/sass")) + "&" +
          "includePaths[]=" + (path.resolve(__dirname, "../node_modules"))
      },
      {test: /\.json$/, loaders: ['json-loader']}
    ]
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.json', '.jsx', '.css', '.scss', '.sass', '.svg', '.styl'],
    fallback: [path.join(__dirname, 'node_modules')],
    alias: {
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
      'react-router': path.resolve('./node_modules/react-router')
    }
  },
  externals: {
    'analyticsjs': 'window.analytics',
    'stripejs': 'Stripe'
  }
};
