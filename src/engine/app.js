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
