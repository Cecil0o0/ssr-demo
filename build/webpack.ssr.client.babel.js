'use strict'
import merge from 'webpack-merge'
import clientConf from './webpack.client.babel'
import path from 'path'
import VueSSRClientPlugin from 'vue-server-renderer/client-plugin'
import FileManagerWebapckPlugin from 'filemanager-webpack-plugin'
import { SSR_CLIENT_MANIFEST } from '../config/constants'
import { getEntryPath } from './utils'

function resolve(dir) {
  return path.join(__dirname, dir)
}

let plugins = [
  new VueSSRClientPlugin({
    filename: SSR_CLIENT_MANIFEST
  }),
  new FileManagerWebapckPlugin({
    onEnd: {
      move: [
        {
          source: resolve('../dist/' + SSR_CLIENT_MANIFEST),
          destination: resolve('../server/middleware/router/ssr/' + SSR_CLIENT_MANIFEST)
        }
      ]
    },
    onStart: {
      delete: [
        resolve('../server/middleware/router/ssr/' + SSR_CLIENT_MANIFEST)
      ]
    }
  })
]

export default merge(clientConf, {
  entry: {
    client: [
      '@babel/polyfill',
      getEntryPath('ssr-client.js')
    ]
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
      name: true,
      minChunks: Infinity
    }
  },

  plugins
})
