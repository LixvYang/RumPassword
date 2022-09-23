const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

module.exports = {
  outputDir: './build',
  publicPath: './',
  // devServer: {
  //   //代理axios
  //   proxy: 'http://localhost:9000',
  //   //vue自己启动的端口
  //   port: 9001
  // },
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
      unknownContextCritical: false
      // rules: [
      //   {
      //     test: /\.wasm$/,
      //     type: 'webassembly/async'
      //   }
      // ]
    }
  },
  chainWebpack: (config) => {
    config.module
      .rule('wasm')
      .test(/\.(wasm)$/)
      .type('asset')
      .parser({
        dataUrlCondition: {
          maxSize: 1024
        }
      })
      .end()
  },
  lintOnSave: false
}
