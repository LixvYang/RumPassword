import { Module } from 'vuex'
import { IRootState } from '../types'
import { IMainState } from './types'
import {
  GroupContent,
  Content,
  NewContent,
  GroupContentData
} from '@/utils/quorum-wasm/types'
import { getGroupContent } from '@/service/content/getcontent'

const mainModule: Module<IMainState, IRootState> = {
  namespaced: true,
  state() {
    return {
      nodeLoading: false,
      groupId: '',
      groupContent: [],
      newGroupContent: [],
      groupName: ''
    }
  },
  actions: {
    async handleGroupIdAction({ commit, dispatch }, payload: string) {
      commit('clearNewGroupContent')
      commit('clearNewGroupName')
      const groupContent: GroupContentData = await getGroupContent(payload)
      commit('changeGroupId', payload)
      dispatch('handleGroupName')
      commit('changeGroupContent', groupContent)
      commit('changeNewGroupContent', groupContent)
    },
    handleGroupName(store, config = {}) {
      const { state, commit, rootState } = store
      rootState.login.groupsInfo.groups?.forEach((group: any) => {
        if (group.group_id === state.groupId) {
          commit('changeGroupName', group.group_name)
        }
      })
    }
  },
  mutations: {
    clearNewGroupContent(state) {
      state.newGroupContent = []
    },
    clearNewGroupName(state) {
      state.groupName = ''
    },
    changeGroupContent(state, groupContent: GroupContentData) {
      state.groupContent = groupContent.data
    },
    changeGroupId(state, groupId: string) {
      state.groupId = groupId
    },
    changeNewGroupContent(state, groupContentData: GroupContentData) {
      if (!groupContentData) {
        console.log('groupContent 为空')
        return
      }
      const groupContent = groupContentData.data
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
    },
    changeGroupName(state, groupName: string) {
      state.groupName = groupName
    }
  },
  getters: {}
}

export default mainModule
