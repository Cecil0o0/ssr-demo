const KoaRouter = require('koa-router')
const router = new KoaRouter()
const ssrMDW = require('./ssr')

module.exports = function(app) {
  ssrMDW(router)
  app.use(router.routes()).use(router.allowedMethods())
}
