/*
 * @Author: Cecil
 * @Last Modified by: Cecil
 * @Last Modified time: 2018-06-24 23:25:49
 * @Description 无
 */
'use strict'

import state from './state'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

export default {
  namespaced: true,
  state: state(),
  actions,
  mutations,
  getters
}
