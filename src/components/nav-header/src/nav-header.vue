<template>
  <div class="nav-header">
    <DArrowLeft
      v-if="!isFold"
      class="fold-menu"
      @click="handleFoldClick"
    ></DArrowLeft>
    <DArrowRight
      v-if="isFold"
      class="fold-menu"
      @click="handleFoldClick"
    ></DArrowRight>
    <div>vue3-app {{ $t('home.name') }}</div>
    <el-button @click="getgroups">请求群组</el-button>
    <el-button @click="getnodeinfo">请求节点信息</el-button>

    <el-dropdown @command="handleCommand" class="nav-lang">
      <span class="el-dropdown-link">
        <el-button>
          {{ langType[language as keyof typeof langType] }}
          <!-- 切换语言 -->
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </el-button>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="zhCn">中文</el-dropdown-item>
          <el-dropdown-item command="en">English</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { getGroups } from '@/service/groups/getgroups'
import { getNodeInfo } from '@/service/node/getnodeinfo'
import { useStore } from '@/store'
import { useI18n } from 'vue-i18n'
import { langType } from '../index'

export default defineComponent({
  emits: ['foldChange'],
  setup(props, { emit }) {
    const store = useStore()
    const isFold = ref(false)

    const getgroups = () => {
      getGroups().then((res) => {
        console.log(res)
      })
    }

    const getnodeinfo = () => {
      getNodeInfo().then((res) => {
        console.log(res)
      })
    }

    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }

    const language = computed(() => store.state.lang.language)
    const { locale } = useI18n()
    const handleCommand = (value: string) => {
      console.log(value)
      locale.value = value
      store.commit('CHANGE_LANGUAGE', value)
    }

    return {
      isFold,
      handleFoldClick,
      getgroups,
      getnodeinfo,
      handleCommand,
      language,
      langType
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
    width: 1em;
    height: 1em;
    margin-right: 8px;
  }
  .nav-lang {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
}
</style>
