import { createApp } from '../engine/app'

// context值请参考https://wohugb.gitbooks.io/koajs/content/document/context.html
export default context => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()

    // 设置服务端的route
    router.push(context.req.url)

    // 等到 router 将可能的异步组件和钩子函数解析完
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()

      // 如果未匹配到任何组件则返回404
      if (!matchedComponents.length && router.currentRoute.path !== '/') {
        return reject({
          code: 404,
          errormsg: '路由未找到对应组件'
        })
      }

      Promise.all(matchedComponents.map(c => {
        if (typeof c.asyncData === 'function') {
          return c.asyncData({
            router,
            store
          })
        } else {
          return Promise.resolve()
        }
      })).then(() => {
        context.state = store.state
        // 异步数据已准备就绪，可以渲染app
        resolve(app)
      }, reject).catch(reject)
    }, reject)
  })
}
