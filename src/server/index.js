import Koa from 'koa'
import KoaRouter from 'koa-router'
import KoaStatic from 'koa-static'
import c2k from 'koa-connect'
import proxy from 'http-proxy-middleware'
import path from 'path'
import signale from 'signale'
import { createBundleRenderer } from 'vue-server-renderer'

// vue应用程序工厂函数
const template = require('fs').readFileSync(__dirname + '/../template/index.template.html', 'utf-8')
// server-renderer
import clientManifest from '../../dist/static/vue-ssr-client-manifest.json'
import serverBundleJSON from '../engine/vue-ssr-server-bundle.json'
const renderer = createBundleRenderer(serverBundleJSON, {
  // runInNewContext: false,
  template,
  clientManifest
})

const app = new Koa()
const router = new KoaRouter()

router.all('/api*', c2k(proxy({
  target: 'http://qingf.me:8999',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/'
  }
})))

router.get('*', async (context, next) => {
  await renderer.renderToString(context).then(html => {
    console.log(html)
    context.body = html
    context.type = '.html'
    next()
  }, err => {
    let errStr
    try {
      errStr = JSON.stringify(err)
    } catch(e) {
      errStr = err.toString()
    }
    context.body = errStr
    next()
  })
})

app
  .use(KoaStatic(path.resolve(__dirname, '../../dist'), {
    gzip: true
  }))
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(4000, () => {
  signale.success('server is listening at 4000')
})
