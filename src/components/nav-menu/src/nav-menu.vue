<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
      <span class="title">RumPassword</span>
    </div>
    <el-menu default-active="2" class="el-menu-vertical">
      <template v-for="group in groups" :key="group.groupId">
        {{group.groupID}}
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import {useStore} from '@/store'

export default defineComponent({
  setup() {
    const store = useStore()

    const groups = computed(() => store.state.login.groupsInfo.groups)


    return {
      groups
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

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }
}
</style>
