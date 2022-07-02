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
        <el-button @click="runQuorum">运行</el-button>
        <el-button @click="dialogFormVisible = !dialogFormVisible">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue'
import BootStrap from './bootstraps/bootstrap.vue'
import { ElNotification } from 'element-plus'
import { startQuorum } from '@/utils/quorum-wasm/load-quorum'
import localCache from '@/utils/cache/cache'
import { bootstrapsForm } from '../config/node-config'

export default defineComponent({
  components: {
    BootStrap
  },
  setup() {
    const dialogFormVisible = ref(false)
    let form = reactive(localCache.getCache('boot-strap') ?? bootstrapsForm)

    let recoverForm = () => {
      if (localCache.getCache('boot-strap')) {
        localCache.deleteCache('boot-strap')
      }
      ;(form.bootstrap = ''),
        (form.bootstraps = [
          '/ip4/94.23.17.189/tcp/10667/ws/p2p/16Uiu2HAmGTcDnhj3KVQUwVx8SGLyKBXQwfAxNayJdEwfsnUYKK4u',
          '/ip4/139.155.182.182/tcp/33333/ws/p2p/16Uiu2HAmBUxzcXjCydQTcKgpXvmBZc3paQdTT5j8RXp23M7avi1z'
        ])
      localCache.setCache('boot-strap', {
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
      form.bootstraps = form.bootstraps.filter((item: number, i: number) => {
        if (i != index) {
          return item
        }
      })
    }

    const runQuorum = async () => {
      if (localCache.getCache('boot-strap')) {
        localCache.deleteCache('boot-strap')
      }
      localCache.setCache('boot-strap', form)
      await startQuorum(bootstrapsForm.bootstraps)
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
      runQuorum
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
