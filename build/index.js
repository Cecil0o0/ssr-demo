/*
 * @Author: Cecil
 * @Last Modified by: Cecil
 * @Last Modified time: 2018-06-28 23:28:05
 * @Description 根据不同的config文件执行不同命令
 */
'use strict'

import { HOST_PLATFORM } from '../config'
import signale from 'signale'
import { shell_stdio } from './utils'

if (HOST_PLATFORM === 'web-ssr') {
  shell_stdio('npm run serve')
} else if (HOST_PLATFORM === 'web-standalone') {
  shell_stdio('npm run build:standalone')
} else {
  signale.warn('目前只支持web端standalone以及ssr')
}
