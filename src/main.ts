import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { globalRegister } from './global'
import 'normalize.css'
import './assets/css/index.less'
import { startQuorum } from './utils/quorum-wasm/load-quorum'
import rumrequest from './service'
import { bootstrapsForm } from './views/login/config/node-config'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(globalRegister)
app.mount('#app')

// init()
// export interface NodeInfo {
//   node_id?: string
//   node_publickey?: string
//   node_status?: string
//   node_type?: string
//   node_version?: string
//   peers?: any
// }

// rumrequest
//   .get<NodeInfo>({
//     url: '/node'
//   })
//   .then((res) => {
//     console.log(res.peers)
//   })
