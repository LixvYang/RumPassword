<template>
  <div class="rum-home">
    <h1>你好我是 RumHome</h1>
    <template v-for="Econtent in groupContent" :key="Econtent">
      <el-button class="Econtent" @click="dialogVisible = true"
        >{{ Econtent.Content?.name }} <el-button>你好</el-button></el-button
      >

      <el-dialog v-model="dialogVisible" title="Tips" width="30%">
        <span>This is a message</span>
        <h2>{{ Econtent.Content?.content }}</h2>
      </el-dialog>
    </template>
  </div>
</template>

<script lang="ts">
import { useStore } from '@/store'
import { Content, GroupContent } from '@/utils/quorum-wasm/types'
import { computed, ComputedRef, defineComponent, ref } from 'vue'

export default defineComponent({
  setup(props, { emit }) {
    const store = useStore()
    const dialogVisible = ref(false)
    const groupContent: ComputedRef<GroupContent<Content>[]> = computed(
      () => store.state.main.groupContent
    )

    return {
      dialogVisible,
      groupContent
    }
  }
})
</script>

<style scoped lang="less">
.rum-home {
  .Econtent {
    width: 500px;
    height: 50px;
  }
}
</style>
