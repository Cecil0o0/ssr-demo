import { createApp } from './app'

const { app, router, store } = createApp()

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {

  // client数据预期的逻辑
  // 在所有组件内守卫以及异步组件解析完毕之后执行
  router.beforeResolve((to, from, next) => {
    const matches = router.getMatchedComponents(to)
    const prevMatches = router.getMatchedComponents(from)

    const actived = matches.filter(c1 => {
      return !prevMatches.some(c2 => c1 === c2)
    })

    Promise.all(actived.map(v => {
      if (typeof v.asyncData === 'function') {
        return v.asyncData({
          router: to,
          store
        })
      } else {
        return Promise.resolve()
      }
    })).then(() => {
      next()
    }).catch(next)
  })

  app.$mount('#app')
})
