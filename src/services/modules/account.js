/*
 * @Author: Cecil
 * @Last Modified by: Cecil
 * @Last Modified time: 2018-06-30 16:04:05
 * @Description account模块api定义
 */
'use strict'

export const login = {
  path: '/login',
  method: 'post',
  desc: '通用登录接口',
  params_model: {
    phone: {
      type: Number,
      require: true,
      validator: (rule, value) => {
        console.log(rule, value)
      },
      default: '13758715359'
    },
    password: {
      type: String,
      require: true,
      default: '123456'
    }
  }
}
