const { createBundleRenderer } = require('vue-server-renderer')
const fs = require('fs')
const path = require('path')
const { getProjectRoot } = require(path.resolve(__dirname, '../../../utils'))

const serverBundle = require('./vue-ssr-server-bundle.json')
const template = fs.readFileSync(
  path.resolve(getProjectRoot(), 'src/templates/ssr.index.template.html'),
  'utf8'
)
const clientManifest = require('./vue-ssr-client-manifest.json')

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false, // 推荐
  template, // （可选）页面模板
  clientManifest // （可选）客户端构建 manifest
})

module.exports = function(router) {
  router.get('*', async (ctx, next) => {
    const renderContext = { url: ctx.req.url }
    await promisify(renderer.renderToString)(renderContext).then(
      html => {
        ctx.body = html
        next()
      },
      err => {
        console.log(err)
      }
    )
  })
}

// nodeStandardCallback
function promisify(func) {
  return function() {
    let args = Array.prototype.slice.call(arguments)
    return new Promise((resolve, reject) => {
      try {
        func(...args, function(err, ...data) {
          if (err) return reject(err)
          resolve(data)
        })
      } catch (e) {
        reject(e)
      }
    })
  }
}
