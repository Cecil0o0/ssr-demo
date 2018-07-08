/*
 * @Author: Cecil
 * @Last Modified by: Cecil
 * @Last Modified time: 2018-07-08 14:37:40
 * @Description 根据不同的config文件执行不同命令
 */
'use strict'

import { HOST_PLATFORM } from '../config'
import signale from 'signale'
import { shell_stdio } from './utils'
import fs from 'fs'
import yargs from 'yargs'
let args = yargs.argv

let DllFileIsExist = true

try {
  fs.statSync(__dirname + '/manifest.dll.json')
} catch (e) {
  DllFileIsExist = false
}

let buildDll = DllFileIsExist ? 'echo "已取缓存dll文件，如vendor文件有更新请自行执行npm run build:dll命令"' : 'npm run build:dll'

if (args.dev) {
  // dev mode
  shell_stdio(`${buildDll}&&npx webpack-dev-server --config build/webpack.dev.babel.js --color`)
} else {
  // prod mode
  if (HOST_PLATFORM === 'web-ssr') {
    shell_stdio(`${buildDll}&&npm run serve`)
  } else if (HOST_PLATFORM === 'web-standalone') {
    shell_stdio(`${buildDll}&&npm run build:client-standalone`)
  } else {
    signale.warn('目前只支持web-standalone以及web-ssr两种打包方式')
  }
}
