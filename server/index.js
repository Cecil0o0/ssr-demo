/*
 * @Author: Cecil
 * @Last Modified by: Cecil
 * @Last Modified time: 2018-07-08 23:14:25
 * @Description 无
 */
'use strict'
import '@babel/polyfill'
import Koa from 'koa'
import signale from 'signale'
import env from '../config/env'
import RouterMDW from './middleware/router'
import { KoaStaticMDW } from './middleware/others'

const app = new Koa()

// 静态资源中间件（建议用CDN托管）
KoaStaticMDW(app)

// 路由中间件
RouterMDW(app)

app.listen(env.port, () => {
  signale.success('server is listening at '+ env.port)
})
