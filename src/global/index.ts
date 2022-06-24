import { App } from 'vue'
import 'element-plus/theme-chalk/index.css'
import { ElButton } from 'element-plus/lib/index'

const components = [ElButton]

export function registerApp(app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
