/*
 * @Author: Cecil
 * @Last Modified by: Cecil
 * @Last Modified time: 2018-06-29 01:12:16
 * @Description 无
 */
'use strict'
import Koa from 'koa'
import KoaRouter from 'koa-router'
import KoaStatic from 'koa-static'
import c2k from 'koa-connect'
import proxy from 'http-proxy-middleware'
import path from 'path'
import signale from 'signale'
import { createBundleRenderer } from 'vue-server-renderer'
import env from '../config/env'
const { proxyTable } = env

// vue应用程序工厂函数
const template = require('fs').readFileSync(__dirname + '/../src/templates/ssr.index.template.html', 'utf-8')
// server-renderer
import clientManifest from './vue-ssr-client-manifest.json'
import serverBundleJSON from './vue-ssr-server-bundle.json'
const renderer = createBundleRenderer(serverBundleJSON, {
  runInNewContext: 'false',
  template,
  clientManifest
})

const app = new Koa()

const router = new KoaRouter()

Object.keys(proxyTable).forEach(key => {
  router.all(`${key}*`, c2k(proxy(proxyTable[key])))
})

router.get('*', async (context, next) => {
  await renderer.renderToString(context).then(html => {
    context.body = html
    context.type = '.html'
    next()
  }, err => {
    signale.error(err)
    let errStr
    try {
      if (err instanceof Error) {
        errStr = err.toString()
      } else {
        errStr = JSON.stringify(err)
      }
    } catch(e) {
      errStr = err.toString()
    }
    context.body = errStr
    next()
  })
})

app
  .use(KoaStatic(path.resolve(__dirname, '../dist'), {
    gzip: true
  }))
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(env.port, () => {
  signale.success('server is listening at 4000')
})
