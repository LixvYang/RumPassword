import { createApp, VueElement } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { globalRegister } from './global'
import 'normalize.css'
import './assets/css/index.less'
import i18n from './utils/lang'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(globalRegister)
app.use(i18n)
app.mount('#app')

