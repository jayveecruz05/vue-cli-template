'use strict';

// import authentication from '@/assets/js/api/modules/authentication';

export default {
  namespaced: true,
  state: {
    token: undefined,
    user_info: undefined
  },
  getters: {
    getToken: state => state.token,
    getUserInfo: state => state.user_info
  },
  mutations: {
    SET_TOKEN(state, payload) {
      state.token = payload;
    },
    SET_USER_INFO(state, payload) {
      state.user_info = payload;
    },
    CLEAR_STATE(state) {
      state.token = undefined;
      state.user_info = undefined;
    }
  },
  actions: {
    setToken(context, payload) {
      context.commit('SET_TOKEN', payload);
    },
    login(context) {
      // const { data, config, apiCancelToken } = payload || {};
      return new Promise((resolve) => {
        const token = window.btoa(Math.floor(Math.random() * Date.now()).toString(36).substr(2)); // Encode To Base64
        context.commit('SET_TOKEN', token);
        resolve({ token });
        // authentication.postData({ to: '/auth', data, config, apiCancelToken }).then(
        //   (response) => {
        //     // console.log(response);
        //     context.commit('SET_TOKEN', response.token);
        //     resolve(response);
        //   }
        // ).catch(
        //   (error) => {
        //     // console.log(error);
        //     context.dispatch('error', error, { root: true });
        //     reject(error);
        //   }
        // );
      });
    },
    // fetchUserInfo(context, payload) {
    //   const { config, apiCancelToken } = payload || {};
    //   return new Promise((resolve, reject) => {
    //     authentication.getData({ to: '/auth/me', config, apiCancelToken }).then(
    //       (response) => {
    //         // console.log(response);
    //         context.commit('SET_USER_INFO', response.data);
    //         resolve(response);
    //       }
    //     ).catch(
    //       (error) => {
    //         // console.log(error);
    //         context.dispatch('error', error, { root: true });
    //         reject(error);
    //       }
    //     );
    //   });
    // }
  }
};