/*
 * @Author: Cecil
 * @Last Modified by: Cecil
 * @Last Modified time: 2018-07-08 18:55:54
 * @Description 工程通用配置
 */
'use strict'
import webpack from 'webpack'
import path from 'path'
import { assetsPath, generateStyleLoader } from './utils'
import VueLoaderPlugin from 'vue-loader/lib/plugin'
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin'
import ProgressBarPlugin from 'progress-bar-webpack-plugin'
import ExtractCssChunks from 'extract-css-chunks-webpack-plugin'
import env from '../config/env'
import { PROJECT_ENV, ENABLE_CSS_EXTRACT, HOST_PLATFORM } from '../config'
import HappyPack from 'happypack'
import os from 'os'
const happyThreadPool = HappyPack.ThreadPool({
  size: os.cpus().length
})
import { argv } from 'yargs'

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

const webpackConf = {
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
        include: [
          resolve('src'),
          resolve('node_modules/webpack-dev-server/client')
        ]
      },
      {
        test: /\.css$/,
        use: generateStyleLoader()
      },
      {
        test: /\.styl/,
        use: generateStyleLoader('styl')
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
        assetsSubDirectory: JSON.stringify(env.assetsSubDirectory),
        assetsPublicPath: JSON.stringify(env.assetsPublicPath),
        assetsRoot: JSON.stringify(env.assetsRoot),
        NODE_ENV: JSON.stringify(PROJECT_ENV)
      }
    }),
    new webpack.DllReferencePlugin({
      manifest: require(__dirname + '/manifest.dll.json'),
      sourceType: 'var'
    }),
    new ProgressBarPlugin(),
    new VueLoaderPlugin(),
    // happypack多线程打包
    new HappyPack({
      id: 'js',
      threadPool: happyThreadPool,
      loaders: ['babel-loader']
    })
  ]
}

if (ENABLE_CSS_EXTRACT && HOST_PLATFORM === 'web-standalone') {
  webpackConf.plugins.unshift(
    new ExtractCssChunks({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: assetsPath('css/[name].[hash:5].css'),
      chunkFilename: assetsPath('css/[id].[hash:5].css')
    })
  )
}

if (PROJECT_ENV === 'production') {
  // 通过串联部分模块到单独闭包执行从而提升代码在浏览器端的初始执行速度（术语叫scope hoisting）
  webpackConf.plugins.push(new webpack.optimize.ModuleConcatenationPlugin())
}

if (!argv.analyzing) {
  // 友好的控制台提示插件
  webpackConf.plugins.push(new FriendlyErrorsPlugin())
}

export default webpackConf
