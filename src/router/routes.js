/*
 * @Author: Cecil
 * @Last Modified by: Cecil
 * @Last Modified time: 2018-06-24 23:11:02
 * @Description 路由文件
 */
'use strict'

export default [
  {
    path: '/',
    redirect: '/l-v1'
  },
  {
    path: '/l-v1',
    name: 'layout-v1',
    component: () => import('../layouts/Layout-v1.vue'),
    children: [
      {
        path: 'main',
        name: 'mainHeader',
        components: {
          header: () => import('../components/Header/index.vue')
        }
      }
    ]
  }
]
