'use strict'
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const extOs = require('yyl-os')
const { YylWebpackPluginBase } = require('../../../')

// + plugin options
const iPluginOption = {
  context: __dirname,
  name: 'yylBase'
}
// - plugin options

const wConfig = {
  mode: 'development',
  context: __dirname,
  entry: {
    index: ['./src/entry/index/index.js']
  },
  output: {
    path: path.join(__dirname, './dist/js'),
    filename: '[name]-[chunkhash:8].js',
    chunkFilename: 'async_component/[name]-[chunkhash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader'
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 0,
          name: '[name]-[hash:8].[ext]'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    alias: {
      jsDest: './dist/js'
    }
  },
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new YylWebpackPluginBase(iPluginOption),
    new HtmlWebpackPlugin({
      template: './src/entry/index/index.html',
      filename: '../html/index.html',
      chunks: 'all'
    })
  ],
  devServer: {
    contentBase: './dist',
    compress: true,
    port: 5000,
    writeToDisk: true,
    async after() {
      await extOs.openBrowser('http://127.0.0.1:5000/html/')
    }
  }
}

module.exports = wConfig
