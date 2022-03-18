import Vue from 'vue';
import Vuex from 'vuex';

import authentication from './modules/authentication';
import users from './modules/users';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true,
  state: {},
  mutations: {},
  actions: {
    clearState(context) {
      context.commit('authentication/CLEAR_STATE');
      context.commit('users/CLEAR_STATE');
    },
    error(context, payload) {
      // console.log(payload.response);

      // 200 = Success
      // 400 = Bad Request
      // 401 = Authorization Failed
      // 403 = Access Denied
      // 404 = Entity Not Found
      // 419 = Token Expired
      // 422 = Parameter Error
      // 500 = Server Error

      if (payload.response && payload.response.status == 401) {
        this._vm.$eventBus.$emit('clear-data');
      }
    }
  },
  modules: {
    authentication,
    users
  }
});

export default store;