import firebase from 'firebase'

export default {
  actions: {
    async createRecord({commit, dispatch}, record) {
      try {
      const uid = await dispatch('getUId');
      await firebase.database().ref(`/users/${uid}/record`).push(record);
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    }
  }
}