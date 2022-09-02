import store from '@/store'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { useStore } from '@/store'
import { computed } from 'vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: 'login'
  },
  {
    path: '/login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    component: () => import('@/views/main/main.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

router.beforeEach((to) => {
  if (to.path !== '/login') {
    const groupsInfo = localStorage.getItem('groupsInfo')
    if (!groupsInfo) {
      return '/login'
    }
  }
  // const store = useStore()
  // const loading = computed(() => store.state.main.nodeLoading)
  // if (!loading.value) {
  //   return '/login'
  // }
})

export default router
