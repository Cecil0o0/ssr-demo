'use strict'
const path = require('path')

const dev = {
  // 远程数据服务器
  dataServer: {
    schema: 'http',
    host: '0.0.0.0',
    port: 35555,
  },
  // 本地服务器
  host: '0.0.0.0',
  port: 35555,
  // Paths
  assetsRoot: path.resolve(__dirname, '../dist'),
  assetsSubDirectory: 'static/',
  assetsPublicPath: '/',
  proxyTable: {
    // 注意与生产环境中不一样
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

const prod = {
  // 远程数据服务器
  dataServer: {
    schema: 'http',
    host: 'localhost',
    port: 4000,
  },
  // 是否为mock数据
  isMock: false,
  // 代理表
  proxyTable: {
    '/api*': {
      target: 'http://qingf.me:8999',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/'
      }
    },
    '/mock*': {
      target: 'http://qingf.me:8999',
      changeOrigin: true,
      pathRewrite: {
        '^/mock': '/'
      }
    }
  }
}

module.exports = process.env.NODE_ENV === 'production' ? prod : dev
