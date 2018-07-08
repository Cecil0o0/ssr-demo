'use strict'
import path from 'path'
import env from '../config/env'
import { spawn, spawnSync } from 'child_process'
import { ENABLE_CSS_EXTRACT, HOST_PLATFORM } from '../config'
import ExtractCssChunks from 'extract-css-chunks-webpack-plugin'

export const assetsPath = function(_path = '') {
  return path.posix.join(env.assetsSubDirectory, _path)
}

// CLI中执行shell并继承父进程IO进行标准输入输出
export const shell_stdio = function(command) {
  spawn(command, [], {
    shell: true,
    stdio: 'inherit'
  })
}

// CLI中执行shell并继承父进程IO进行标准输入输出（同步执行）
export const shell_stdio_sync = function(command) {
  spawnSync(command, [], {
    shell: true,
    stdio: 'inherit'
  })
}

// 获取webpack入口文件
export const getEntryPath = function getEntryPath(filename) {
  return path.resolve(__dirname, '../src/engine/entries', filename)
}

// 生成style相关loader
export const generateStyleLoader = function generateStyleLoader(
  type = 'css'
) {
  let loaders = ['postcss-loader']

  switch (type) {
    case 'styl':
      loaders.push('stylus-loader')
      loaders.unshift('css-loader?importLoaders=2')
      break
    case 'css':
      loaders.unshift('css-loader?importLoaders=1')
      break
  }

  loaders.unshift(
    ENABLE_CSS_EXTRACT && HOST_PLATFORM === 'web-standalone'
      ? ExtractCssChunks.loader
      : 'vue-style-loader'
  )

  return loaders
}
