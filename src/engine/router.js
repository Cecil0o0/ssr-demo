/*
 * @Author: Cecil
 * @Last Modified by: Cecil
 * @Last Modified time: 2018-06-29 01:08:21
 * @Description Router工厂方法
 */
'use strict'

import Vue from 'vue'
import Router from 'vue-router'
import routes from '../routes'
import { routerBeforeEach } from '@@/config/interceptors'
import { ROUTER_BASE_CONFIG } from '@@/config/base'

Vue.use(Router)

export function createRouter() {
  const router = new Router(Object.assign({}, ROUTER_BASE_CONFIG, {
    routes
  }))

  // 全局路由钩子
  router.beforeEach(routerBeforeEach)
  return router
}
