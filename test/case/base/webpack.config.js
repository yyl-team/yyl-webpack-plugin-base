'use strict'
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const extOs = require('yyl-os')
const { YylWebpackPluginBase } = require('../../../')
const IPlugin = require('./IPlugin')

const wConfig = {
  mode: 'development',
  context: __dirname,
  entry: {
    index: ['./src/entry/index/index.js']
  },
  output: {
    path: path.join(__dirname, './dist/'),
    filename: 'js/[name]-[chunkhash:8].js',
    publicPath: '/',
    chunkFilename: 'js/async_component/[name]-[chunkhash:8].js'
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
          name: 'images/[name]-[hash:8].[ext]'
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
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
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[chunkhash:8].css'
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './src/entry/index/index.html'),
      filename: 'html/index.html',
      inject: 'body',
      chunks: 'all'
    }),
    new IPlugin({
      context: __dirname
    })
  ],
  devServer: {
    static: [
      {
        directory: './dist',
        publicPath: '/'
      }
    ],
    port: 5000,
    hot: true,
    open: true,
    useLocalIp: true,
    openPage: 'http://127.0.0.1:5000/html/'
  }
}

module.exports = wConfig
