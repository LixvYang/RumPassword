<template>
  <div class="node-run">
    <button class="node-runbtn" @click="dialogFormVisible = true">
      在浏览器中运行
    </button>

    <el-dialog
      class="create-dialog"
      v-model="dialogFormVisible"
      title="Bootstraps"
      draggable
      width="45%"
      center
    >
      <div class="bootstraps">
        <div>
          <ul>
            <boot-strap :form="form" @deleteBootstrap="deleteBootstrap" />
          </ul>
        </div>
      </div>
      <div class="footer">
        <el-input type="textarea" v-model="form.bootstrap"></el-input>
        <el-button @click="addBootstrap" circle>
          <el-icon color="#529b2e">
            <Plus />
          </el-icon>
        </el-button>
      </div>
      <template #footer>
        <el-tooltip content="恢复默认">
          <el-button @click="recoverForm" circle>
            <el-icon color="#409EFF">
              <RefreshRight />
            </el-icon>
          </el-button>
        </el-tooltip>
        <el-button @click="loginAction">运行</el-button>
        <el-button @click="dialogFormVisible = !dialogFormVisible"
          >cancel</el-button
        >
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue'
import { useStore } from 'vuex'
import BootStrap from './bootstraps/bootstrap.vue'
import { ElLoading, ElNotification } from 'element-plus'
import localCache from '@/utils/cache/cache'
import { IBootstrap, bootstrapsForm } from '../config/node-config'
import { RumLoading } from '@/global/loading'

export default defineComponent({
  components: {
    BootStrap
  },
  setup() {
    const store = useStore()

    const dialogFormVisible = ref(false)
    const form: IBootstrap = reactive(bootstrapsForm)

    const recoverForm = () => {
      if (localCache.getCache('WASM_BOOTSTRAP_STORAGE_KEY')) {
        localCache.deleteCache('WASM_BOOTSTRAP_STORAGE_KEY')
      }
      form.bootstrap = ''
      form.bootstraps = [
        '/ip4/94.23.17.189/tcp/10667/ws/p2p/16Uiu2HAmGTcDnhj3KVQUwVx8SGLyKBXQwfAxNayJdEwfsnUYKK4u',
        '/ip4/139.155.182.182/tcp/33333/ws/p2p/16Uiu2HAmBUxzcXjCydQTcKgpXvmBZc3paQdTT5j8RXp23M7avi1z'
      ]
      localCache.setCache('WASM_BOOTSTRAP_STORAGE_KEY', {
        bootstraps: [
          '/ip4/94.23.17.189/tcp/10667/ws/p2p/16Uiu2HAmGTcDnhj3KVQUwVx8SGLyKBXQwfAxNayJdEwfsnUYKK4u',
          '/ip4/139.155.182.182/tcp/33333/ws/p2p/16Uiu2HAmBUxzcXjCydQTcKgpXvmBZc3paQdTT5j8RXp23M7avi1z'
        ]
      })
    }

    const addBootstrap = () => {
      if (form.bootstrap != '') {
        form.bootstraps.push(form.bootstrap)
        form.bootstrap = ''
      } else {
        ElNotification({
          title: 'Info',
          message: 'bootstrap不能为空',
          type: 'info'
        })
      }
    }

    const deleteBootstrap = (index: number) => {
      form.bootstraps = form.bootstraps.filter((item, i) => {
        if (i != index) {
          return item
        }
      })
    }

    const loginAction = () => {
      if (localCache.getCache('WASM_BOOTSTRAP_STORAGE_KEY')) {
        localCache.deleteCache('WASM_BOOTSTRAP_STORAGE_KEY')
      }
      localCache.setCache('WASM_BOOTSTRAP_STORAGE_KEY', form.bootstraps)

      RumLoading(true, 'Node runing...')
      store.dispatch('login/nodeLoginAction', { ...form })
    }

    watch(form, (oldValue, newValue) => {
      if (newValue.bootstraps.length == 0) {
        ElNotification({
          title: 'Info',
          message: 'bootstraps不能为空',
          type: 'info'
        })
      }
    })

    return {
      form,
      dialogFormVisible,
      addBootstrap,
      deleteBootstrap,
      recoverForm,
      loginAction
    }
  }
})
</script>

<style scoped lang="less">
.node-run {
  text-align: center;
  .footer {
    display: flex;
  }

  .node-runbtn {
    padding: 0.6em 2em;
    border: none;
    outline: none;
    color: rgb(255, 255, 255);
    background: #111;
    cursor: pointer;
    position: relative;
    z-index: 0;
    border-radius: 10px;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
  }

  .node-runbtn:before {
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
    animation: glowing-node-runbtn 20s linear infinite;
    transition: opacity 0.3s ease-in-out;
    border-radius: 10px;
  }

  @keyframes glowing-node-runbtn {
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

  .node-runbtn:after {
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
