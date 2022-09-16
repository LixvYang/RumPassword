<template>
  <div class="mob-header">
    <h2>密码库</h2>
    <div class="mob-header-search">
      <el-button circle size="large" @click="nodeInfoDialog = true">
        <el-icon size="20px"><User /></el-icon>
      </el-button>
    </div>
    <div class="mob-header-more">
      <el-dropdown>
        <el-button circle size="large">
          <el-icon size="20px"><More /></el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="nodeInfoDialog = true"
              >节点信息</el-dropdown-item
            >
            <el-dropdown-item @click="groupstartSync">同步</el-dropdown-item>
            <el-dropdown-item @click="networkDialog = true"
              >网络信息</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <el-dialog
      v-model="nodeInfoDialog"
      title="节点信息"
      width="90%"
      destroy-on-close
      center
      draggable
    >
      <template v-for="(val, key) in nodeInfo" :key="key">
        <div v-if="key !== 'peers'">
          <span class="nodeinfo-key">{{ key }}:</span>
          <span class="nodeinfo-val" style="color: yellowgreen">{{ val }}</span>
        </div>
        <template v-if="key === 'peers'">
          <div>
            <span class="nodeinfo-key">{{ key }}: </span>
            <span class="nodeinfo-val">
              <template v-for="(v, k) in val" :key="k">
                <span>{{ k }} : </span>
                <span style="color: yellowgreen">{{ v }}</span>
              </template>
            </span>
          </div>
        </template>
      </template>
    </el-dialog>

    <el-dialog
      v-model="networkDialog"
      title="Network信息"
      width="90%"
      destroy-on-close
      center
      draggable
    >
      <template v-for="(val, key) in networkInfo" :key="key">
        <div v-if="key !== 'addrs' && key !== 'groups'">
          <span class="nodeinfo-key">{{ key }}:</span>
          <span class="nodeinfo-val" style="color: yellowgreen">{{ val }}</span>
        </div>
        <template v-else-if="key === 'groups'">
          <div>
            <span class="nodeinfo-key">{{ key }}: </span>
            <span class="nodeinfo-val">
              <template v-for="(v, k) in val" :key="k">
                <span>{{ k }} : </span>
                <span style="color: yellowgreen">{{ v }}</span>
              </template>
            </span>
          </div>
        </template>
        <template v-else-if="key === 'addrs'">
          <div>
            <span class="nodeinfo-key">{{ key }}: </span>
            <span class="nodeinfo-val">
              <template v-for="(v, k) in val" :key="k">
                <span>{{ k }} : </span>
                <span style="color: yellowgreen">{{ v }}</span>
              </template>
            </span>
          </div>
        </template>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { INetworkInfo, INodeInfo } from '@/utils/quorum-wasm/types'
import { defineComponent, reactive, ref, computed } from 'vue'
import localCache from '@/utils/cache/cache'
import { useStore } from '@/store'
import groupStartSync from '@/service/network/groupstartsync'

export default defineComponent({
  setup() {
    const nodeInfoDialog = ref(false)
    const networkDialog = ref(false)
    const store = useStore()

    const nodeInfo: INodeInfo = reactive(localCache.getCache('nodeInfo') ?? '')
    const networkInfo: INetworkInfo = reactive(
      localCache.getCache('networkInfo') ?? ''
    )
    const selectGroupId = computed(() => store.state.main.groupId)
    const groupstartSync = () => {
      if (!selectGroupId.value) {
        alert('Please select group')
      }
      groupStartSync(selectGroupId.value)
    }
    return {
      nodeInfoDialog,
      networkDialog,
      networkInfo,
      nodeInfo,
      groupstartSync
    }
  }
})
</script>

<style scoped lang="less">
.mob-header {
  display: flex;
  width: 100%;
  position: relative;
  .mob-header-search {
    position: absolute;
    right: 20%;
    top: 20%;
    display: flex;
  }
  .mob-header-more {
    display: flex;
    position: absolute;
    right: 5%;
    top: 20%;
  }
}
</style>
