<template>
  <div class="mobile-login">
    <button class="login-btn" role="button" @click="loginAction">
      在浏览器中运行
    </button>
  </div>
</template>

<script lang="ts">
import { RumLoading } from '@/global/loading'
import store from '@/store'
import { defineComponent } from 'vue'
import { bootstrapsForm } from '../config/node-config'

export default defineComponent({
  setup() {
    const loginAction = () => {
      RumLoading(true, 'Node Running...')
      store.dispatch('login/nodeLoginAction', bootstrapsForm)
    }
    return {
      loginAction
    }
  }
})
</script>

<style scoped lang="less">
.mobile-login {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-image: url('../../../assets/img/rumbig.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  background-color: rgb(59, 62, 64);
  .login-btn {
    padding: 0.9em 2em;
    position: relative;
    top: 30%;
    border: none;
    outline: none;
    color: rgb(255, 255, 255);
    background: #111;
    cursor: pointer;
    z-index: 0;
    border-radius: 10px;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
  }

  .login-btn:before {
    content: '';
    background: linear-gradient(
      45deg,
      #ff0000,
      #ff7300,
      #fffb00,
      #48ff00,
      #00ffd5,
      #002bff,
      #7a00ff,
      #ff00c8,
      #ff0000
    );
    position: absolute;
    top: -2px;
    left: -2px;
    background-size: 400%;
    z-index: -1;
    filter: blur(5px);
    -webkit-filter: blur(5px);
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    animation: glowing-login-btn 20s linear infinite;
    transition: opacity 0.3s ease-in-out;
    border-radius: 10px;
  }

  @keyframes glowing-login-btn {
    0% {
      background-position: 0 0;
    }
    50% {
      background-position: 400% 0;
    }
    100% {
      background-position: 0 0;
    }
  }

  .login-btn:after {
    z-index: -1;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: #222;
    left: 0;
    top: 0;
    border-radius: 10px;
  }
}
</style>
