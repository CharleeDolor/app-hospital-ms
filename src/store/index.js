import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    rolesAndPermissions: null,
    selectedDoctor: [],
  },

  getters: {
    getRolesAndPermissions(state){
      return state.rolesAndPermissions;
    },

    getSelectedDoctor(state){
      return state.selectedDoctor;
    },
  },

  mutations: {
    loadRolesAndPermissions(state, payload){
      state.rolesAndPermissions = payload
    },

    loadSelectedDoctor(state, payload){
      state.selectedDoctor = payload
    }
  },

  actions: {
    asyncLoadRolesAndPermissions(context, payload){
      context.commit('loadRolesAndPermissions', payload);
    },

    asyncLoadSelectedDoctor(context, payload){
      context.commit('loadSelectedDoctor', payload);
    }
  },
  modules: {
  },
  
  plugins: [createPersistedState()],
})
