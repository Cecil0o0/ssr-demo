/*
 * @Author: Cecil
 * @Last Modified by: Cecil
 * @Last Modified time: 2018-06-27 00:29:32
 * @Description 该文件只用于server端的mixin
 */
'use strict'

const assetsPath = (process.env.VUE_SSR === 'server' ? {
  created () {
    this.$ssrContext.assetsPath = process.env.assetsPublicPath + process.env.assetsSubDirectory
  }
} : {})

export {
  assetsPath
}
