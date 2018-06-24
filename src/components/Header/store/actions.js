/*
 * @Author: Cecil
 * @Last Modified by: Cecil
 * @Last Modified time: 2018-06-24 23:29:53
 * @Description 无
 */
'use strict'
import { blocksData } from '@/api'

export default {
  fetchBlocksData ({ commit }) {
    return blocksData().then(res => {
      commit('setBlocksData', res.data)
    })
  }
}
