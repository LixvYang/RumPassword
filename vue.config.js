const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

module.exports = {
  outputDir: './build',
  publicPath: './',
  configureWebpack: {
    experiments: {
      asyncWebAssembly: true
    },
    resolve: {
      alias: {
        components: '@/components'
      },
      fallback: {
        path: false
      }
    },
    plugins: [
      new NodePolyfillPlugin(),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ],
    module: {
      rules: [
        {
          test: /\.wasm$/,
          type: 'webassembly/async'
        }
      ]
    }
  },
  lintOnSave: false
}
