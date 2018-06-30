/*
 * @Author: Cecil
 * @Last Modified by: Cecil
 * @Last Modified time: 2018-06-30 17:49:37
 * @Description api构建类，对api做一层封装用于后期扩展
 */
'use strict'
import { assert } from '@/utils'
import axios from '@/plugins/axios'
import {
  isNumber,
  isString,
  isBoolean,
  isObject,
  isArray,
  isFunc
} from '@/utils'
import { API_BASE_CONFIG } from '@@/config/base'
import API_MODULES from '../modules'

class apiBuilder {
  constructor(options) {
    this.api = {}
    this.build(options)
  }

  build({
    sep = '$',
    modules = {},
    mock = false,
    debug = false,
    PROJECT_ENV = 'production',
    mockBaseURL = ''
  }) {
    Object.keys(modules).map(moduleName => {
      this._moduleBuild({
        scope: moduleName,
        mock,
        sep,
        $module: modules[moduleName],
        debug,
        PROJECT_ENV,
        mockBaseURL
      })
    })
  }

  _moduleBuild({
    scope,
    sep = '$',
    $module = {},
    mock = false,
    debug = false,
    PROJECT_ENV = 'production',
    mockBaseURL = ''
  }) {
    Object.keys($module).forEach(apiName => {
      const { path, mockPath, method, desc, params_model } = $module[
        apiName
      ]
      let uniqueIf = `${scope}${sep}${apiName}`,
        apiPath = mock ? mockPath || path : path
      // 通过配置全局ENABLE_API_DEBUG开关来开启
      debug &&
        console.info(
          `服务层数据接口${uniqueIf}，${
            desc ? '接口描述是' + desc : '无接口描述'
          }`
        )
      debug &&
        assert(
          apiPath.indexOf('/') === 0,
          `${apiPath}：接口路径path首字符应为'/'`
        )
      this.api[uniqueIf] = function (outData, outAxiosOptions) {
        // 默认参数组装
        let defaultData = !params_model
          ? {}
          : Object.keys(params_model).map(key => {
              const { require } = params_model[key]
              const defaultVal = params_model[key].default
              return {
                [key]: defaultVal ? defaultVal : require ? '' : null
              }
            })

        // 参数截取覆盖
        let data = Object.assign({}, defaultData, outData)

        if (PROJECT_ENV !== 'production') {
          // 参数校验（如不符直接抛出错误）
          params_model &&
            Object.keys(params_model).forEach(key => {
              _validate(key, data[key], params_model, uniqueIf)
            })
        }

        return axios(
          _normalizeOptions(
            Object.assign(
              {
                url: apiPath,
                method: method || 'GET'
              },
              mockBaseURL
                ? {
                    baseURL: mockBaseURL
                  }
                : {},
              outAxiosOptions
            ),
            data
          )
        )
      }
    })
  }
}

function _normalizeOptions(options, data) {
  // 适配RESTFUL API规范
  let keys = Object.keys(data)
  for(let i = 0, length = keys.length; i < length; i ++) {
    let key = keys[i]
    let val = data[key]
    let regex = new RegExp(`:${key}`)
    if (regex.test(options.url)) {
      options.url = options.url.replace(regex, val)
      delete data[key]
    }
  }

  if (options.method === 'POST') {
    options.data = data
  } else if (options.method === 'GET') {
    options.params = data
  }

  return options
}

function _validate(key, value, params_model, uniqueIf) {
  const { type, require, validator } = params_model[key]

  let typeCheck = true
  if (type) {
    switch (type) {
      case Number:
        isNumber(value) || (typeCheck = false)
        break
      case String:
        isString(value) || (typeCheck = false)
        break
      case Object:
        isObject(value) || (typeCheck = false)
        break
      case Array:
        isArray(value) || (typeCheck = false)
        break
      case Boolean:
        isBoolean(value) || (typeCheck = false)
        break
      default:
        throw new Error(`${uniqueIf}数据接口params_model的type值无效`)
    }
  }

  if (typeCheck)
    throw new Error(
      `${uniqueIf}数据接口参数${key}类型校验失败。当前值为${value}，类型为${type}`
    )

  if (require && !value)
    throw new Error(`${uniqueIf}数据接口参数${key}为必传。`)

  if (isFunc(validator) && !validator())
    throw new Error(
      `${uniqueIf}数据接口参数${key}为未通过validator。`
    )
}

export default new apiBuilder({
  modules: API_MODULES,
  ...API_BASE_CONFIG
})['api']
