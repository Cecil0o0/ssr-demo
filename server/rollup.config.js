'use strict'
import path from 'path'
import nodeResolve from 'rollup-plugin-node-resolve'
import jsonResolve from 'rollup-plugin-json'

export default {
  input: path.resolve(__dirname, 'index.js'),
  external: [
    'koa',
    'koa-static',
    'koa-router',
    'vue-server-renderer',
    'signale',
    'http-proxy-middleware',
    'koa-connect',
    'path',
    path.resolve(__dirname, './middleware/router/ssr/vue-ssr-client-manifest.json'),
    path.resolve(__dirname, './middleware/router/ssr/vue-ssr-server-bundle.json')
  ],
  plugins: [nodeResolve(), jsonResolve()],
  output: {
    file: 'server/es5-index.js',
    format: 'cjs',
    banner: '// this is created from /server/index.js'
  }
}
