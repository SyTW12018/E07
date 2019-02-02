import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    user: JSON.parse(localStorage.getItem('user')) || {},
    token: localStorage.getItem('token') || ''
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading'
    },
    auth_success(state, { token, user }) {
      state.status = 'success';
      state.token = token;
      state.user = user;
    },
    auth_error(state) {
      state.status = 'error'
    },
    logout(state) {
      state.status = '';
      state.token = '';
      state.user = {};
    }
  },
  actions: {
    async login({ commit }, user) {
      commit('auth_request');
      let url = "/api/login";
      let params = {
        email: user.email,
        password: user.password
      };
      let message;
      let resType;
      await axios.post(url, params).then(res => {
        const token = res.data.token
        const user = res.data.user
        localStorage.setItem('token', token);
        localStorage.setItem(
          "user",
          JSON.stringify({
            _id: res.data.user._id,
            name: res.data.user.name,
            surname: res.data.user.surname,
            username: res.data.user.username,
            email: res.data.user.email,
            description: res.data.user.description
          })
        );
        axios.defaults.headers.common['Authorization'] = token;
        commit('auth_success', { token, user });
        resType = 'success';
        message = res.data.message;
      })
        .catch(err => {
          commit('auth_error')
          localStorage.removeItem('token')
          resType = 'error';
          message = err.response.data.message;
        })
      return { resType: resType, message: message };
    },
    logout({ commit }) {
      commit('logout');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      delete axios.defaults.headers.common['Authorization'];
    },
    async updateInfo({ commit }, update) {
      commit('auth_request');
      let resType;
      let message;
      await axios
        .put("/api/updateUser", update)
        .then(res => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          delete axios.defaults.headers.common['Authorization'];
          const token = res.data.token
          const user = res.data.user
          localStorage.setItem('token', token);
          localStorage.setItem(
            "user",
            JSON.stringify({
              _id: res.data.user._id,
              name: res.data.user.name,
              surname: res.data.user.surname,
              username: res.data.user.username,
              email: res.data.user.email,
              description: res.data.user.description
            })
          );
          axios.defaults.headers.common['Authorization'] = token;
          commit('auth_success', { token, user });
          resType = 'success';
          message = res.data.message;
        })
        .catch(err => {
          console.log(err);
          commit('auth_error')
          resType = 'error';
          message = err.response.data.message;
        })

      return { resType: resType, message: message };

    }
  },
  getters: {
    isLoggedIn: (state) => {
      return !!state.token;
    },
    authStatus: (state) => {
      return state.status;
    },
    user(state) {
      return state.user;
    },
    token(state) {
      return state.token;
    }
  }
})
