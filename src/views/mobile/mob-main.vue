<template>
  <div class="mob-main">
    <MobHeader class="mob-header" />
    <MobHome class="mob-home" />
    <!-- <MobFooter class="mob-footer" /> -->
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
  .mob-header {
    display: flex;
    width: 100%;
    height: 10%;
    color: rgb(255, 255, 255);
    background-color: #79bbff;
  }
  // .mob-home {
  //   position: relative;
  //   height: 100%;
  //   width: 100%;
  //   color: aquamarine;
  //   // background-color: rgb(56, 175, 54);
  // }
  // .mob-footer {
  //   position: relative;
  //   width: 100%;
  //   color: aquamarine;
  //   // background-color: red;
  // }
}
</style>
