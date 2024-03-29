'use strict';

import mainApi from '@/assets/js/api/modules/main';

// https://docs.vuestorefront.io/v1/guide/vuex/vuex-conventions.html = Vuex Naming Conventions

export default {
  namespaced: true,
  state: {
    users_list: undefined,
    user_details: undefined
  },
  getters: {
    getUsersList: state => state.users_list,
    getUserDetails: state => state.user_details,
  },
  mutations: {
    SET_USERS_LIST(state, payload) {
        state.users_list = payload;
    },
    SET_USER_DETAILS(state, payload) {
        state.user_details = payload;
    },
    CLEAR_STATE(state) {
        state.users_list = undefined;
        state.user_details = undefined;
    }
  },
  actions: {
    fetchUsers(context, payload = {}) {
      const { config, apiCancelToken } = payload;
      return new Promise((resolve, reject) => {
        mainApi.getData({ url: '/users', config, apiCancelToken }).then(
          (response) => {
            // console.log(response);
            context.commit('SET_USERS_LIST', response.data);
            resolve(response);
          }
        ).catch(
          (error) => {
            // console.log(error);
            context.commit('SET_USERS_LIST', undefined);
            context.dispatch('error', error, { root: true });
            reject(error);
          }
        );
      });
    },
    findUser(context, payload = {}) {
      const { id, config, apiCancelToken } = payload;
      return new Promise((resolve, reject) => {
        mainApi.getData({ url: `/user/${id}`, config, apiCancelToken }).then(
          (response) => {
            // console.log(response);
            context.commit('SET_USER_DETAILS', response.data);
            resolve(response);
          }
        ).catch(
          (error) => {
            // console.log(error);
            context.commit('SET_USER_DETAILS', undefined);
            context.dispatch('error', error, { root: true });
            reject(error);
          }
        );
      });
    },
    addUser(context, payload = {}) {
      const { data, config, apiCancelToken } = payload;
      return new Promise((resolve, reject) => {
        mainApi.postData({ url: '/users', data, config, apiCancelToken }).then(
          (response) => {
            // console.log(response);
            resolve(response);
          }
        ).catch(
          (error) => {
            // console.log(error);
            context.dispatch('error', error, { root: true });
            reject(error);
          }
        );
      });
    },
    setUser(context, payload = {}) {
      const { data, config, apiCancelToken } = payload;
      return new Promise((resolve, reject) => {
        mainApi.putData({ url: '/users', data, config, apiCancelToken }).then(
          (response) => {
            // console.log(response);
            resolve(response);
          }
        ).catch(
          (error) => {
            // console.log(error);
            context.dispatch('error', error, { root: true });
            reject(error);
          }
        );
      });
    },
    deleteUser(context, payload = {}) {
      const { config, apiCancelToken } = payload;
      return new Promise((resolve, reject) => {
        mainApi.deleteData({ url: '/users', config, apiCancelToken }).then(
          (response) => {
            // console.log(response);
            resolve(response);
          }
        ).catch(
          (error) => {
            // console.log(error);
            context.dispatch('error', error, { root: true });
            reject(error);
          }
        );
      });
    }
  }
};