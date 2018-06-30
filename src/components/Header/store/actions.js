/*
 * @Author: Cecil
 * @Last Modified by: Cecil
 * @Last Modified time: 2018-06-30 17:35:35
 * @Description 无
 */
'use strict'
import { api } from '@/services'
const { blockchain$blocks } = api

export default {
  fetchBlocksData ({ commit }) {
    return blockchain$blocks({
      asdasd: '测试',
      dsad: [1,2,3,4,5],
      id: 1
    }, {
      timeout: 10000
    }).then(res => {
      commit('setBlocksData', res.data)
    })
  }
}
