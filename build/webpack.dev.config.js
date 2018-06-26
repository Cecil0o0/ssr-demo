const webpack = require('webpack')
const merge = require('webpack-merge')
const clientConf = require('./webpack.client.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('../config')
const pkg = require('../package.json')

module.exports = merge(clientConf, {
  devServer: {
    // 提供静态文件，使用copy-webpack-plugin代替
    contentBase: false,
    // HMR
    hot: true,
    port: config.port && Number(config.port),
    open: true,
    host: config.host,
    // 去掉客户端日志
    clientLogLevel: 'none',
    headers: Object.assign({
      'X-Server': 'webpack-dev-server'
    }, config.headers),
    // 设置apifallback配合router的history模式
    historyApiFallback: true,
    index: config.index,
    // 内联模式，与client建立一个websocket连接用于热重载
    inline: true,
    // 错误与警告都抛出在client端
    overlay: {
      warnings: true,
      errors: true
    },
    // 使用http-proxy-middleware的代理功能
    proxy: config.proxyTable,
    progress: true,
    // rewrite publicPath
    publicPath: config.assetsPublicPath
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Demo Dev' + pkg.version,
      template: 'src/template/dev.index.template.html',
      filename: 'index.html',
      inject: 'body'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
})
