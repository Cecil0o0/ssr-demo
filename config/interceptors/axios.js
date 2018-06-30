/*
 * @Author: Cecil
 * @Last Modified by: Cecil
 * @Last Modified time: 2018-06-30 16:22:05
 * @Description axios拦截器
 */
'use strict'
import { isUndef } from '@/utils'

// 请求成功
export const reqFulfilled = function(config) {
  // TODO 处理请求打印
  // TODO 处理权限
  // TODO 请求监控
  console.log('req success', config)
  return config
}

// 请求失败
export const reqRejected = function(error) {
  // TODO 如何处理请求发起失败，如断网
  console.log('req error', error)
  return Promise.reject(error)
}

// 响应成功
export const resFulfilled = function(response) {
  // TODO 处理响应打印
  // TODO 处理响应HTTP响应头状态，无权限时跳登录或错误页
  if (response.status !== 200) {
    isUndef(response.config.notShowDefaultError) && console.error('默认的错误处理')
  }
  console.log('res success', response)
  return response
}

// 响应失败
export const resRejected = function(error) {
  // TODO 如超时等
  console.log('res error', error)
  return Promise.reject(error)
}
