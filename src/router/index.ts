import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import store from '@/store'
import { useStore } from '@/store'
import { computed } from 'vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: 'login',
    meta: { depth: 1 }
  },
  {
    path: '/login',
    component: () => import('@/views/login/login.vue'),
    meta: { depth: 1 }
  },
  {
    path: '/main',
    component: () => import('@/views/main/main.vue'),
    meta: { depth: 2 }
  },
  {
    path: '/mobmain',
    component: () => import('@/views/mobile/mob-main.vue'),
    meta: { depth: 2 }
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
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
  // if (loading.value == false) {
  //   return '/login'
  // }
})

export default router
