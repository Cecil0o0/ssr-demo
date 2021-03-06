/*
 * @Author: Cecil
 * @Last Modified by: Cecil
 * @Last Modified time: 2018-07-01 02:16:03
 * @Description 服务端全局混入配置
 */
'use strict'
import { getTitle } from './utils'

const serverTitleMixin = {
  created() {
    const title = getTitle(this)
    if (title) {
      this.$ssrContext.title = title
    }
  }
}

const assetPathMixin = {
  created() {
    // 当前静态资源路径
    if (this.$ssrContext) {
      this.$ssrContext.StaticBasePath = process.env.assetsPublicPath + process.env.assetsSubDirectory
    }
  }
}

const mixins = [serverTitleMixin, assetPathMixin]

export const ServerMixinsInstaller =  {
  install(Vue) {
    mixins.forEach(m => Vue.mixin(m))
  }
}
