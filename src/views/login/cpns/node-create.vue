<template>
  <div class="node-create">
    <p>第一次使用</p>
    <el-button @click="dialogFormVisible = true" type="primary"
      >创建节点</el-button
    >
    <el-dialog class="create-dialog" v-model="dialogFormVisible" title="创建节点" draggable width="300px">
      <p>
        请选择一个文件夹来储存节点数据
        <br />这份数据只是属于你 <br />我们不会储存数据，也无法帮你找回
        <br />请务必妥善保管
      </p>
      <el-button type="primary">选择文件夹</el-button>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'

export default defineComponent({
  setup() {
    const form = reactive({
      name: '',
      region: ''
    })

    const dialogFormVisible = ref(false)
    const formLabelWidth = '140px'

    return {
      dialogFormVisible,
      formLabelWidth,
      form
    }
  }
})
</script>

<style scoped lang="less">
.node-create {
  text-align: center;
  .create-dialog {
    display: flex;
    flex-direction: column;
    align-content: space-between;
  }
}
</style>
