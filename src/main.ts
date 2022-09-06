import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { globalRegister } from './global'
import 'normalize.css'
import './assets/css/index.less'
import i18n from './utils/lang'
import animated from 'animate.css'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(i18n)
app.use(globalRegister)
app.use(animated)
app.mount('#app')
