/*
 * @Author: Cecil
 * @Last Modified by: Cecil
 * @Last Modified time: 2018-06-29 01:05:23
 * @Description Vuex工厂方法
 */
'use strict'

import Vue from 'vue'
import Vuex from 'vuex'
import { STORE_BASE_CONFIG } from '@@/config/base'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store(STORE_BASE_CONFIG)
}
