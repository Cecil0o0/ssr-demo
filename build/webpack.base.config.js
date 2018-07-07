/*
 * @Author: Cecil
 * @Last Modified by: Cecil
 * @Last Modified time: 2018-07-07 21:12:27
 * @Description 工程通用配置
 */
'use strict'
import webpack from 'webpack'
import path from 'path'
import { assetsPath } from './utils'
import VueLoaderPlugin from 'vue-loader/lib/plugin'
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin'
import ProgressBarPlugin from 'progress-bar-webpack-plugin'
import env from '../config/env'
import { PROJECT_ENV } from '../config'
import HappyPack from 'happypack'
import os from 'os'
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length})

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: true
  }
})

export default {
  context: path.resolve(__dirname, '../'),

  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
      '@@': resolve('./')
    }
  },

  module: {
    rules: [
      createLintingRule(),
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.js$/,
        use: 'happypack/loader?id=js',
        include: [resolve('src'), resolve('node_modules/webpack-dev-server/client')],
        exclude: ['/node_modules/']
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader?importLoaders=1',
          'postcss-loader'
        ]
      },
      {
        test: /\.styl/,
        use: [
          'vue-style-loader',
          'css-loader?importLoaders=2',
          'postcss-loader',
          'stylus-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('img/[name].[ext]?v=[hash:7]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('fonts/[name].[ext]?v=[hash:7]')
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'assetsSubDirectory': JSON.stringify(env.assetsSubDirectory),
        'assetsPublicPath': JSON.stringify(env.assetsPublicPath),
        'assetsRoot': JSON.stringify(env.assetsRoot),
        'NODE_ENV': JSON.stringify(PROJECT_ENV)
      }
    }),
    new webpack.DllReferencePlugin({
      manifest: require(__dirname + '/manifest.dll.json'),
      sourceType: 'var'
    }),
    new ProgressBarPlugin(),
    new VueLoaderPlugin(),
    // 友好的控制台提示插件
    new FriendlyErrorsPlugin(),
    // 通过串联部分模块到单独闭包执行从而提升代码在浏览器端的初始执行速度（术语叫scope hoisting）
    new webpack.optimize.ModuleConcatenationPlugin(),
    // happypack多线程打包
    new HappyPack({
      id: 'js',
      threadPool: happyThreadPool,
      loaders: [ 'babel-loader' ],
      debug: true
    })
  ]
}
