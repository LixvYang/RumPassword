<template>
  <div class="mob-home">
    <h2>ITEM</h2>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
// .mob-home {
//   position: relative;
//   display: flex;
//   background-color: red;
// }
</style>
