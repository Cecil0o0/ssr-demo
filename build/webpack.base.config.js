/*
 * @Author: Cecil
 * @Last Modified by: Cecil
 * @Last Modified time: 2018-07-03 21:33:07
 * @Description 工程通用配置
 */
'use strict'
import webpack from 'webpack'
import path from 'path'
import { assetsPath } from './utils'
import VueLoaderPlugin from 'vue-loader/lib/plugin'
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin'
import env from '../config/env'
import { PROJECT_ENV } from '../config'

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
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.styl/,
        use: [
          'vue-style-loader',
          'css-loader',
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
    new VueLoaderPlugin(),
    // 友好的控制台提示插件
    new FriendlyErrorsPlugin()
  ]
}
