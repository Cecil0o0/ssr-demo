/*
 * @Author: Cecil
 * @Last Modified by: Cecil
 * @Last Modified time: 2018-06-29 01:11:47
 * @Description 生产环境配置
 */
'use strict'
import path from 'path'

export default {
  // 远程数据服务器
  dataServer: {
    schema: 'http',
    host: 'localhost',
    port: 4000,
  },
  // http server
  host: '0.0.0.0',
  port: 4000,
  // 代理表
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
  // Paths
  assetsRoot: path.resolve(__dirname, '../../dist'),
  assetsSubDirectory: 'static/',
  assetsPublicPath: '/',
}
