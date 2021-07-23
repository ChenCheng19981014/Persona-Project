import { createStore } from 'vuex'

export default createStore({
  state: {
    isLoad: false,
  },
  mutations: {
    changeLoad(state, flag) {
      state.isLoad = flag;
    },
  },
  actions: {
  },
  modules: {
  }
})
