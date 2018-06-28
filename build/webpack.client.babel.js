'use strict'
import webpack from 'webpack'
import merge from 'webpack-merge'
import baseConf from './webpack.base.config'
import path from 'path'
import { assetsPath } from './utils'
import VueSSRClientPlugin from 'vue-server-renderer/client-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import FileManagerWebapckPlugin from 'filemanager-webpack-plugin'
import pkg from '../package.json'
import env from '../config/env'
import { SSR_CLIENT_MANIFEST } from '../config/constants'
import { PROJECT_ENV } from '../config'
import Argv from 'yargs'
const argv = Argv.argv

function resolve(dir) {
  return path.join(__dirname, dir)
}

let plugins = [
  new CleanWebpackPlugin(['dist'], {
    root: resolve('../')
  }),
  new CopyWebpackPlugin([
    {
      from: resolve('../static'),
      to: assetsPath('./'),
      ignore: ['.*']
    }
  ]),
  new webpack.DefinePlugin({
    'process.env': {
      'VUE_SSR': JSON.stringify('client')
    }
  })
]

if (argv.standalone) {
  plugins.push(
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
  )
} else if (argv.ssr) {
  plugins = plugins.concat([
    new VueSSRClientPlugin({
      filename: SSR_CLIENT_MANIFEST
    }),
    new FileManagerWebapckPlugin({
      onEnd: {
        move: [
          {
            source: resolve('../dist/' + SSR_CLIENT_MANIFEST),
            destination: resolve('../server/' + SSR_CLIENT_MANIFEST)
          }
        ]
      },
      onStart: {
        delete: [
          resolve('../server/' + SSR_CLIENT_MANIFEST)
        ]
      }
    })
  ])
}

module.exports = merge(baseConf, {
  mode: PROJECT_ENV === 'production' ? 'production' : 'development',

  entry: {
    client: resolve('../src/engine/entry-client.js')
  },

  target: 'web',

  output: {
    filename: assetsPath('js/[name].js?v=[hash:5]'),
    chunkFilename: assetsPath('js/[id].js?v=[hash:5]'),
    path: env.assetsRoot,
    publicPath: env.assetsPublicPath
  },

  optimization: {
    splitChunks: {
      chunks: 'initial',
      name: true,
      minChunks: Infinity
    }
  },

  plugins
})
