import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Axios from 'axios';

Vue.config.productionTip = false;
Vue.prototype.$http = Axios;

const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token;
}

Vue.prototype.$http.interceptors.response.use(undefined, (err) => {
  if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
    store.dispatch('logout');
    router.push({ name: 'Login' });
  }
  throw err;
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
