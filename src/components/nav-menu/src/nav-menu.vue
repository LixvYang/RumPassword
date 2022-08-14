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
        </el-menu-item>
      </template>
      <template v-for="(group, index) of groups" :key="group" v-if="collapse">
        <el-menu-item :index="index + ''">
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
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from '@/store'
import { createGroup } from '@/service/groups/creategroup'
import { getGroups } from '@/service/groups/getgroups'

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
      console.log('创建之前的组')
      console.log(groups.value)
      createGroup(createGroupName)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
      console.log(groups.value)
      let groupsInfo: any
      getGroups().then((res) => {
        groupsInfo = res.groups
        console.log('res.groups: ')
        console.log(res.groups)
      })
      console.log('新请求的组信息是')
      console.log(groupsInfo)
      store.commit('login/changeGroupsInfo', groupsInfo)
      console.log(groups.value)
    }

    watch(groups, (newValue, oldValue: any) => {
      console.log('监听groups变化')
      console.log(oldValue)
    })

    return {
      groups,
      handleMenuItemClick,
      addGroupDrawer,
      drawerDir,
      createGroupName,
      handleAddGroupBtn
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
    color: #fff !important; // 菜单
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
}
.addGroupDialog {
  height: 50%;
}
</style>
