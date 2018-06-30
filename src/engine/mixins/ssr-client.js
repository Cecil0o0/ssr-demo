/*
 * @Author: Cecil
 * @Last Modified by: Cecil
 * @Last Modified time: 2018-07-01 02:16:38
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

const autoStoreModuleMixin = {
  mounted () {
    if (this.$autoStoreModule) {
      const { name, moduleData } = this.$autoStoreModule
      !this.$store.state[name] && this.$store.registerModule(name, moduleData)
    }
  },
  destroyed () {
    this.$autoStoreModule && this.$store.unregisterModule(this.$autoStoreModule.name)
  }
}

const mixins = [clientTitleMixin, autoStoreModuleMixin]

export const ClientMixinsInstaller = {
  install(Vue) {
    mixins.forEach(m => Vue.mixin(m))
  }
}
