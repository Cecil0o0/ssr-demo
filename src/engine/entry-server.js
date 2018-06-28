/*
 * @Author: Cecil
 * @Last Modified by: Cecil
 * @Last Modified time: 2018-06-29 01:03:58
 * @Description 打包vue-ssr-server-bundle.json入口文件
 */
'use strict'

import Vue from 'vue'
import { createApp } from './app'
import { ServerMixinsInstaller } from './mixins/ssr-server'

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
        // 服务端会将store的状态序列化为字符串赋值window.__INITIAL__STATE嵌入到渲染的模板中
        context.state = store.state
        // 异步数据已准备就绪，可以渲染app
        resolve(app)
      }, reject).catch(reject)
    }, reject)
  })
}

// 服务端全局混入

Vue.use(ServerMixinsInstaller)
