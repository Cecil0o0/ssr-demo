/*
 * @Author: Cecil
 * @Last Modified by: Cecil
 * @Last Modified time: 2018-06-29 00:43:21
 * @Description router拦截器
 */
'use strict'

export const routerBeforeEach = (to, from, next) => {
  // TODO 处理后台跳页面权限逻辑
  console.log(to, from)
  next()
}
