import {resolve} from 'path';
import webpack, { ContextReplacementPlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import ExtendedDefinePlugin from 'extended-define-webpack-plugin';
import InlineManifestWebpackPlugin from 'inline-manifest-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import {getIfUtils, removeEmpty} from 'webpack-config-utils';
import S3Plugin from 'webpack-s3-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import { getAppConfig, getS3Config } from './webpack-helpers';

const webpackConfig = (env = {development: true}) => {
  const {ifDevelopment, ifNotDevelopment} = getIfUtils(env);
  const extractCSS = new ExtractTextPlugin({
    filename: ifNotDevelopment('styles.[chunkhash].css', 'styles.css'),
    allChunks: true
  });
  const config = {
    context: resolve('src'),
    entry: {
      app: [
        'babel-polyfill',
        'react-hot-loader/patch',
        './app.js'
      ]
    },
    output: {
      filename: ifNotDevelopment('bundle.[name].[chunkhash].js', 'bundle.[name].js'),
      path: resolve('dist'),
      pathinfo: ifDevelopment(),
    },
    devtool: ifNotDevelopment('source-map', 'eval'),
    module: {
      rules: [
        { enforce: 'pre', test: /\.js(|x)$/, loaders: ['eslint-loader'], exclude: /node_modules/ },
        { test: /\.js(|x)$/, use: ['babel-loader'], options: { presets: [["es2015", { "modules": false }], "react", "stage-0"] }, exclude: /node_modules/ },
        { test: /\.json$/, loaders: ['json-loader'] },
        {
          test: /\.css$/,
          loader: extractCSS.extract(['css-loader'])
        },
        { test: /\.(eot|ttf|svg|woff|woff2)$/, loader: 'file-loader?name=./fonts/[name]-[hash].[ext]', include: /fonts/ },
        { test: /\.(jpe?g|png|gif|svg)$/, loader: 'url-loader' },
        {
          test: /\.sass$/,
          loader: extractCSS.extract([
            'css-loader',
            {
              loader: 'sass-loader',
              query: {
                includePaths: [
                  resolve(__dirname, "./node_modules/compass-mixins/lib"),
                  resolve(__dirname, "./src/assets/sass")
                ]
              }
            }
          ])
        }
      ],
    },
    plugins: removeEmpty([
      ifDevelopment(new ProgressBarPlugin()),
      new webpack.NoErrorsPlugin(),
      extractCSS,
      new HtmlWebpackPlugin({ template: './index.html' }),
      new ExtendedDefinePlugin({ APP_CONFIG: getAppConfig(env) }),
      new webpack.LoaderOptionsPlugin({
        minimize: ifNotDevelopment(true),
        options: {
          eslint: {
            formatter: require('eslint-friendly-formatter'),
            configFile: '.eslintrc',
            quiet: true
          }
        }
      }),
      ifNotDevelopment(new ContextReplacementPlugin(/brace[\\\/]mode$/, /^\.\/(javascript|html|python|ruby|golang|swift|php|django|json|css|text)$/)),
      ifNotDevelopment(new ContextReplacementPlugin(/brace[\\\/]theme$/, /^\.\/(tomorrow)$/)),
      ifNotDevelopment(new ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en-uk|en-us|en-au)$/)),
      ifNotDevelopment(new FaviconsWebpackPlugin('./assets/img/syncano-symbol.svg')),
      ifNotDevelopment(new CompressionPlugin({
        asset: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$|\.css$/,
        threshold: 10240,
        minRatio: 0.8
      })),
      env.deploy && new S3Plugin(getS3Config(env)),
      ifNotDevelopment(new InlineManifestWebpackPlugin()),
      ifNotDevelopment(new WebpackMd5Hash()),
      ifNotDevelopment(new webpack.optimize.CommonsChunkPlugin({
        async: true,
        children: true
      })),
      ifNotDevelopment(new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        filename: 'manifest.js',
        minChunks: Infinity,
      }))
    ]),
    resolve: {
      extensions: ['.js', '.jsx']
    },
    externals: {
      'analyticsjs': 'window.analytics',
      'stripejs': 'Stripe'
    }
    // stats: 'errors-only',
    // devServer: {
    //   stats: 'errors-only'
    // }
  };

  if (env.debug) {
    console.log(config);
    debugger; // eslint-disable-line
  }

  return config
};

export default webpackConfig;
