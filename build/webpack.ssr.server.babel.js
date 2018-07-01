'use strict'
import webpack from 'webpack'
import merge from 'webpack-merge'
import baseConf from './webpack.base.config'
import nodeExternals from 'webpack-node-externals'
import path from 'path'
import VueSSRServerPlugin from 'vue-server-renderer/server-plugin'
import FileManagerWebapckPlugin from 'filemanager-webpack-plugin'
import { SSR_SERVER_BUNDLE } from '../config/constants'
import { PROJECT_ENV } from '../config'

export default merge(baseConf, {
  mode: PROJECT_ENV === 'production' ? 'production' : 'development',

  entry: path.resolve(__dirname, '../src/engine/ssr-server.js'),

  // in order to ignore built-in modules like path, fs, etc.
  target: 'node',

  output: {
    path: path.resolve(__dirname, '../server'),
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },

  externals: nodeExternals({
    // 不要外置化 webpack 需要处理的依赖模块
    whitelist: /\.css$/
  }),

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'VUE_SSR': JSON.stringify('server')
      }
    }),
    // 输出服务端bundle
    new VueSSRServerPlugin({
      filename: SSR_SERVER_BUNDLE
    }),
    new FileManagerWebapckPlugin({
      onStart: {
        delete: [
          path.resolve(__dirname, '../server', SSR_SERVER_BUNDLE)
        ]
      }
    })
  ]
})
