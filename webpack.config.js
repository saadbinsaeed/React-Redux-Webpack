const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const IP = process.env.IP || '0.0.0.0';
const PORT = process.env.PORT || 9000;
const DEBUG = process.env.NODE_ENV !== 'production';
const PUBLIC_PATH = `/${process.env.PUBLIC_PATH || ''}/`.replace('//', '/');
const DashboardPlugin = require('webpack-dashboard/plugin');

const config = {
  devtool: DEBUG ? 'source-map' : false,

  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js',
  },
  resolve: {
    modules: ['src', 'node_modules'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `'${process.env.NODE_ENV}'`,
      'process.env.PUBLIC_PATH': `'${PUBLIC_PATH}'`,
    }),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'Happy Coding',
      template: path.join(__dirname, '/src/index.html'),
    }),

    // Uncomment this plugin to analyze the size of your bundle
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'static'
    // }),

    // Build speed will be a little slower due to this plugin
    new FaviconsWebpackPlugin('./public/favicon.png'),

    // Used for code splitting
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: '[name].[hash].js',
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.(css|scss)$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
      { test: /\.(graphql|gql)$/, loader: 'graphql-tag/loader' },
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.png$/, loader: 'url-loader?prefix=images/&limit=8000&mimetype=image/png' },
      { test: /\.jpg$/, loader: 'url-loader?prefix=images/&limit=8000&mimetype=image/jpeg' },
      { test: /\.(woff|woff2)$/,
        loader: 'url-loader?prefix=fonts/&limit=8000&mimetype=application/font-woff',
      },
      { test: /\.ttf$/, loader: 'file-loader?prefix=fonts/' },
      { test: /\.eot$/, loader: 'file-loader?prefix=fonts/' },
      { test: /\.svg/, loader: 'file-loader' },
    ],
  },
};

if (DEBUG) {
  config.entry =  {
    app: [
      'react-hot-loader/patch',
      `webpack-dev-server/client?http://${IP}:${PORT}/`,
      'webpack/hot/only-dev-server',
      path.join(__dirname, 'src'),
    ],
    vendor: ['react', 'react-dom', 'react-router'],
  },
  config.plugins = config.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new DashboardPlugin(),
  ]);
} else {
  config.entry =  {
    app: [
      path.join(__dirname, 'src'),
    ],
    vendor: ['react', 'react-dom', 'react-router'],
  },
  config.plugins = config.plugins.concat([
    new ProgressBarPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      output: {
        comments: false,
      },
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.html$|\.css$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ]);
}

module.exports = config;
