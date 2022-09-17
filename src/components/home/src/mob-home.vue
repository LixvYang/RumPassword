<template>
  <div class="mob-home">
    <component :is="component"></component>
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
import { clearGroup, leaveGroup } from '@/service/groups/deletegroup'
import MobHomeContent from '@/components/home/cpns/mob-home-content.vue'
import MobHomeGroup from '@/components/home/cpns/mob-home-groups.vue'

export default defineComponent({
  components: {
    // MobContentItem
    MobHomeContent,
    MobHomeGroup
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
    const component = ref(MobHomeGroup)
    const addGroupDrawer = ref(false)
    const createGroupName = ref('')
    const passwordLen = ref(12)
    const passwordNumbers = ref(true)
    const passwordSymbols = ref(false)
    const loading = ref(false)
    const selectGroupId = computed(() => store.state.main.groupId)

    const handleMenuItemClick = (group_id: string | undefined) => {
      DisplayGroupContent.value = !DisplayGroupContent.value
      if (!DisplayGroupContent.value) {
        component.value = MobHomeContent
      } else {
        component.value = MobHomeGroup
      }
      // store.dispatch('main/handleGroupIdAction', group_id)
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

    const handleDeleteGroupBtn = (group_id: string | undefined) => {
      store.commit('main/changeGroupContent', [])
      store.commit('main/clearNewGroupContent')
      const data = async () => {
        clearGroup(group_id)
          .then(async () => {
            leaveGroup(group_id).then(async () => {
              const groupsInfo: IGroupsInfo = await getGroups()
              store.commit('login/changeGroupsInfo', groupsInfo)
            })
          })
          .catch((e) => console.log(e))
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
      onClick,
      handleDeleteGroupBtn,
      component
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
.el-menu-item-fa {
  position: relative;
  display: flex;
  flex-direction: flex-direction;
  justify-content: space-between;
  .el-menu-item {
    position: relative;
    .delete-group-btn {
      position: absolute;
      left: 400%;
    }
  }
}
</style>
