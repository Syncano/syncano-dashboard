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
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import VendorChunkPlugin from 'webpack-vendor-chunk-plugin';
import { getAppConfig, getS3Config } from './webpack-helpers';

const webpackConfig = (env = {development: true}) => {
  const {ifDevelopment, ifNotDevelopment} = getIfUtils(env);
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
        {enforce: 'pre', test: /\.js(|x)$/, loaders: ['eslint-loader'], exclude: /node_modules/},
        {test: /\.js(|x)$/, use: ['babel-loader'], options: { presets: [["es2015", { "modules": false }], "react", "stage-0"] }, exclude: /node_modules/},
        {test: /\.json$/, loaders: ['json-loader']},
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({
            fallbackLoader: 'style-loader',
            loader: 'css-loader',
          })
        },
        {test: /\.(jpe?g|png|gif|svg)$/, loaders: ['url-loader']},
        {test: /\.(eot|ttf|woff|woff2)$/, loaders: ['file-loader']},
        {
          test: /\.sass$/,
          use: [
            'style-loader',
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
          ]
        }
      ],
    },
    plugins: removeEmpty([
      ifDevelopment(new ProgressBarPlugin()),
      new webpack.NoErrorsPlugin(),
      new ExtractTextPlugin(ifNotDevelopment('styles.[name].[chunkhash].css', 'styles.[name].css')),
      new HtmlWebpackPlugin({
        template: './index.html'
      }),
      new ExtendedDefinePlugin({
        APP_CONFIG: getAppConfig(env)
      }),
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
      // new BundleAnalyzerPlugin(),
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
      ifNotDevelopment(new webpack.optimize.CommonsChunkPlugin({
        // names: ['vendor', 'manifest'],
        name: 'app',
        async: true,
        children: true
      }))
      // ifNotDevelopment(new VendorChunkPlugin('vendor'))
    ]),
    resolve: {
      extensions: ['.js', '.jsx']
    },
    externals: {
      'analyticsjs': 'window.analytics',
      'stripejs': 'Stripe'
    },
    stats: 'errors-only',
    devServer: {
      stats: 'errors-only'
    }
  };

  if (env.debug) {
    console.log(config);
    debugger; // eslint-disable-line
  }

  return config
};

export default webpackConfig;
