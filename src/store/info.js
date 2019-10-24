import firebase from 'firebase'

export default {
  state: {
    info: {},
  },

  getters: {
    info: state => state.info,
  },

  mutations: {
    setInfo(state, info) {
      state.info = info;
    },

    clearInfo(state) {
      state.info = {};
    }
  },

  actions: {
    async fetchInfo({commit, dispatch}) {
      try {
        const uid = await dispatch('getUId');
        const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val();
        commit('setInfo', info);
      } catch (e) {
        dispatch('setError', e);
        throw e;
      }
    },

    async updateInfo({commit, dispatch, getters}, chunk) {
      try {
        const uid = await dispatch('getUId');
        const info = {...getters.info, ...chunk};
        await firebase.database().ref(`/users/${uid}/info`).update(info);
        commit('setInfo', info);
      } catch (e) {
        dispatch('setError', e);
        throw e;
      }
    }
  }
}