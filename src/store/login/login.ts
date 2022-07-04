import { Module } from 'vuex'
import { ILoginState } from './types'
import { IRootState } from '../types'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      NodeId: ''
    }
  },
  actions: {
    nodeLoginAction({commit}, payload: any) {
      // 实现登录逻辑
      console.log("执行node Login Action")
      console.log(payload)

      // 请求节点信息
      

      // 请求组信息

      // 跳转到main
    }
  },
  mutations: {},
  getters: {}
}

export default loginModule
