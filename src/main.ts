import { createApp, VueElement } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { globalRegister } from './global'
import 'normalize.css'
import './assets/css/index.less'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(globalRegister)
app.mount('#app')

// export interface NodeInfo {
//   node_id?: string
//   node_publickey?: string
// }

// rumrequest
//   .get<NodeInfo>({
//     url: '/node'
//   })
//   .then((res) => {
//     console.log(res)
//   })
