'use strict'
import merge from 'webpack-merge'
import clientConf from './webpack.client.babel'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import pkg from '../package.json'
import env from '../config/env'

function resolve(dir) {
  return path.join(__dirname, dir)
}

export default merge(clientConf, {
  entry: {
    client: [resolve('../src/engine/entries/standalone.js')]
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
      name: true,
      minChunks: Infinity
    }
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Demo v' + pkg.version,
      assetsPath: env.assetsPublicPath + env.assetsSubDirectory,
      template: 'src/templates/standalone.index.template.html',
      filename: 'index.html',
      inject: 'body',
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true
      }
    })
  ]
})
