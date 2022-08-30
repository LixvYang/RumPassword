<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
      <span class="title" v-if="!collapse">RumPassword</span>
    </div>
    <el-menu default-active="0" class="el-menu-vertical">
      <template v-for="(group, index) of groups" :key="group" v-if="!collapse">
        <el-menu-item
          :index="index + ''"
          @click="handleMenuItemClick(group.group_id)"
        >
          <span>{{ group.group_name }}</span>

          <el-popconfirm
            confirm-button-text="Yes"
            cancel-button-text="No"
            icon-color="#626AEF"
            title="Are you sure to delete this group?"
            @confirm="handleDeleteGroupBtn(group.group_id)"
          >
            <template #reference>
              <el-button circle size="small" class="deleteGroupBtn"
                ><el-icon color="#F56C6C"><Delete /></el-icon
              ></el-button>
            </template>
          </el-popconfirm>
        </el-menu-item>
      </template>
      <template v-for="(group, index) of groups" :key="group" v-if="collapse">
        <el-menu-item
          :index="index + ''"
          @click="handleMenuItemClick(group.group_id)"
        >
          <span>{{ group.group_name?.charAt(0) }}</span>
        </el-menu-item>
      </template>
      <button class="addGroupBtn" role="button">
        <span class="text" @click="addGroupDrawer = true">ADDGROUPBTN</span>
      </button>
    </el-menu>
    <el-drawer
      v-model="addGroupDrawer"
      :with-header="false"
      :direction="drawerDir"
    >
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
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useStore } from '@/store'
import { createGroup } from '@/service/groups/creategroup'
import { getGroups } from '@/service/groups/getgroups'
import { clearGroup, leaveGroup } from '@/service/groups/deletegroup'
import { IGroupsInfo } from '@/utils/quorum-wasm/types'

export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const store = useStore()
    const addGroupDrawer = ref(false)
    const drawerDir = 'ltr'
    const createGroupName = ref('')

    const groups = computed(() => store.state.login.groupsInfo.groups)
    const handleMenuItemClick = (group_id: string | undefined) => {
      store.dispatch('main/handleGroupIdAction', group_id)
    }

    const handleAddGroupBtn = (createGroupName: string) => {
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
    }

    const handleDeleteGroupBtn = (group_id: string | undefined) => {
      console.log(group_id)
      const data = async () => {
        clearGroup(group_id)
          .then(async () => {
            leaveGroup(group_id).then(async () => {
              const groupsInfo: IGroupsInfo = await getGroups()
              console.log(groupsInfo)
              store.commit('login/changeGroupsInfo', groupsInfo)
            })
          })
          .catch((e) => console.log(e))
      }
      data()
    }

    return {
      groups,
      handleMenuItemClick,
      addGroupDrawer,
      drawerDir,
      createGroupName,
      handleAddGroupBtn,
      handleDeleteGroupBtn
    }
  }
})
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #409eff;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }
  }

  .title {
    font-size: 16px;
    font-weight: 700;
    color: white;
  }
  .el-menu {
    border-right: none;
  }

  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-submenu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: rgb(56, 128, 119) !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #4d92dc !important;
  }

  .addGroupBtn {
    appearance: none;
    background-color: #ffffff;
    border-width: 0;
    box-sizing: border-box;
    color: #000000;
    cursor: pointer;
    display: inline-block;
    font-family: Clarkson, Helvetica, sans-serif;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0;
    line-height: 1em;
    margin: 0;
    opacity: 1;
    outline: 0;
    padding: 1.5em 2.2em;
    position: absolute;
    bottom: 0%;
    text-align: center;
    text-decoration: none;
    text-rendering: geometricprecision;
    text-transform: uppercase;
    transition: opacity 300ms cubic-bezier(0.694, 0, 0.335, 1),
      background-color 100ms cubic-bezier(0.694, 0, 0.335, 1),
      color 100ms cubic-bezier(0.694, 0, 0.335, 1);
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    vertical-align: baseline;
    white-space: nowrap;
  }

  .addGroupBtn:before {
    animation: opacityFallbackOut 0.5s step-end forwards;
    backface-visibility: hidden;
    background-color: #4d92dc;
    clip-path: polygon(-1% 0, 0 0, -25% 100%, -1% 100%);
    content: '';
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    transform: translateZ(0);
    transition: clip-path 0.5s cubic-bezier(0.165, 0.84, 0.44, 1),
      -webkit-clip-path 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
    width: 100%;
  }

  .addGroupBtn:hover:before {
    animation: opacityFallbackIn 0s step-start forwards;
    clip-path: polygon(0 0, 101% 0, 101% 101%, 0 101%);
  }

  .addGroupBtn:after {
    background-color: #4d92dc;
  }

  .addGroupBtn span {
    z-index: 1;
    position: relative;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
  position: relative;

  .deleteGroupBtn {
    align-content: center;
    color: #e76565;
    display: flex;
    position: absolute;
    left: 80%;
  }
  .deleteGroupBtn:hover {
    background: rgb(175, 46, 46);
  }
}
.addGroupDialog {
  height: 50%;
}
</style>
