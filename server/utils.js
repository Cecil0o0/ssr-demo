/*
 * @Author: Cecil
 * @Last Modified by: Cecil
 * @Last Modified time: 2018-07-07 15:17:29
 * @Description server端统一需要的工具文件
 */
'use strict'
import path from 'path'

export const getProjectRoot = () => {
  // 即编码过的
  return path.resolve(__dirname, '../')
}
