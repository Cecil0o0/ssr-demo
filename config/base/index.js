/*
 * @Author: Cecil
 * @Last Modified by: Cecil
 * @Last Modified time: 2018-06-30 15:31:47
 * @Description 插件或组件等基础配置
 */
'use strict'
import env from '../env'
import { MOCK_PREFIX, API_PREFIX } from '../constants'
import { ENABLE_MOCK_DATA, PROJECT_ENV, ENABLE_API_DEBUG } from '../index'
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
  baseURL: `${schema}://${host}:${port}${API_PREFIX}`,
  timeout: 5000,
  maxContentLength: 2000,
  headers: {
    'X-Client': 'Axios'
  }
}

// api基础配置
export const API_BASE_CONFIG = {
  mock: ENABLE_MOCK_DATA,
  mockBaseURL: `${schema}://${host}:${port}${MOCK_PREFIX}`,
  sep: '$',
  debug: ENABLE_API_DEBUG,
  PROJECT_ENV
}
