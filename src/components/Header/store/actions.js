/*
 * @Author: Cecil
 * @Last Modified by: Cecil
 * @Last Modified time: 2018-06-26 01:49:11
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
