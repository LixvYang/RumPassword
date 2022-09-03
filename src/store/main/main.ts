import { Module } from 'vuex'
import { IRootState } from '../types'
import { IMainState } from './types'
import { getGroupContent } from '@/service/content/getcontent'
import { GroupContent, Content, NewContent } from '@/utils/quorum-wasm/types'

const mainModule: Module<IMainState, IRootState> = {
  namespaced: true,
  state() {
    return {
      nodeLoading: false,
      group: {},
      groupId: '',
      groupContent: [],
      newGroupContent: []
    }
  },
  actions: {
    async handleGroupIdAction({ commit }, payload: string | undefined) {
      commit('clearNewGroupContent')
      const groupContent: GroupContent<Content>[] = await getGroupContent(
        payload
      )
      commit('changeGroupId', payload)
      commit('changeGroupContent', groupContent)
      commit('changeNewGroupContent', groupContent)
    }
  },
  mutations: {
    clearNewGroupContent(state) {
      state.newGroupContent = []
    },
    changeGroupContent(state, groupContent: GroupContent[]) {
      state.groupContent = groupContent
    },
    changeGroupId(state, groupId: string) {
      state.groupId = groupId
    },
    changeNewGroupContent(state, groupContent: GroupContent[]) {
      for (let i = 0; i < groupContent.length; i++) {
        if (!groupContent[i].Content?.id) {
          const NewContentend: NewContent = {
            name: groupContent[i]?.Content?.name,
            content: groupContent[i]?.Content?.content
          }
          state.newGroupContent.push(NewContentend)
        } else if (
          groupContent[i]?.Content?.id &&
          groupContent[i]?.Content?.content != 'DELETED_CONTENT'
        ) {
          const changedIdx = (state.newGroupContent || []).findIndex(
            (newgrpctn) => newgrpctn.name === groupContent[i]?.Content?.name
          )
          state.newGroupContent[changedIdx].content =
            groupContent[i].Content?.content
        } else if (
          groupContent[i]?.Content?.id &&
          groupContent[i]?.Content?.content == 'DELETED_CONTENT'
        ) {
          const changedIdx = (state.newGroupContent || []).findIndex(
            (newgrpctn) => newgrpctn.name === groupContent[i]?.Content?.name
          )
          state.newGroupContent.splice(changedIdx, 1)
        }
      }
    },
    changeNodeLoading(state, loading: boolean) {
      state.nodeLoading = loading
    }
  },
  getters: {}
}

export default mainModule
