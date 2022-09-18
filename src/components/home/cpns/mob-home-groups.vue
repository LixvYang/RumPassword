<template>
  <div>
    <el-menu class="el-menu-vertical">
      <template v-for="(group, index) of groups" :key="group">
        <div class="el-menu-item-fa">
          <el-menu-item
            class="el-menu-item"
            :index="index + ''"
            @click="handleMenuItemClick(group.group_id)"
          >
            <span class="group-name-item">{{ group.group_name }}</span>
            <el-button
              circle
              size="large"
              class="delete-group-btn"
              @click.stop="handleDeleteGrp(group.group_id)"
            >
              <el-icon style="vertical-align: middle" color="#F56C6C"
                ><Delete
              /></el-icon>
            </el-button>
          </el-menu-item>

          <el-drawer
            v-model="deleteGroupDialog"
            title="你确定删除组吗?"
            direction="btt"
            :before-close="cancelDeleteGrp"
            destroy-on-close
            size="20%"
          >
            <div>
              <div class="demo-drawer__footer">
                <el-button @click="cancelDeleteGrp">Cancel</el-button>
                <el-button
                  type="danger"
                  @click.stop="handleDeleteGroupBtn(selectDelGroupId)"
                >
                  Delete
                </el-button>
              </div>
            </div>
          </el-drawer>
        </div>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { getGroups } from '@/service/groups/creategroup'
import { clearGroup, leaveGroup } from '@/service/groups/deletegroup'
import { useStore } from '@/store'
import { IGroupsInfo } from '@/utils/quorum-wasm/types'
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    ifDisplayContent: {
      type: Boolean,
      require: true
    }
  },
  emits: ['update:ifDisplayContent'],
  setup(props, { emit }) {
    const deleteGroupDialog = ref(false)
    const store = useStore()
    const groups = computed(() => store.state.login.groupsInfo.groups)
    const selectDelGroupId = ref('')
    const handleMenuItemClick = (group_id: string | undefined) => {
      emit('update:ifDisplayContent', true)
      store.dispatch('main/handleGroupIdAction', group_id)
    }

    const handleDeleteGrp = (group_id: string | undefined) => {
      deleteGroupDialog.value = true
      selectDelGroupId.value = group_id ?? ''
    }

    const handleDeleteGroupBtn = (group_id: string | undefined) => {
      cancelDeleteGrp()
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

    const cancelDeleteGrp = () => {
      deleteGroupDialog.value = false
    }

    return {
      groups,
      handleMenuItemClick,
      handleDeleteGroupBtn,
      deleteGroupDialog,
      cancelDeleteGrp,
      handleDeleteGrp,
      selectDelGroupId
    }
  }
})
</script>

<style scoped lang="less">
.el-menu-item-fa {
  margin: auto;
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  position: relative;
  .delete-group-btn {
    position: absolute;
    left: 200%;
    color: red;
  }
}
</style>
