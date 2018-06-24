const merge = require('webpack-merge')
const baseConf = require('./webpack.base.config')
const path = require('path')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

module.exports = merge(baseConf, {
  entry: {
    client: path.resolve(__dirname, '../src/engine/entry-client.js')
  },

  target: 'web',

  output: {
    path: path.resolve(__dirname, '../dist/static'),
    publicPath: '/static/'
  },

  optimization: {
    splitChunks: {
      chunks: 'initial',
      name: true,
      minChunks: Infinity
    }
  },

  plugins: [
    new VueSSRClientPlugin()
  ]
})
