<template>
  <div class="rum-home">
    <h1>你好我是 RumHome</h1>
    <template v-for="contentItem in groupContent" :key="contentItem">
      <content-item :content="contentItem"></content-item>
    </template>
    <el-button circle class="addBtn" size="large"
      ><el-icon color="#95d475"><Plus /></el-icon
    ></el-button>
  </div>
</template>

<script lang="ts">
import { getGroupContent } from '@/service/content/getcontent'
import { useStore } from '@/store'
import { Content, GroupContent } from '@/utils/quorum-wasm/types'
import { computed, ComputedRef, defineComponent, reactive, ref } from 'vue'
import ContentItem from '@/components/home/cpns/content-item.vue'

export default defineComponent({
  components: {
    ContentItem
  },
  setup() {
    const store = useStore()
    const dialogVisible = ref(false)
    const groupContent: ComputedRef<GroupContent<Content>[]> = computed(
      () => store.state.main.groupContent
    )
    const groupContentId = reactive(getGroupContent)

    return {
      dialogVisible,
      groupContent,
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
  .addBtn {
  }
}
</style>
