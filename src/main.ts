import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { globalRegister } from './global'
import 'normalize.css'
import './assets/css/index.less'
import { startQuorum } from './utils/quorum-wasm/load-quorum'
import {init} from '@/utils/quorum-wasm/worker'
import rumrequest from './service'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(globalRegister)
app.mount('#app')

export interface NodeInfo {
  node_id?: string
  node_publickey?: string
  node_status?: string
  node_type?: string
  node_version?: string
  peers?: any
}

init()
async () => {
  await startQuorum(["/ip4/127.0.0.1/tcp/10666/p2p/16Uiu2HAm6xd9nfcmXg37ont8VuG5swRA8vCYv8tXfzcAo7h9djLy"])
}


// rumrequest
//   .get<NodeInfo>({
//     url: '/node'
//   })
//   .then((res) => {
//     console.log(res.peers)
//   })
