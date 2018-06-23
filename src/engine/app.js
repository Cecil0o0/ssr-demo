import Vue from 'vue'
import App from '../App'
import { createRouter } from '../router'

export function createApp() {
  const router = createRouter()

  const app = new Vue({
    router,
    components: { App },
    template: '<App>'
  })

  return { app, router }
}
