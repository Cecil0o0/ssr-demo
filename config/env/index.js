'use strict'
let envConfig = ''

import { PROJECT_ENV } from '../index'
import dev from './dev'
import tes from './tes'
import pre from './pre'
import prod from './prod'

if (PROJECT_ENV === 'dev') {
  envConfig = dev
} else if (PROJECT_ENV === 'tes') {
  envConfig = tes
} else if (PROJECT_ENV === 'pre') {
  envConfig = pre
} else if (PROJECT_ENV === 'production') {
  envConfig = prod
} else {
  console.error('ENV变量错误，请检查')
}

export default envConfig
