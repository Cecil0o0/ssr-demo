import { createApp } from '../engine/app'

// context值请参考https://wohugb.gitbooks.io/koajs/content/document/context.html
export default context => {
  return new Promise((resolve, reject) => {
    const { app, router } = createApp(context)

    // 设置服务端的route
    router.push(context.req.url)

    // 等到 router 将可能的异步组件和钩子函数解析完
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()

      // 如果未匹配到任何组件则返回404
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }

      // 内容已准备就绪，可以渲染app
      resolve(app)
    }, reject)
  })
}
