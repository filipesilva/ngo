const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ngToolsWebpack = require('@ngtools/webpack');
const CompressionPlugin = require('compression-webpack-plugin');


const src = path.resolve(__dirname, 'src/');
const dist = path.resolve(__dirname, 'dist/');

module.exports = {
  devtool: 'sourcemap',
  stats: {
    colors: true,
    hash: true,
    timings: true,
    chunks: false,
    chunkModules: false,
    children: false,
    modules: false,
    reasons: false,
    warnings: true,
    assets: false,
    version: false
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  entry: path.join(src, 'main.ts'),
  output: {
    path: dist,
    filename: '[name].bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(src, 'index.html')
    }),
    new ngToolsWebpack.AotPlugin({
      tsConfigPath: path.join(src, 'tsconfig.json')
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$/,
      threshold: 0,
      minRatio: 0.8
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: { screw_ie8: true },
      compress: { screw_ie8: true, warnings: false, pure_getters: true },
      sourceMap: true,
      comments: false
    })
  ],
  module: {
    rules: [
      { test: /\.css$/, loader: 'raw-loader' },
      { test: /\.html$/, loader: 'raw-loader' }
    ]
  },
  node: {
    fs: 'empty',
    global: false,
    crypto: 'empty',
    tls: 'empty',
    net: 'empty',
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
};
