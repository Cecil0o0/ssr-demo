/*
 * @Author: Cecil
 * @Last Modified by: Cecil
 * @Last Modified time: 2018-06-28 00:49:25
 * @Description 服务端全局混入配置
 */
'use strict'
import { getTitle } from './utils'
import { assetsPublicPath, assetsSubDirectory } from '../../../config'

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
      this.$ssrContext.StaticBasePath = assetsPublicPath + assetsSubDirectory
    }
  }
}

const mixins = [serverTitleMixin, assetPathMixin]

export const ServerMixinsInstaller =  {
  install(Vue) {
    mixins.forEach(m => Vue.mixin(m))
  }
}
