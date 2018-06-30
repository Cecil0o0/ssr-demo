/*
 * @Author: Cecil
 * @Last Modified by: Cecil
 * @Last Modified time: 2018-06-30 16:20:36
 * @Description 开发环境配置
 */
'use strict'
import path from 'path'

export default {
  // 远程数据服务器
  dataServer: {
    schema: 'http',
    host: '0.0.0.0',
    port: 35555,
  },
  // http server
  host: '0.0.0.0',
  port: 35555,
  // Paths
  assetsRoot: path.resolve(__dirname, '../../dist'),
  assetsSubDirectory: 'static/',
  assetsPublicPath: '/',
  // 代理
  proxyTable: {
    '/api': {
      target: 'http://qingf.me:8999',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/'
      }
    },
    '/mock': {
      target: 'http://qingf.me:8999',
      changeOrigin: true,
      pathRewrite: {
        '^/mock': '/'
      }
    }
  },
  // http响应头
  headers: {},
  // 入口文件名称
  index: 'index.html'
}
