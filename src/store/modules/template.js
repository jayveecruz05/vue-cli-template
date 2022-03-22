'use strict';

import template from '@/assets/js/api/modules/template';

export default {
  namespaced: true,
  state: {
    template_list: undefined,
    template_details: undefined
  },
  getters: {
    getTemplateList: state => state.template_list,
    getTemplateDetails: state => state.template_details
  },
  mutations: {
    SET_TEMPLATE_LIST(state, payload) {
      state.template_list = payload;
    },
    SET_TEMPLATE_DETAILS(state, payload) {
      state.template_details = payload;
    },
    CLEAR_STATE(state) {
      state.template_lis = undefined;
      state.template_details = undefined;
    }
  },
  actions: {
    fetchTemplate(context, payload) {
      const { config, apiCancelToken } = payload || {};
      return new Promise((resolve, reject) => {
        template.getData({ to: '/template', config, apiCancelToken }).then(
          (response) => {
            // console.log(response);
            context.commit('SET_TEMPLATE_LIST', response.data);
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
    findTemplate(context, payload) {
      const { config, apiCancelToken } = payload || {};
      return new Promise((resolve, reject) => {
        template.getData({ to: '/template', config, apiCancelToken }).then(
          (response) => {
            // console.log(response);
            context.commit('SET_TEMPLATE_DETAILS', response.data);
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
    addTemplate(context, payload) {
      const { data, config, apiCancelToken } = payload || {};
      return new Promise((resolve, reject) => {
        template.postData({ to: '/template', data, config, apiCancelToken }).then(
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
    setTemplate(context, payload) {
      const { data, config, apiCancelToken } = payload || {};
      return new Promise((resolve, reject) => {
        template.putData({ to: '/template', data, config, apiCancelToken }).then(
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
    deleteTemplate(context, payload) {
      const { config, apiCancelToken } = payload || {};
      return new Promise((resolve, reject) => {
        template.deleteData({ to: '/template', config, apiCancelToken }).then(
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