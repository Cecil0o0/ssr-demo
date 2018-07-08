/*
 * @Author: Cecil
 * @Last Modified by: Cecil
 * @Last Modified time: 2018-07-08 20:32:36
 * @Description dll plugin，为加快webpack打包速度
 */
'use strict'

import webpack from 'webpack'
import path from 'path'
import ProgressBarPlugin from 'progress-bar-webpack-plugin'

module.exports = {
  mode: 'production',

  target: 'web',

  entry: {
    vendor: [
      'vue',
      'vue-router',
      'vuex',
      'axios',
      '@babel/polyfill'
    ]
  },

  module: {
    rules: [
      {
        test: /^.js$/,
        use: 'babel-loader'
      }
    ]
  },

  resolve: {
    extensions: ['.js']
  },

  output: {
    path: __dirname + '/../static',
    filename: '[name].dll.js',
    library: '[name]_library',
    libraryTarget: 'var'
  },

  plugins: [
    new ProgressBarPlugin(),
    // 通过串联部分模块到单独闭包执行从而提升代码在浏览器端的初始执行速度（术语叫scope hoisting）
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DllPlugin({
      name: '[name]_library',
      path: path.resolve(__dirname, 'manifest.dll.json')
    })
  ]
}
