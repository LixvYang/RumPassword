<template>
  <div class="node-run">
    <el-button @click="dialogFormVisible = true" type="primary">在浏览器中运行</el-button>

    <el-dialog
      class="create-dialog"
      v-model="dialogFormVisible"
      title="创建节点"
      draggable
      width="600px"
    >
      <el-form :model="form" label-width="120px">
        <el-form-item label="peername">
          <el-input v-model="form.peername" />
        </el-form-item>
        <el-form-item label="listen">
          <el-input v-model="form.listen" />
        </el-form-item>
        <el-form-item label="apilisten">
          <el-input v-model="form.apilisten" />
        </el-form-item>
        <el-form-item label="peername">
          <el-input v-model="form.peername" />
        </el-form-item>
        <el-form-item label="peer">
          <el-input v-model="form.peer" />
        </el-form-item>
        <el-form-item label="configdir">
          <el-input v-model="form.configdir" />
        </el-form-item>
        <el-form-item label="datadir">
          <el-input v-model="form.datadir" />
        </el-form-item>
        <el-form-item label="keystoredir">
          <el-input v-model="form.keystoredir" />
        </el-form-item>
        <el-form-item label="jsontracer">
          <el-input v-model="form.jsontracer" />
        </el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="dialogFormVisible=false">Cancel</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'

export default defineComponent({
  setup() {
    const dialogFormVisible = ref(false)
    const form = reactive({
      peername: 'owner',
      listen: '/ip4/127.0.0.1/tcp/7002',
      apilisten: ':8002',
      peer: '/ip4/127.0.0.1/tcp/10666/p2p/16Uiu2HAm6xd9nfcmXg37ont8VuG5swRA8vCYv8tXfzcAo7h9djLy',
      configdir: 'config',
      datadir: 'data',
      keystoredir: 'keystoredir',
      jsontracer: 'ownertracer.json'
    })
    const onSubmit = (e: any) => {
      console.log(e)
    }

    return {
      form,
      dialogFormVisible,
      onSubmit
    }
  }
})
</script>

<style scoped>
.node-run {
  text-align: center;
}
</style>
