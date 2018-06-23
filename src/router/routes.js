/*
 * @Author: Cecil
 * @Last Modified by: Cecil
 * @Last Modified time: 2018-06-24 00:20:28
 * @Description 路由文件
 */
'use strict'

export default [
  {
    path: '/layout-v1',
    name: 'layout-v1',
    component: () => import('../components/Header.vue')
  }
]
