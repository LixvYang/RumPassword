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
      direction="rtl"
      custom-class="demo-drawer"
      size="40%"
    >
      <div class="addContentToGroup">
        <el-form :model="contentForm">
          <el-form-item label="Name" :label-width="formLabelWidth">
            <el-input
              v-model="contentForm.name"
              autocomplete="off"
              placeholder="Please input name"
            />
          </el-form-item>
          <div>
            <div class="slider-demo-block">
              <span class="demonstration">密码长度</span>
              <el-slider
                v-model="passwordLen"
                show-input
                size="small"
                :min="5"
                :max="128"
              />
            </div>
            <div class="passwordStrongSet">
              <span class="passwordNumbers"
                >0-9 <el-switch v-model="passwordNumbers"
              /></span>
              <span class="passwordSymbols"
                >!@#$%^&*<el-switch v-model="passwordSymbols"
              /></span>
              <span
                >生成<el-button
                  @click="
                    generatePassword(
                      passwordLen,
                      passwordNumbers,
                      passwordSymbols
                    )
                  "
                  ><el-icon><Refresh /></el-icon></el-button
              ></span>
            </div>
          </div>
          <el-form-item label="Password" :label-width="formLabelWidth">
            <el-input
              v-model="contentForm.content"
              autocomplete="off"
              placeholder="Please input password"
              show-password
            />
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
import generator from 'generate-password'
import content from '@/utils/lang/zh-cn'

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
    const passwordLen = ref(12)
    const passwordNumbers = ref(true)
    const passwordSymbols = ref(true)

    const contentForm = reactive({
      content: '',
      name: ''
    })

    const groupContent: ComputedRef<GroupContent<Content>[]> = computed(
      () => store.state.main.groupContent
    )

    const onClick = () => {
      drawerRef.value?.close()
      if (contentForm.content == '' || contentForm.name == '') {
        alert('不可以为空')
        return
      }

      postGroupContent(
        selectGroupId.value.toString(),
        contentForm.content,
        contentForm.name
      )
      const openFullScreen = () => {
        const loading = ElLoading.service({
          lock: true,
          text: '等待以下喔',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        setTimeout(() => {
          loading.close()
        }, 5000)

        setTimeout(() => {
          store.dispatch(
            'main/handleGroupIdAction',
            selectGroupId.value.toString()
          )
        }, 20000)
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
      contentForm.content = ''
      contentForm.name = ''
      clearTimeout(1000)
    }

    const selectGroupId = computed(() => store.state.main.groupId)

    const groupContentId = reactive(getGroupContent)
    const handleAddGroupContent = () => {
      console.log('selectGroupId' + selectGroupId.value.toString())
      if (selectGroupId.value.toString() == '') {
        alert('请先选择一个组')
        console.log('请先选择一个组')
      } else {
        addContentForm.value = !addContentForm.value
      }
    }

    const generatePassword = function (
      passwordLen: number,
      passwordNumbers: boolean,
      passwordSymbols: boolean
    ) {
      console.log('发送generatePassword')
      const password = generator.generate({
        length: passwordLen,
        numbers: passwordNumbers,
        symbols: passwordSymbols
      })
      contentForm.content = password
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
      handleAddGroupContent,
      passwordLen,
      passwordNumbers,
      passwordSymbols,
      generatePassword
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
    background-color: #6cb1f5;
    position: absolute;
    top: 100%;
    left: 80%;
    .passwordNumbers {
      position: relative;
      left: 50%;
    }
    .passwordSymbols {
      position: relative;
      right: 0%;
    }
  }

  .slider-demo-block {
    display: flex;
    align-items: center;
  }
  .slider-demo-block .el-slider {
    margin-top: 0;
    margin-left: 12px;
  }
  .slider-demo-block .demonstration {
    font-size: 14px;
    color: var(--el-text-color-secondary);
    line-height: 44px;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 0;
  }
  .slider-demo-block .demonstration + .el-slider {
    flex: 0 0 70%;
  }
  .passwordStrongSet {
    display: flex;
    justify-content: space-between;
  }
}
</style>
