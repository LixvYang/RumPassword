<template>
  <div class="rum-home">
    <h1>你好我是 RumHome</h1>
    <template v-for="content in groupContent" :key="content">
      <span
        class="singleContent"
        @click="
          dialogVisible = true
          getContentContent(content.Content?.content)
        "
      >
        {{ content.Content?.name }}
        <el-button>你好</el-button>
      </span>
    </template>

    <el-dialog v-model="dialogVisible" title="Tips" width="30%" draggable>
      <span>It's a draggable Dialog</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >Confirm</el-button
          >
          <span>{{ groupContentId }}</span>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { getGroupContent } from '@/service/content/getcontent'
import { useStore } from '@/store'
import { Content, GroupContent } from '@/utils/quorum-wasm/types'
import { computed, ComputedRef, defineComponent, reactive, ref } from 'vue'

export default defineComponent({
  setup(props, { emit }) {
    const store = useStore()
    const dialogVisible = ref(false)
    const groupContent: ComputedRef<GroupContent<Content>[]> = computed(
      () => store.state.main.groupContent
    )
    const groupContentId = reactive(getGroupContent)

    const getContentContent = (content: string) => {
      return content
    }

    return {
      dialogVisible,
      groupContent,
      getContentContent,
      groupContentId
    }
  }
})
</script>

<style scoped lang="less">
.rum-home {
  .singleContent {
    width: 500px;
    height: 50px;
  }
}
</style>
