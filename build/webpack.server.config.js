const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConf = require('./webpack.base.config')
const nodeExternals = require('webpack-node-externals')
const path = require('path')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const FileManagerWebapckPlugin = require('filemanager-webpack-plugin')

const SSRServerBundle = 'vue-ssr-server-bundle.json'

module.exports = merge(baseConf, {
  entry: {
    server: path.resolve(__dirname, '../src/engine/entry-server.js')
  },

  // in order to ignore built-in modules like path, fs, etc.
  target: 'node',

  output: {
    path: path.resolve(__dirname, '../server'),
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },

  externals: nodeExternals({
    // 不要外置化 webpack 需要处理的依赖模块。
    // 你可以在这里添加更多的文件类型。例如，未处理 *.vue 原始文件，
    // 你还应该将修改 `global`（例如 polyfill）的依赖模块列入白名单
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
      filename: SSRServerBundle
    }),
    new FileManagerWebapckPlugin({
      onStart: {
        delete: [
          path.resolve(__dirname, '../server', SSRServerBundle)
        ]
      }
    })
  ]
})
