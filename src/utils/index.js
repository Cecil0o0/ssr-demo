/*
 * @Author: Cecil
 * @Last Modified by: Cecil
 * @Last Modified time: 2018-06-30 16:59:11
 * @Description 工具类
 */
'use strict'

// 断言
export const assert = function Assert(exp, errmsg) {
  !exp && console.log(`${errmsg}\r\n`)
}

// 类型判断curry
const isType = type => val => typeof val === type

export const isNumber = isType('number')
export const isString = isType('string')
export const isObject = isType('object')
export const isArray = isType('array')
export const isUndef = isType('undefined')
export const isBool = isType('boolean')
export const isFunc = isType('function')

// deepSet

export const LeftObjectDeepSet = function LeftObjectDeepSet(
  o1 = {},
  o2 = {}
) {
  for (let key in o1) {
    if (o1.hasOwnProperty(key) && o2.hasOwnProperty(key)) {
      if (o1[key] instanceof Array && o2[key] instanceof Array) {
        let length =
          (o1[key].length < o2[key].length
            ? o1[key].length
            : o2[key].length) || 0
        for (let i = 0; i < length; i++) {
          if (
            typeof o1[key][i] !== 'object' &&
            typeof o2[key][i] !== 'object'
          ) {
            o1[key][i] = o2[key][i]
          } else {
            LeftObjectDeepSet(o1[key][i], o2[key][i])
          }
        }
      } else if (o1[key] instanceof Date && o2[key] instanceof Date) {
        o1[key] = new Date(o2[key].getTime())
      } else if (
        typeof o1[key] === 'object' &&
        typeof o2[key] === 'object'
      ) {
        LeftObjectDeepSet(o1[key], o2[key])
      } else {
        o1[key] = o2[key]
      }
    }
  }
  return o1
}
