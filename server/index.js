/*
 * @Author: Cecil
 * @Last Modified by: Cecil
 * @Last Modified time: 2018-07-08 23:14:25
 * @Description 无
 */
'use strict'
require('@babel/polyfill')
const Koa = require('koa')
const signale = require('signale')
const env = { port: 3333 }
const RouterMDW = require('./middleware/router')
const { KoaStaticMDW } = require('./middleware/others')

const app = new Koa()

// 静态资源中间件（建议用CDN托管）
KoaStaticMDW(app)

// 路由中间件
RouterMDW(app)

app.listen(env.port, () => {
  signale.success('server is listening at ' + env.port)
})
