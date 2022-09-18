<template>
  <div>
    <div class="group-content-header">
      <el-button size="large" @click="handleDisplayGroup" circle>
        <el-icon color="#409EFF"><Back /></el-icon>
      </el-button>
      <p class="group-content-header-name">{{ groupName }}</p>
    </div>
    <el-divider />
    <div v-for="contentItem in groupContent" :key="contentItem?.name">
      <MobContentItem
        class="content-item"
        :content="contentItem"
        @change-content-item="changeContentItem"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from '@/store'
import { NewContent } from '@/utils/quorum-wasm/types'
import { ComputedRef, defineComponent, computed } from 'vue'
import MobContentItem from './mob-contentitem.vue'

export default defineComponent({
  components: { MobContentItem },
  props: {
    ifDisplayContent: {
      type: Boolean,
      require: true
    }
  },
  emits: [
    'update:handleAddContent',
    'update:ifDisplayContent',
    'update:ifdisabled',
    'update:addContentForm',
    'changeContentFormName'
  ],
  setup(props, { emit }) {
    const store = useStore()
    const groupName = computed(() => store.state.main.groupName)

    const groupContent: ComputedRef<NewContent[]> = computed(
      () => store.state.main.newGroupContent
    )
    const handleDisplayGroup = () => {
      emit('update:ifDisplayContent', false)
    }

    const changeContentItem = (contentItemName: string) => {
      emit('changeContentFormName', contentItemName)
      emit('update:ifdisabled', true)
      emit('update:addContentForm', true)
      emit('update:handleAddContent')
    }

    return {
      groupName,
      groupContent,
      handleDisplayGroup,
      changeContentItem
    }
  }
})
</script>

<style scoped lang="less">
.content-item {
  display: flex;
  height: 10%;
}

.group-content-header {
  display: flex;
  width: 100%;
  height: 10%;

  .group-content-header-name {
    margin: auto;
    left: 50%;
    font-size: x-large;
    top: auto;
  }
}
</style>
