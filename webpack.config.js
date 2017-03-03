'use strict';

const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const minPostfix = isProd ? '.min' : '';
const minify = isProd ? 'minimize' : '';
const hash = '[hash:7]';

const entry = './app/js/entry.js';
const devEntry = [
  'webpack/hot/dev-server',
  'webpack-hot-middleware/client?reload=true',
  entry,
];
const basePlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }
  }),
  new HTMLWebpackPlugin({
    title: 'Amaze UI Touch Starter Kit',
    template: 'app/index.html',
    // inject: false,
    prod: isProd,
    minify: isProd ? {
      removeComments: true,
      collapseWhitespace: true
    } : null,
  }),
];
const envPlugins = isProd ? [
  new ExtractTextPlugin(`css/style.${hash}${minPostfix}.css`, {
    allChunks: true
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),
  new webpack.BannerPlugin(`build: ${new Date().toString()}`),
] : [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  // @see https://www.npmjs.com/package/eslint-loader#noerrorsplugin
  new webpack.NoErrorsPlugin(),
];

module.exports = {
  debug: !isProd,
  devtool: !isProd ? '#eval' : null,

  entry: isProd ? entry : devEntry,

  output: {
    path: path.join(__dirname, 'dist'),
    filename: `js/app.${hash}${minPostfix}.js`,
    publicPath: '/'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: [
          'babel',
          // 'eslint',
        ],
        include: [
          path.join(__dirname, 'app/js'),
          path.resolve(__dirname, 'node_modules/amazeui-touch/js'),
        ]
      },
      {
        test: /\.scss/,
        loader: isProd ? ExtractTextPlugin.extract(
          'style',
          `css?${minify}!postcss!sass`
        ) : 'style!css?sourceMap!postcss!sass?sourceMap',
      },
      {
        test: /\.jpe?g$|\.gif$|\.png|\.ico$/,
        loaders: [
          'file?name=[path][name].[ext]&context=app',
          // 'image-webpack'
        ]
      },
      {
        test: /\.txt$|\.json$|\.webapp$/,
        loader: 'file?name=[path][name].[ext]&context=app'
      },
      {
        test: /\.svg$/,
        loader: 'url?mimetype=image/svg+xml&name=[name].[ext]'
      },
      {
        test: /\.woff$/,
        loader: 'url?mimetype=application/font-woff&name=[name].[ext]'
      },
      {
        test: /\.woff2$/,
        loader: 'url?mimetype=application/font-woff2&name=[name].[ext]'
      },
      {
        test: /\.[ot]tf$/,
        loader: 'url?mimetype=application/octet-stream&name=[name].[ext]'
      },
    ]
  },

  plugins: basePlugins.concat(envPlugins),

  // global mode
  // externals: {
  //   'react': 'React',
  //   'react-dom': 'ReactDOM',
  //   'react-addons-css-transition-group': ['React', 'addons', 'CSSTransitionGroup'],
  //   'amazeui-touch': 'AMUITouch',
  // },

  // loader config
  postcss: [autoprefixer({browsers: ['> 1%', 'last 2 versions', 'ie 10']})],

  // @see https://www.npmjs.com/package/image-webpack-loader
  imageWebpackLoader: {}
};
