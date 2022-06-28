import { App } from 'vue'
import 'element-plus/theme-chalk/index.css'
import { ElButton, ElIcon } from 'element-plus/lib/index'
import { CirclePlus, Folder } from '@element-plus/icons-vue'
const components = [ElButton, ElIcon]
const Icons = [CirclePlus, Folder]

export default function (app: App): void {
  for (const icon of Icons) {
    app.component(icon.name, icon)
  }
  for (const component of components) {
    app.component(component.name, component)
  }
}
