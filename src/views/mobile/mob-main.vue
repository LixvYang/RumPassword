<template>
  <div class="mob-main">
    <el-container>
      <el-header class="mob-header"><MobHeader /></el-header>
      <el-main class="mob-home"><MobHome /></el-main>
      <el-footer class="mob-footer">Footer</el-footer>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MobHeader from '@/components/nav-header'
import MobHome from '@/components/home'

export default defineComponent({
  components: { MobHeader, MobHome },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.mob-main {
  // margin: auto;
  display: flex;
  position: absolute;
  .mob-header {
    position: relative;
    width: 100%;
    height: 8%;
    color: rgb(255, 255, 255);
    background-color: #79bbff;
  }
  .mob-home {
    position: relative;
    width: 100%;
    color: aquamarine;
    // background-color: rgb(56, 175, 54);
  }
  .mob-footer {
    position: relative;
    width: 100%;
    color: aquamarine;
    // background-color: red;
  }
}
</style>
