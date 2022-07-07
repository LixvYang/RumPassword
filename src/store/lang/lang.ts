import cache from '@/utils/cache/cache'
import { Module } from 'vuex'
import { IRootState } from '../types'
import { ILangState } from './types'

const langModule: Module<ILangState, IRootState> = {
  state() {
    return {
      language: cache.getCache('localeLang') || 'zhCn'
    }
  },
  mutations: {
    CHANGE_LANGUAGE(state, value: string) {
      state.language = value
      cache.setCache('localeLang', value)
    }
  }
}

export default langModule
