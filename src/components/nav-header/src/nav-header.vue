<template>
  <div class="nav-header">
    <DArrowLeft v-if="!isFold" class="fold-menu" @click="handleFoldClick"></DArrowLeft>
    <DArrowRight v-if="isFold" class="fold-menu" @click="handleFoldClick"></DArrowRight>

    <el-button @click="getgroups">请求群组</el-button>
    <el-button @click="getnodeinfo">请求节点信息</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { getGroups } from '@/service/groups/getgroups'
import { getNodeInfo } from '@/service/node/getnodeinfo'

export default defineComponent({
  emits: ['foldChange'],
  setup(props, { emit }) {
    const isFold = ref(false)

    const getgroups = () => {
      getGroups().then((res) => {
        console.log(res)
      })
    }

    const getnodeinfo = () => {
      getNodeInfo().then((res) => {
        console.log(res)
      })
    }

    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }

    return { isFold, handleFoldClick, getgroups, getnodeinfo }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
    width: 1em;
    height: 1em;
    margin-right: 8px;
  }
}
</style>
