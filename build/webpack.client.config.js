const merge = require('webpack-merge')
const baseConf = require('./webpack.base.config')
const path = require('path')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const config = require('../config')

module.exports = merge(baseConf, {
  entry: {
    client: path.resolve(__dirname, '../src/engine/entry-client.js')
  },

  target: 'web',

  output: {
    path: path.resolve(__dirname, '../dist', config.assetsSubDirectory),
    publicPath: config.assetsPublicPath
  },

  optimization: {
    splitChunks: {
      chunks: 'initial',
      name: true,
      minChunks: Infinity
    }
  },

  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../')
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: './',
        ignore: ['.*']
      }
    ]),
    new VueSSRClientPlugin()
  ]
})
