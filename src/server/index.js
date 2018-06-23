import Koa from 'koa'
import KoaRouter from 'koa-router'
import signale from 'signale'

// vue应用程序工厂函数
import createApp from './entry-server'
const HTMLTemplate = require('fs').readFileSync(__dirname + '/../template/index.template.html', 'utf-8')
// server-renderer
const renderer = require('vue-server-renderer').createRenderer({
  template: HTMLTemplate
})

const app = new Koa()
const router = new KoaRouter()

router.get('*', async (context, next) => {
  createApp(context).then(app => {
    renderer.renderToString(app).then(html => {
      context.body = html
      next()
    })
  }, err => {
    context.body = typeof err === 'object' ? JSON.stringify(err) : err.toString()
    next()
  })
})

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(4000, () => {
  signale.success('server is listening at 4000')
})