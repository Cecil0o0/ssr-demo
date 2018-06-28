import webpack from 'webpack'
import merge from 'webpack-merge'
import clientConf from './webpack.client.babel'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import env from '../config/env'
import { PROJECT_ENV } from '../config'
import pkg from '../package.json'
import signale from 'signale'

if (PROJECT_ENV !== 'dev') {
  signale.error('请将config/index.js中PROJECT_ENV设置为dev后重试')
  process.exit(0)
}

export default merge(clientConf, {
  mode: 'development',

  devServer: {
    // 提供静态文件，使用copy-webpack-plugin代替
    contentBase: false,
    // HMR
    hot: true,
    port: env.port && Number(env.port),
    open: true,
    host: env.host,
    // 去掉客户端日志
    clientLogLevel: 'none',
    headers: Object.assign({
      'X-Server': 'webpack-dev-server'
    }, env.headers),
    // 设置apifallback配合router的history模式
    historyApiFallback: true,
    index: env.index,
    // 内联模式，与client建立一个websocket连接用于热重载
    inline: true,
    // 错误与警告都抛出在client端
    overlay: {
      warnings: true,
      errors: true
    },
    // 使用http-proxy-middleware的代理功能
    proxy: env.proxyTable,
    progress: true,
    // rewrite publicPath
    publicPath: env.assetsPublicPath
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Demo Dev' + pkg.version,
      assetsPath: env.assetsPublicPath + env.assetsSubDirectory,
      template: 'src/templates/standalone.index.template.html',
      filename: 'index.html',
      inject: 'body',
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true
      }
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
})
