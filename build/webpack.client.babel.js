'use strict'
import webpack from 'webpack'
import merge from 'webpack-merge'
import baseConf from './webpack.base.config'
import path from 'path'
import { assetsPath } from './utils'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import env from '../config/env'
import { PROJECT_ENV } from '../config'

function resolve(dir) {
  return path.join(__dirname, dir)
}

export default merge(baseConf, {
  mode: PROJECT_ENV === 'production' ? 'production' : 'development',

  target: 'web',

  output: {
    filename: assetsPath('js/[name].js?v=[hash:5]'),
    chunkFilename: assetsPath('js/[id].js?v=[hash:5]'),
    path: env.assetsRoot,
    publicPath: env.assetsPublicPath
  },

  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: resolve('../')
    }),
    new CopyWebpackPlugin([
      {
        from: resolve('../static'),
        to: assetsPath('./'),
        ignore: ['.*']
      }
    ]),
    new webpack.DefinePlugin({
      'process.env': {
        'VUE_ENV': JSON.stringify('client')
      }
    })
  ]
})
