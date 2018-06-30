/*
 * @Author: Cecil
 * @Last Modified by: Cecil
 * @Last Modified time: 2018-06-30 17:49:10
 * @Description 打包vue-ssr-client-manifest.json入口文件
 */
'use strict'

import Vue from 'vue'
import { createApp } from './app'
import { ClientMixinsInstaller } from './mixins/ssr-client'

const { app, router, store } = createApp()

// 客户端初始化store
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

// 组件内钩子，保证路由更新重新获取组件数据，有点类似高阶组件的用法
Vue.mixin({
  beforeRouteUpdate (to, from, next) {
    const { asyncData } = this.$options
    if (typeof asyncData === 'function') {
      asyncData({
        store: this.$store,
        route: to
      }).then(next).catch(next)
    } else {
      next()
    }
  }
})

router.onReady(() => {
  app.$mount('#app')

  // !客户端在app挂载到dom后再混入以防止double-fetch
  // 挂载前获取异步数据并给到该组件dataPromise句柄
  Vue.mixin({
    beforeMount () {
      const { asyncData } = this.$options
      if (typeof asyncData === 'function') {
        this.dataPromise = asyncData({
          store: this.$store,
          route: this.$route
        })
      }
    }
  })
})

// 客户端全局混入

Vue.use(ClientMixinsInstaller)
