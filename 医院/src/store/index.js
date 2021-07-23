import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoad: false,
    change: {},
  },
  mutations: {
    changeLoad(state, flag) {
      state.isLoad = flag;
    },
  },
  actions: {},
  modules: {},
});
