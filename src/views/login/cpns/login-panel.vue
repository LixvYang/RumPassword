<template>
  <div class="login-panel">
    <h1 class="title">RumPassword</h1>
    <el-tabs
      :tab-position="tabPosition"
      style="height: 100px"
      class="demo-tabs"
    >
      <el-tab-pane>
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><CirclePlus /></el-icon>
            <span>创建节点</span>
          </span>
        </template>
        <node-create />
      </el-tab-pane>

      <el-tab-pane>
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><Folder /></el-icon>
            <span>登录节点</span>
          </span>
        </template>
        已经拥有节点
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import NodeCreate from './node-create.vue'
export default {
  components: {
    NodeCreate
  },
  setup() {
    const tabPosition = 'left'

    return {
      tabPosition
    }
  }
}
</script>

<style lang="less" scoped>
.login-panel {
  margin-bottom: 150px;
  width: 320px;
  .title {
    text-align: center;
  }
}
</style>
