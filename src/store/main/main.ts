import { Module } from 'vuex'
import { IRootState } from '../types'
import { IMainState } from './types'
import { getGroupContent } from '@/service/content/getcontent'
import { GroupContent, Content } from '@/utils/quorum-wasm/types'

const mainModule: Module<IMainState, IRootState> = {
  namespaced: true,
  state() {
    return {
      group: {},
      groupContent: []
    }
  },
  actions: {
    async handleGroupIdAction({ commit }, payload: string | undefined) {
      const groupContent: GroupContent<Content>[] = await getGroupContent(
        payload
      )
      commit('changeGroupContent', groupContent)
    }
  },
  mutations: {
    changeGroupContent(state, groupContent: GroupContent[]) {
      state.groupContent = groupContent
    }
  },
  getters: {}
}

export default mainModule
