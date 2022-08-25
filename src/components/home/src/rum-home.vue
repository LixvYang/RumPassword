<template>
  <div class="rum-home">
    <template v-for="contentItem in groupContent" :key="contentItem">
      <content-item :content="contentItem"></content-item>
    </template>
    <el-button
      circle
      class="addGroupContentBtn"
      size="large"
      @click="handleAddGroupContent"
      ><el-icon color="#95d475"><Plus /></el-icon
    ></el-button>

    <el-drawer
      ref="drawerRef"
      v-model="addContentForm"
      title="添加密码"
      direction="ltr"
      custom-class="demo-drawer"
    >
      <div class="addContentToGroup">
        <el-form :model="contentForm">
          <el-form-item label="Name" :label-width="formLabelWidth">
            <el-input v-model="contentForm.name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Password" :label-width="formLabelWidth">
            <el-input v-model="contentForm.content" autocomplete="off" />
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="cancelContenteForm">Cancel</el-button>
          <el-button type="primary" :loading="loading" @click="onClick">{{
            loading ? 'Submitting ...' : 'Submit'
          }}</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { getGroupContent } from '@/service/content/getcontent'
import { useStore } from '@/store'
import { Content, GroupContent } from '@/utils/quorum-wasm/types'
import { computed, ComputedRef, defineComponent, reactive, ref } from 'vue'
import ContentItem from '@/components/home/cpns/content-item.vue'
import { ElDrawer } from 'element-plus/lib/components'
import { postGroupContent } from '@/service/content/postcontent'
import { ElLoading } from 'element-plus'

export default defineComponent({
  components: {
    ContentItem
  },
  setup() {
    const store = useStore()
    const addContentForm = ref(false)
    const formLabelWidth = '80px'
    const drawerRef = ref<InstanceType<typeof ElDrawer>>()
    const loading = ref(false)

    const contentForm = reactive({
      content: '',
      name: ''
    })

    const groupContent: ComputedRef<GroupContent<Content>[]> = computed(
      () => store.state.main.groupContent
    )

    const onClick = () => {
      drawerRef.value?.close()

      console.log(selectGroupId.value.toString())
      postGroupContent(
        selectGroupId.value.toString(),
        contentForm.content,
        contentForm.name
      )
      const openFullScreen = () => {
        const loading = ElLoading.service({
          lock: true,
          text: 'Loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        setTimeout(() => {
          loading.close()
        }, 5000)
      }
      const data = async () => {
        getGroupContent(selectGroupId.value.toString()).then(
          async (groupCtn) => {
            console.log('组的内容已经改变')
            console.log(groupCtn)
            store.commit('main/changeGroupContent', groupCtn)
            store.commit('main/changeGroupId', selectGroupId.value.toString())
            contentForm.content = ''
            contentForm.name = ''
            openFullScreen()
          }
        )
      }

      data()
    }

    const cancelContenteForm = () => {
      loading.value = false
      addContentForm.value = false
      clearTimeout(1000)
    }

    const selectGroupId = computed(() => store.state.main.groupId)

    const groupContentId = reactive(getGroupContent)
    const handleAddGroupContent = () => {
      addContentForm.value = !addContentForm.value
    }
    return {
      formLabelWidth,
      addContentForm,
      onClick,
      loading,
      cancelContenteForm,
      contentForm,
      groupContent,
      groupContentId,
      drawerRef,
      handleAddGroupContent
    }
  }
})
</script>

<style scoped lang="less">
.rum-home {
  position: relative;
  .singleContent {
    width: 500px;
    height: 50px;
  }
  .addGroupContentBtn {
    background-color: rgb(86, 143, 173);
    position: absolute;
    top: 100%;
    left: 80%;
  }
}
</style>
