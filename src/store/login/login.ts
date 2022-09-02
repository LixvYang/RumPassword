import { Module } from 'vuex'
import { ILoginState } from './types'
import { IRootState } from '../types'
import { startQuorum } from '@/utils/quorum-wasm/load-quorum'
import { IBootstrap } from '@/views/login/config/node-config'
import { IGroupsInfo, INodeInfo } from '@/utils/quorum-wasm/types'
import router from '@/router'
import { getGroups } from '@/service/groups/getgroups'
import { getNodeInfo } from '@/service/node/getnodeinfo'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      nodeLoading: false,
      nodeInfo: {},
      groupsInfo: {}
    }
  },
  actions: {
    async nodeLoginAction({ commit }, payload: IBootstrap) {
      // 实现登录逻辑
      // 创建节点
      await startQuorum(payload.bootstraps)
      // 将nodeLoading 设置为true
      commit('changeNodeLoading', true)
      // 请求节点信息
      const nodeInfo: INodeInfo = await getNodeInfo()
      commit('changeNodeInfo', nodeInfo)
      localStorage.setItem('nodeInfo', JSON.stringify(nodeInfo))
      // 请求组信息
      const groupsInfo: IGroupsInfo = await getGroups()
      commit('changeGroupsInfo', groupsInfo)
      localStorage.setItem('groupsInfo', JSON.stringify(groupsInfo))

      // 跳转到main
      router.push('/main')
    }
  },
  mutations: {
    changeNodeInfo(state, nodeInfo: INodeInfo) {
      state.nodeInfo = nodeInfo
    },
    changeGroupsInfo(state, groupsInfo: IGroupsInfo) {
      console.log('请求到了groups info')
      state.groupsInfo = groupsInfo
    },
    changeNodeLoading(state, loading: boolean) {
      state.nodeLoading = loading
    }
  },
  getters: {}
}

export default loginModule
