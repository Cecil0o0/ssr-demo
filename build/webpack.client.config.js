const merge = require('webpack-merge')
const baseConf = require('./webpack.base.config')
const path = require('path')
const utils = require('./utils')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FileManagerWebapckPlugin = require('filemanager-webpack-plugin')
const pkg = require('../package.json')
const config = require('../config')
const argv = require('yargs').argv

let plugins = [
  new CleanWebpackPlugin(['dist'], {
    root: path.resolve(__dirname, '../')
  }),
  new CopyWebpackPlugin([
    {
      from: path.resolve(__dirname, '../static'),
      to: utils.assetsPath('./'),
      ignore: ['.*']
    }
  ])
]

if (argv.standalone) {
  plugins.push(
    new HtmlWebpackPlugin({
      title: 'Demo v' + pkg.version,
      template: 'src/templates/dev.index.template.html',
      filename: 'index.html',
      inject: 'body'
    })
  )
} else if (argv.ssr) {
  plugins = plugins.concat([
    new VueSSRClientPlugin({
      filename: 'vue-ssr-client-manifest.json'
    }),
    new FileManagerWebapckPlugin({
      onEnd: {
        move: [
          {
            source: path.resolve(__dirname, '../dist/vue-ssr-client-manifest.json'),
            destination: path.resolve(__dirname, '../src/server/vue-ssr-client-manifest.json')
          }
        ]
      }
    })
  ])
}

module.exports = merge(baseConf, {
  entry: {
    client: path.resolve(__dirname, '../src/engine/entry-client.js')
  },

  target: 'web',

  output: {
    filename: utils.assetsPath('js/[name].js?v=[hash:5]'),
    chunkFilename: utils.assetsPath('js/[id].js?v=[hash:5]'),
    path: config.assetsRoot,
    publicPath: config.assetsPublicPath
  },

  optimization: {
    splitChunks: {
      chunks: 'initial',
      name: true,
      minChunks: Infinity
    }
  },

  plugins
})
