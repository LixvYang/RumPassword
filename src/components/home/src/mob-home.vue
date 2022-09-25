<template>
  <div class="mob-home">
    <component
      :is="component"
      v-model:ifDisplayContent="ifDisplayContent"
      v-model:ifdisabled="ifdisabled"
      v-model:addContentForm="addContentForm"
      @update:handleAddContent="handleAddContent"
      @changeContentFormName="changeContentFormName"
    ></component>
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
      :before-close="handleDrawerClose"
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
import { createGroup } from '@/service/groups/creategroup'
import { useStore } from '@/store'
import { Content, GroupContent, IGroupsInfo } from '@/utils/quorum-wasm/types'
import {
  computed,
  ComputedRef,
  defineComponent,
  reactive,
  ref,
  watch
} from 'vue'
import generator from 'generate-password'
import { ElDrawer, ElLoading } from 'element-plus'
import { getGroupContent } from '@/service/content/getcontent'
import {
  changeGroupContent,
  postGroupContent
} from '@/service/content/postcontent'
import { ElMessage } from 'element-plus'
import MobHomeContent from '@/components/home/cpns/mob-home-content.vue'
import MobHomeGroups from '@/components/home/cpns/mob-home-groups.vue'
import { getGroups } from '@/service/groups/getgroups'
import { RumLoading } from '@/global/loading'
import getNetworkInfo from '@/service/network/getnetworkinfo'

export default defineComponent({
  components: {
    MobHomeContent,
    MobHomeGroups
  },
  setup() {
    const store = useStore()
    const drawerRef = ref<InstanceType<typeof ElDrawer>>()
    const ifDisplayContent = ref(false)
    const groups = computed(() => store.state.login.groupsInfo.groups)
    const ifdisabled = ref(false)
    const addContentForm = ref(false)
    const contentForm = reactive({
      content: '',
      name: ''
    })
    const component = ref('MobHomeGroups')
    const addGroupDrawer = ref(false)
    const createGroupName = ref('')
    const curProps = ref({})
    const passwordLen = ref(12)
    const passwordNumbers = ref(true)
    const passwordSymbols = ref(false)
    const loading = ref(false)
    const selectGroupId = computed(() => store.state.main.groupId)
    const contentRef = ref('')
    const groupContent: ComputedRef<GroupContent<Content>[]> = computed(
      () => store.state.main.groupContent
    )

    watch(ifDisplayContent, (newValue: boolean, oldValue: boolean) => {
      if (newValue === true) {
        component.value = 'MobHomeContent'
      } else {
        component.value = 'MobHomeGroups'
      }
    })

    const handleAddContent = () => {
      if (ifDisplayContent.value === false) {
        // add group
        addGroupDrawer.value = !addGroupDrawer.value
      } else if (ifdisabled.value === false) {
        addContentForm.value = true
        contentForm.name = ''
      } else if (ifdisabled.value === true) {
        contentForm.name == contentRef.value
        addContentForm.value = true
      }
    }

    const handleAddGroupBtn = (createGroupName: string) => {
      store.commit('main/changeGroupContent', [])
      store.commit('main/clearNewGroupContent')
      const data = async () => {
        createGroup(createGroupName)
          .then(async () => {
            const groupsInfo: IGroupsInfo = await getGroups()
            store.commit('login/changeGroupsInfo', groupsInfo)
          })
          .catch((err) => {
            console.log(err)
          })
      }
      data()
      addGroupDrawer.value = !addGroupDrawer.value
      store.commit('login/changeNetwork', getNetworkInfo())
      RumLoading(true, ' 请稍候正在创建组', 30000)
    }

    const changeContentFormName = (name: string) => {
      contentForm.name = name
    }

    const cancelContenteForm = () => {
      loading.value = false
      ifdisabled.value = false
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
      const password = generator.generate({
        length: passwordLen,
        numbers: passwordNumbers,
        symbols: passwordSymbols
      })
      contentForm.content = password
    }

    const handleDrawerClose = () => {
      if (ifdisabled.value === true) {
        contentForm.name = ''
        ifdisabled.value = true
      }
      cancelContenteForm()
    }

    // const onClick = () => {
    //   drawerRef.value?.close()
    //   if (contentForm.content == '' || contentForm.name == '') {
    //     ElMessage.error('不可以为空')
    //     return
    //   }

      
    // }

    const onClick = () => {
      drawerRef.value?.close()
      if (contentForm.content == '' || contentForm.name == '') {
        ElMessage.error('不可以为空')
        return
      }

      if (ifdisabled.value === true) {
        const selectedGroupid = computed(() => store.state.main.groupId)
        let changeTrxId: string | undefined = ''
        getGroupContent(selectedGroupid.value, groupContent.value[0].TrxId)
          .then((groupContent) => {
            for (let i = groupContent.data.length - 1; i >= 0; i--) {
              if (groupContent.data[i].Content?.name == contentForm.name) {
                changeTrxId = groupContent.data[i].TrxId
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
      addContentForm.value = false
      const openFullScreen = () => {
        const loading = ElLoading.service({
          lock: true,
          text: '数据正在上链...',
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
      ifDisplayContent,
      curProps,
      groups,
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
      onClick,
      component,
      changeContentFormName,
      handleDrawerClose
    }
  }
})
</script>

<style scoped lang="less">
.addGroupContentBtn {
  position: absolute;
  top: 93%;
  left: 88%;
}

.passwordStrongSet {
  display: flex;
  flex-direction: flex-direction;
  justify-content: space-between;
}

.demo-drawer__footer {
  display: flex;
  flex-direction: flex-direction;
  justify-content: space-between;
  position: absolute;
  right: 20%;
}
</style>
