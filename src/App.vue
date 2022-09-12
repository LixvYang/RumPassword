<template>
  <div class="app">
    <el-config-provider :locale="locale">
      <transition
        enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut"
      >
        <keep-alive>
          <router-view class="routeView" />
        </keep-alive>
      </transition>
    </el-config-provider>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import { ElConfigProvider } from 'element-plus'
import { useStore } from '@/store'

export default defineComponent({
  name: 'App',
  props: {
    name: {
      type: String
    }
  },
  setup() {
    const store = useStore()
    // const router = useRouter()
    const language = computed(() => store.state.lang.language)
    const lang = {
      zhCn,
      en
    }
    // let enterTransition = 'animate__animated animate__fadeIn'
    // let leaveTransition = 'animate__animated animate__fadeOut'
    // watch(
    //   () => router.currentRoute.value.meta,
    //   (to, from) => {
    //     const toDepth = to.depth as number
    //     const fromDepth = from?.depth as number
    //     if (fromDepth > toDepth) {
    //       enterTransition = 'animate__animated animate__fadeInRight'
    //       leaveTransition = 'animate__animated animate__fadeOutLeft'
    //     } else if (fromDepth < toDepth) {
    //       enterTransition = 'animate__animated animate__fadeInRight'
    //       leaveTransition = 'animate__animated animate__fadeOutLeft'
    //     } else {
    //       enterTransition = 'animate__animated animate__fadeIn'
    //       leaveTransition = 'animate__animated animate__fadeOut'
    //     }
    //   },
    //   { immediate: true, deep: true }
    // )

    const locale = computed(() => lang[language.value as keyof typeof lang])
    return { locale, ElConfigProvider }
  }
})
</script>

<style lang="less">
.app {
  height: 100%;
}
.routeView {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
