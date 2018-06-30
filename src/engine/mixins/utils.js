/*
 * @Author: Cecil
 * @Last Modified by: Cecil
 * @Last Modified time: 2018-07-01 01:52:46
 * @Description 全局混入类mixin helper
 */
'use strict'
import { isFunc } from '@/utils'

export const getTitle = function (vm) {
  const { title } = vm.$options
  if (title) {
    return isFunc(title) ? title.call(vm) : title
  }
}

export const getAutoStore = function (vm) {
  const { $autoStoreModule } = vm.$options
  if ($autoStoreModule) {
    return isFunc($autoStoreModule) ? $autoStoreModule.call(vm) : $autoStoreModule
  }
}
