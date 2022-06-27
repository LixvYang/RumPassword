import { App } from 'vue'
import 'element-plus/theme-chalk/index.css'
import { ElButton, ElLoading } from 'element-plus/lib/index'

const components = [ElButton]

export default function (app: App): void {
  for (const component of components) {
    app.use(ElLoading)
    app.component('ElLoading', ElLoading)
    app.component(component.name, component)
  }
}
