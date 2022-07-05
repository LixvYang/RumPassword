<template>
  <div class="nav-header">
    NavHeader
    <el-button @click="createGroup">创建群组</el-button>
    <el-button @click="getGroups">得到群组</el-button>
    <el-button @click="IfQuorumRun">是否运行</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  createGroup as createGroupquorum,
  getGroups as getGroupsquorum
} from '@/utils/quorum-wasm/load-quorum'

import { ICreateGroupParams } from '@/utils/quorum-wasm/types'

export default defineComponent({
  setup() {
    const createGroup = () => {
      const params: any = {
        group_name: 'Lixv的群组',
        consensus_type: 'poa',
        encryption_type: 'public',
        app_key: '123456'
      }
      console.log(params)
      CreateGroup(JSON.stringify(params))
    }

    CreateGroup({
      group_name: 'Lixv的群组',
      consensus_type: 'poa',
      encryption_type: 'public',
      app_key: '123456'
    })

    const getGroups = () => {
      console.log(getGroupsquorum())
    }

    const IfQuorumRun = () => {
      console.log(IsQuorumRunning())
    }

    return { createGroup, getGroups, IfQuorumRun }
  }
})
</script>

<style scoped>
</style>
