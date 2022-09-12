<template>
  <div class="mob-header">
    <h2>密码库</h2>
    <!-- <div class="mob-header-nodeinfo">
      <el-button circle size="middle">
        <el-icon size="15px"><User /></el-icon>
      </el-button>
    </div> -->
    <div class="mob-header-search">
      <el-button circle size="large">
        <el-icon size="20px"><Search /></el-icon>
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
            <el-dropdown-item>同步</el-dropdown-item>
            <el-dropdown-item>Action 3</el-dropdown-item>
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
  </div>
</template>

<script lang="ts">
import { INodeInfo } from '@/utils/quorum-wasm/types'
import { defineComponent, reactive, ref } from 'vue'
import localCache from '@/utils/cache/cache'

export default defineComponent({
  setup() {
    const nodeInfoDialog = ref(false)

    const nodeInfo: INodeInfo = reactive(localCache.getCache('nodeInfo') ?? '')

    return { nodeInfoDialog, nodeInfo }
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
    right: 15%;
    top: 200%;
    display: flex;
  }
  .mob-header-more {
    display: flex;
    position: absolute;
    right: 0%;
    top: 200%;
  }
}
</style>
