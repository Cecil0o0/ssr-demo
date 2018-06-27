/*
 * @Author: Cecil
 * @Last Modified by: Cecil
 * @Last Modified time: 2018-06-28 00:44:04
 * @Description 客户端全局混入配置
 */
'use strict'
import { getTitle } from './utils'

const clientTitleMixin = {
  mounted() {
    const title = getTitle(this)
    if (title) {
      document.title = title
    }
  }
}

const mixins = [
  clientTitleMixin
]

export const ClientMixinsInstaller = {
  install (Vue) {
    mixins.forEach(m => Vue.mixin(m))
  }
}
