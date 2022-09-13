import { App } from 'vue'
import 'element-plus/theme-chalk/index.css'
import {
  ElAside,
  ElButton,
  ElCol,
  ElContainer,
  ElHeader,
  ElIcon,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElRow,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElScrollbar,
  ElPopconfirm,
  ElSlider,
  ElDivider
} from 'element-plus/lib/index'
import {
  CirclePlus,
  Folder,
  RefreshRight,
  Plus,
  Delete,
  DArrowLeft,
  DArrowRight,
  ArrowDown,
  User,
  CopyDocument,
  Refresh,
  Edit,
  Search,
  More,
  Back
} from '@element-plus/icons-vue'
const components = [
  ElButton,
  ElIcon,
  ElContainer,
  ElAside,
  ElHeader,
  ElMain,
  ElMenu,
  ElRow,
  ElCol,
  ElMenuItem,
  DArrowLeft,
  DArrowRight,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ArrowDown,
  ElScrollbar,
  ElPopconfirm,
  ElSlider,
  ElDivider
]
const Icons = [
  CirclePlus,
  Folder,
  RefreshRight,
  Plus,
  Delete,
  User,
  CopyDocument,
  Refresh,
  Edit,
  Search,
  More,
  Back
]

export default function (app: App): void {
  for (const icon of Icons) {
    app.component(icon.name, icon)
  }
  for (const component of components) {
    app.component(component.name, component)
  }
}
