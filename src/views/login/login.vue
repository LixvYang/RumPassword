<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="login">
    <mobileLoginVue class="mobile-nav" />
    <LoginPanel class="pc-nav" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LoginPanel from './cpns/login-panel.vue'
import mobileLoginVue from './cpns/mobile-login.vue'

export default defineComponent({
  components: {
    LoginPanel,
    mobileLoginVue
  },
  setup() {
    return {}
  }
})
</script>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  /* background-color: rgb(59, 62, 64); */
}
</style>

<style scoped>
@media screen and (max-width: 1024px) {
  .pc-nav {
    display: none !important;
  }
}

@media screen and (min-width: 1024px) {
  .mobile-nav {
    display: none !important;
  }
}
</style>
