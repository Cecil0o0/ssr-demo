/*
 * @Author: Cecil
 * @Last Modified by: Cecil
 * @Last Modified time: 2018-06-29 01:02:50
 * @Description App主入口文件，主要用于初始化Vue实例并挂载router与vuex
 */
'use strict'

import Vue from 'vue'
import App from '../App'
import { createRouter } from './router'
import { createStore } from './store'
import { CommonMixinsInstaller } from './mixins/common'

Vue.config.productionTip = true
Vue.config.devtools = true

export function createApp() {
  const router = createRouter()
  const store = createStore()

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  return { app, router, store }
}

// 通用全局混入

Vue.use(CommonMixinsInstaller)
