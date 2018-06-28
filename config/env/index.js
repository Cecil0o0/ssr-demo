'use strict'
let envConfig = ''

import { PROJECT_ENV } from '../index'

if (PROJECT_ENV === 'dev') {
  envConfig = require('./dev').default
} else if (PROJECT_ENV === 'tes') {
  envConfig = require('./tes').default
} else if (PROJECT_ENV === 'pre') {
  envConfig = require('./pre').default
} else if (PROJECT_ENV === 'production') {
  envConfig = require('./prod').default
} else {
  console.error('ENV变量错误，请检查')
}

export default envConfig
