'use strict'
import merge from 'webpack-merge'
import clientConf from './webpack.client.babel'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpackBundleAnalyer from 'webpack-bundle-analyzer'
const BundleAnalyzerPlugin = webpackBundleAnalyer.BundleAnalyzerPlugin
import pkg from '../package.json'
import env from '../config/env'
import yargs from 'yargs'
const argv = yargs.argv

function resolve(dir) {
  return path.join(__dirname, dir)
}

let plugins = [
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

if (argv.analyzing) {
  plugins = plugins.concat([
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      analyzerHost: '0.0.0.0',
      analyzerPort: 8888,
      logLevel: 'silent'
    })
  ])
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

  plugins
})
