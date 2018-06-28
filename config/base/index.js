/*
 * @Author: Cecil
 * @Last Modified by: Cecil
 * @Last Modified time: 2018-06-29 01:06:38
 * @Description 插件或组件等基础配置
 */
'use strict'
import env from '../env'
import { ENABLE_MOCK_DATA, PROJECT_ENV } from '../index'
const PREFIX = ENABLE_MOCK_DATA ? '/mock' : '/api'
const { schema, host, port} = env.dataServer

// router基础配置
export const ROUTER_BASE_CONFIG = {
  mode: 'history',
  transitionOnLoad: true,
  // experimetal
  // preload or on demand
  Client_AsyncData_Policy: 'ondemand'
}

// store基础配置
export const STORE_BASE_CONFIG = {
  strict: PROJECT_ENV === 'production'
}

// axios基础配置
export const AXIOS_BASE_CONFIG = {
  baseURL: `${schema}://${host}:${port}${PREFIX}`,
  timeout: 5000,
  headers: {
    'X-Client': 'Axios'
  }
}
