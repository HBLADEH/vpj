import Vue from 'vue'
import Vuex from 'vuex'
import { requestUserInfo } from '@/api/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      username: '',
      authorities: [],
      accessMenu: [],
    },
    source: {
      token: null,
      cancel: null,
    },
  },
  mutations: {
    setUser(state, { user }) {
      state.user.username = user.username
      state.user.authorities = user.authorities
      state.user.accessMenu = user.accessMenu
    },
    deleteUser(state) {
      state.user.username = ''
      state.user.authorities = []
      state.user.accessMenu = []
    },
    updateSource(state, { source }) {
      state.source = source
    },
  },
  actions: {
    requestUserInfo({ commit }) {
      return requestUserInfo().then((user) => {
        // console.log(user)
        commit('setUser', { user })
      })
    },
  },
})
