'use strict'
import path from 'path'
import env from '../config/env'
import { spawn } from 'child_process'

export const assetsPath = function (_path = '') {
  return path.posix.join(env.assetsSubDirectory, _path)
}

// CLI中执行shell并继承父进程IO进行标准输入输出
export const shell_stdio = function (command) {
  spawn(command, [], {
    shell: true,
    stdio: 'inherit'
  })
}

// 获取webpack入口文件
export const getEntryPath = function getEntryPath(filename) {
  return path.resolve(__dirname, '../src/engine/entries', filename)
}
