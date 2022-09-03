<template>
  <div class="app">
    <el-config-provider :locale="locale">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import { useStore } from './store'
import { ElConfigProvider } from 'element-plus'

export default defineComponent({
  name: 'App',
  props: {
    name: {
      type: String
    }
  },
  setup() {
    const store = useStore()
    const language = computed(() => store.state.lang.language)
    const lang = {
      zhCn,
      en
    }
    const locale = computed(() => lang[language.value as keyof typeof lang])
    return { locale, ElConfigProvider }
  }
})
</script>

<style lang="less">
.app {
  height: 100%;
}
</style>
