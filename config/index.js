'use strict'
const path = require('path')

module.exports = {
  // Paths
  assetsRoot: path.resolve(__dirname, '../dist'),
  assetsSubDirectory: 'static',
  assetsPublicPath: process.env.NODE_ENV === 'development' ? '/' : '/',
}