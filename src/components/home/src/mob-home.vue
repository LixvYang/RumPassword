<template>
  <div class="mob-home">
    <template v-if="!DisplayGroupContent">
      <div>
        <el-menu class="el-menu-vertical">
          <template v-for="(group, index) of groups" :key="group">
            <el-menu-item
              :index="index + ''"
              @click="handleMenuItemClick(group.group_id)"
            >
              <span>{{ group.group_name }}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </div>
    </template>
    <!-- <Transition name="fade"> -->
    <template v-if="DisplayGroupContent">
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
    <!-- </Transition> -->
    <el-button
      circle
      class="addGroupContentBtn"
      size="large"
      type="primary"
      @click="handleAddContent"
      ><el-icon color="#95d475"><Plus /></el-icon
    ></el-button>

    <el-drawer v-model="addGroupDrawer" :with-header="false" direction="btt">
      <h1>创建组</h1>
      <el-input
        v-model="createGroupName"
        placeholder="Please input group name"
      ></el-input>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="addGroupDrawer = !addGroupDrawer"
            >cancel</el-button
          >
          <el-button type="primary" @click="handleAddGroupBtn(createGroupName)"
            >confirm</el-button
          >
        </div>
      </template>
    </el-drawer>

    <el-drawer
      ref="drawerRef"
      v-model="addContentForm"
      title="添加密码"
      direction="btt"
      custom-class="demo-drawer"
      size="50%"
    >
      <div class="addContentToGroup">
        <el-form :model="contentForm">
          <el-form-item
            label="Name"
            label-width="50%"
            class="add-content-formitem"
          >
            <el-input
              v-model="contentForm.name"
              autocomplete="off"
              placeholder="Please input name"
              :disabled="ifdisabled"
            />
          </el-form-item>
          <el-divider />

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
            <el-divider />

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
          <el-form-item label="Password" label-width="50%">
            <el-input
              class="add-content-formitem"
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
import { createGroup, getGroups } from '@/service/groups/creategroup'
import { useStore } from '@/store'
import { IGroupsInfo, NewContent } from '@/utils/quorum-wasm/types'
import { computed, ComputedRef, defineComponent, reactive, ref } from 'vue'
import MobContentItem from '../cpns/mob-contentitem.vue'
import generator from 'generate-password'
import { ElDrawer, ElLoading } from 'element-plus'
import { getGroupContent } from '@/service/content/getcontent'
import {
  changeGroupContent,
  postGroupContent
} from '@/service/content/postcontent'
import { ElMessage } from 'element-plus'

export default defineComponent({
  components: {
    MobContentItem
  },
  setup() {
    const store = useStore()
    const drawerRef = ref<InstanceType<typeof ElDrawer>>()
    const DisplayGroupContent = ref(false)
    const groups = computed(() => store.state.login.groupsInfo.groups)
    const ifdisabled = ref(false)
    const addContentForm = ref(false)
    const contentForm = reactive({
      content: '',
      name: ''
    })
    const addGroupDrawer = ref(false)
    const createGroupName = ref('')
    const passwordLen = ref(12)
    const passwordNumbers = ref(true)
    const passwordSymbols = ref(false)
    const loading = ref(false)
    const selectGroupId = computed(() => store.state.main.groupId)

    const handleMenuItemClick = (group_id: string | undefined) => {
      DisplayGroupContent.value = !DisplayGroupContent.value
      store.dispatch('main/handleGroupIdAction', group_id)
    }

    const groupContent: ComputedRef<NewContent[]> = computed(
      () => store.state.main.newGroupContent
    )

    const groupName = computed(() => store.state.main.groupName)

    const changeContentItem = (changeContentItemName: string) => {
      contentForm.name = changeContentItemName
      ifdisabled.value = true
      addContentForm.value = true
    }

    const handleDisplayGroup = () => {
      DisplayGroupContent.value = !DisplayGroupContent.value
    }

    const handleAddContent = () => {
      if (DisplayGroupContent.value === false) {
        // add group
        addGroupDrawer.value = !addGroupDrawer.value
      } else {
        addContentForm.value = !addContentForm.value
        ifdisabled.value = false
      }
    }

    const handleAddGroupBtn = (createGroupName: string) => {
      store.commit('main/changeGroupContent', [])
      store.commit('main/clearNewGroupContent')
      const data = async () => {
        createGroup(createGroupName)
          .then(async () => {
            const groupsInfo: IGroupsInfo = await getGroups()
            console.log(groupsInfo)
            store.commit('login/changeGroupsInfo', groupsInfo)
          })
          .catch((err) => {
            console.log(err)
          })
      }
      data()
      addGroupDrawer.value = !addGroupDrawer.value
    }

    const cancelContenteForm = () => {
      loading.value = false
      addContentForm.value = false
      contentForm.content = ''
      contentForm.name = ''
      clearTimeout(1000)
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

    const onClick = () => {
      drawerRef.value?.close()
      if (contentForm.content == '' || contentForm.name == '') {
        alert('不可以为空')
        return
      }

      if (ifdisabled.value === true) {
        const selectedGroupid = computed(() => store.state.main.groupId)
        let changeTrxId: string | undefined = ''
        getGroupContent(selectedGroupid.value)
          .then((groupContent) => {
            for (let i = groupContent.length - 1; i >= 0; i--) {
              if (groupContent[i].Content?.name == contentForm.name) {
                changeTrxId = groupContent[i].TrxId
              }
            }
          })
          .then(() => {
            changeGroupContent(
              changeTrxId,
              selectedGroupid.value,
              contentForm.content,
              contentForm.name
            )
            setTimeout(() => {
              store.dispatch(
                'main/handleGroupIdAction',
                selectedGroupid.value.toString()
              )
            }, 20000)
          })
      } else {
        postGroupContent(
          selectGroupId.value.toString(),
          contentForm.content,
          contentForm.name
        )
      }
      const oInput = document.createElement('input')
      oInput.value = contentForm.content
      document.body.appendChild(oInput)
      oInput.select()
      document.execCommand('Copy')
      ElMessage({
        center: true,
        message: '复制成功',
        type: 'success'
      })
      oInput.remove()
      console.log('COPY')
      addContentForm.value = false
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

    return {
      DisplayGroupContent,
      handleMenuItemClick,
      groups,
      groupContent,
      changeContentItem,
      groupName,
      handleDisplayGroup,
      handleAddContent,
      addGroupDrawer,
      createGroupName,
      handleAddGroupBtn,
      contentForm,
      ifdisabled,
      addContentForm,
      passwordLen,
      passwordNumbers,
      passwordSymbols,
      cancelContenteForm,
      generatePassword,
      loading,
      onClick
    }
  }
})
</script>

<style scoped lang="less">
.content-item {
  display: flex;
  height: 10%;
}
.addGroupContentBtn {
  position: absolute;
  top: 93%;
  left: 88%;
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

.passwordStrongSet {
  display: flex;
  flex-direction: flex-direction;
  justify-content: space-between;
}
// .fade-enter-active {
//   transition: all 0.3s ease-out;
// }

// .fade-leave-active {
//   transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
// }

// .fade-enter-from {
//   transform: translateX(20px);
//   opacity: 0;
// }
</style>
