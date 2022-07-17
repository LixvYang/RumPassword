import { createStore, Store, useStore as useVuexStore } from 'vuex'
import login from './login/login'
import lang from './lang/lang'
import main from './main/main'
import { IRootState, IStoreType } from './types'

const store = createStore<IRootState>({
  state() {
    return {}
  },
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    login,
    lang,
    main
  }
})

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
