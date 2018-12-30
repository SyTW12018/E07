import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: "adf",
    surname: "",
    username: "",
    email: "",
    token: ""
  },
  mutations: {
    setName(state, payload) {
      state.name = payload;
    },
    setSurname(state, payload) {
      state.surname = payload;
    },
    setUsername(state, payload) {
      state.username = payload;
    },
    setEmail(state, payload) {
      state.email = payload;
    },
    setToken(state, payload) {
      state.token = payload;
    }
  },
  actions: {

  },
  getters: {
    name(state) {
      return state.name;
    },
    surname(state) {
      return state.surname;
    },
    email(state) {
      return state.email;
    },
    token(state) {
      return state.token;
    },
    username(state) {
      return state.username;
    }

  }
})
