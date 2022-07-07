<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
      <span class="title" v-if="!collapse">RumPassword</span>
    </div>
    <el-menu default-active="0" class="el-menu-vertical">
      <template v-for="(group, index) of groups" :key="group" v-if="!collapse">
        <el-menu-item :index="index + ''" @click="handleMenuItemClick(group.group_id)">
          <span>{{ group.group_name }}</span>
        </el-menu-item>
      </template>
      <template v-for="(group, index) of groups" :key="group" v-if="collapse">
        <el-menu-item :index="index + ''">
          <span>{{ group.group_name?.charAt(0) }}</span>
        </el-menu-item>
      </template>
      <!-- <el-button @click="getGroupsInfo">请求组数据</el-button> -->
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  emits: ['reqGroupContent'],
  setup(props, { emit }) {
    const store = useStore()

    const groups = computed(() => store.state.login.groupsInfo.groups)
    const getGroupsInfo = () => {
      console.log(groups)
      for (const group in groups) {
        console.log(group)
      }
    }

    const handleMenuItemClick = (group_id: string | undefined) => {
      emit('reqGroupContent', group_id)
    }

    return {
      getGroupsInfo,
      groups,
      handleMenuItemClick
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
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
