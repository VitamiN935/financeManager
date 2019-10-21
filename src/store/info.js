export default {
  state: {
    info: {},
  },

  mutations: {
    setInfo(state, info) {
      state.info = info;
    },

    clearInfo(state) {
      state.info = {};
    }
  }
}