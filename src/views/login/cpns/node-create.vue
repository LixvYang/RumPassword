<template>
  <div class="node-create">
    <p>第一次使用</p>
    <el-button @click="dialogFormVisible = true" type="primary"
      >创建节点</el-button
    >
    <el-dialog
      class="create-dialog"
      v-model="dialogFormVisible"
      title="创建节点"
      draggable
      width="400px"
    >
      <p>
        请选择一个文件夹来储存节点数据
        <br />这份数据只是属于你 <br />我们不会储存数据，也无法帮你找回
        <br />请务必妥善保管
      </p>

      <!-- <el-button type="primary" @change="openFolder($event)" round>选择文件夹</el-button> -->
      <!-- <input type="  file" webkitdirectory name="filename" id="open" style="display:none" /> -->
      <!-- <el-input placeholder="请输入内容" v-model="form.imgSavePath" class="input-with-select">
            <el-button slot="append" icon="el-icon-folder" type="success" @click="btnChange"></el-button>
      </el-input>-->
      <!-- <input type="file" @change="triggerFile($event)" webkitdirectory directory /> -->
      <!-- <el-input type="file" webkitdirectory @change="handleFolderChange"></el-input> -->
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'

export default defineComponent({
  setup() {
    let form = reactive({
      imgSavePath: ''
    })
    const dialogFormVisible = ref(false)
    const formLabelWidth = '140px'

    const openFolder = (event: any) => {
      // const open = document.getElementsByName('filename')
      // open.click()
      // const dirName = path.dirname(open?.files[0])
      // console.log(dirName)
      let file = event.target.files
      console.log(file)
    }

    const triggerFile = (event: any) => {
      let file = event.target.files
      console.log(file.path)
    }

    const handleFolderChange = (e: any) => {
      console.log('传入文件夹')
      console.log(e)
    }

    return {
      dialogFormVisible,
      formLabelWidth,
      form,
      openFolder,
      triggerFile,
      handleFolderChange
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
