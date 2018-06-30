/*
 * @Author: Cecil
 * @Last Modified by: Cecil
 * @Last Modified time: 2018-06-30 13:56:47
 * @Description 全局配置开关
 */
'use strict'

// 兼容多平台，web-standalone/web-ssr/wxmp/alimp/native/快应用
// 支持web-standalone以及web-ssr
export const HOST_PLATFORM = 'web-ssr'

// 工程环境配置，dev/test/pre/production
export const PROJECT_ENV = 'dev'

// 访问mock数据（具体end-point请移步./env/分环境查阅）
export const ENABLE_MOCK_DATA = false

// TODO 是否开启页面监控
export const ENABLE_MONITOR = false

// TODO 是否开启控制台错误统计与上报
export const ENABLE_ERROR_STATISTIC = false

// TODO 是否开启页面性能分析
export const ENABLE_PERFORMANCE_STATISTIC = false

// TODO 是否开启请求参数打印（主要用于ssr服务端asyncData）
export const ENABLE_REQ_LOG = false

// TODO 是否开启响应参数打印（主要用于ssr服务端asyncData）
export const ENABLE_RES_LOG = false

// 是否开启api调试
export const ENABLE_API_DEBUG = true

// TODO 是否使用异步组件懒加载
export const ENABLE_ASYNC_COM = true
