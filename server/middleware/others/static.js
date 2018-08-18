const serve = require('koa-static')
const { getProjectRoot } =  require('../../utils')
const path = require('path')

const root = path.resolve(getProjectRoot(), 'dist')

module.exports = function (app) {
  app.use(serve(root))
}
