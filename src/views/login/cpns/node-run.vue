<template>
  <div class="node-run">
    <el-button @click="dialogFormVisible = true" type="primary">在浏览器中运行</el-button>

    <el-dialog
      class="create-dialog"
      v-model="dialogFormVisible"
      title="Bootstraps"
      draggable
      width="600px"
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
        <el-button @click="dialogFormVisible = !dialogFormVisible">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue'
import { useStore } from 'vuex'
import BootStrap from './bootstraps/bootstrap.vue'
import { ElNotification } from 'element-plus'
import localCache from '@/utils/cache/cache'
import { IBootstrap, bootstrapsForm } from '../config/node-config'

export default defineComponent({
  components: {
    BootStrap
  },
  setup() {
    const store = useStore()

    const dialogFormVisible = ref(false)
    let form: IBootstrap = reactive(
      localCache.getCache('WASM_BOOTSTRAP_STORAGE_KEY') ?? bootstrapsForm
    )

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
        bootstrap: '',
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
      localCache.setCache('WASM_BOOTSTRAP_STORAGE_KEY', form)

      // 登录验证
      store.dispatch('login/nodeLoginAction', { ...form.bootstraps })
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
}
</style>
