<template>
  <div class="login-panel">
    <div class="node-run">
      <node-run />
    </div>
  </div>
</template>

<script>
import NodeRun from './node-run.vue'
export default {
  components: {
    NodeRun
  }
}
</script>

<style lang="less" scoped>
.login-panel {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgb(59, 62, 64);
  background-image: url('../../../assets/img/rumbig.svg');
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  .node-run {
    position: relative;
    top: 40%;
  }
}
</style>
