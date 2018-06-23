import Router from 'vue-router'
import routes from './routes'

export function createRouter() {
  return new Router({
    mode: 'history',
    routes
  })
}
