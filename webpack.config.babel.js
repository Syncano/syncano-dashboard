import { resolve } from 'path';
import webpack, { ContextReplacementPlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import ExtendedDefinePlugin from 'extended-define-webpack-plugin';
import InlineManifestWebpackPlugin from 'inline-manifest-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import { getIfUtils, removeEmpty } from 'webpack-config-utils';
import S3Plugin from 'webpack-s3-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import { getAppConfig, getS3Config } from './webpack-helpers';
import packageJSON from './package.json';


const webpackConfig = (env = { development: true }) => {
  const VENDOR_LIBS = Object.keys(packageJSON.dependencies);
  const { ifDevelopment, ifNotDevelopment } = getIfUtils(env);
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
      ],
      vendor: VENDOR_LIBS
    },
    output: {
      filename: ifNotDevelopment('bundle.[name].[chunkhash].js', 'bundle.[name].js'),
      path: resolve('dist'),
      pathinfo: ifDevelopment()
    },
    devtool: ifNotDevelopment('source-map', 'eval'),
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js(|x)$/,
          use: 'eslint-loader',
          exclude: /node_modules/
        },
        {
          test: /\.js(|x)$/,
          use: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.json$/,
          use: 'json-loader'
        },
        {
          test: /\.css$/,
          use: extractCSS.extract({ fallback: 'style-loader', use: 'css-loader' })
        },
        {
          test: /\.sass$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [{
              loader: 'css-loader'
            }, {
              loader: 'sass-loader',
              options: {
                includePaths: [
                  resolve(__dirname, './node_modules/compass-mixins/lib'),
                  resolve(__dirname, './src/assets/sass')
                ]
              }
            }]
          })
        },
        {
          test: /\.(eot|ttf|svg|woff|woff2)$/,
          use: 'file-loader?name=./fonts/[name]-[hash].[ext]',
          include: /fonts/
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/,
          use: 'url-loader'
        }
      ]
    },
    plugins: removeEmpty([
      ifDevelopment(new ProgressBarPlugin()),
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
      ifNotDevelopment(...[
        new InlineManifestWebpackPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
          async: true,
          children: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
          names: ['vendor', 'manifest'],
          minChunks: Infinity
        }),
        new ContextReplacementPlugin(/brace[\\\/]mode$/, /^\.\/(javascript|html|python|ruby|golang|swift|php|django|json|css|text)$/),
        new ContextReplacementPlugin(/brace[\\\/]theme$/, /^\.\/(tomorrow)$/),
        new ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en-uk|en-us|en-au)$/),
        new FaviconsWebpackPlugin('./assets/img/syncano-symbol.svg'),
        new CompressionPlugin({
          asset: '[path].gz[query]',
          algorithm: 'gzip',
          test: /\.js$|\.css$/,
          threshold: 10240,
          minRatio: 0.8
        })
      ]),
      env.deploy && new S3Plugin(getS3Config(env))
    ]),
    resolve: {
      extensions: ['.js', '.jsx']
    },
    externals: {
      analyticsjs: 'window.analytics',
      stripejs: 'Stripe'
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

  return config;
};

export default webpackConfig;
