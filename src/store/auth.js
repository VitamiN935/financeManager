import firebase from 'firebase/app'

export default {
  actions: {
    async login({ commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },

    async logout({commit}) {
      await firebase.auth().signOut();
      commit('clearInfo');
    },

    async register({ commit, dispatch }, { email, password, name }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const uid = await dispatch('getUId');
        await firebase.database().ref(`/users/${uid}/info`).set({
          bill: 10000,
          name
        })
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },

    getUId() {
      const user = firebase.auth().currentUser;
      return user ? user.uid : null;
    }
  }
}