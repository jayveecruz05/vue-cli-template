'use strict';

// Vue
import Vue from 'vue';

// Axios
import Axios from 'axios';

const api = (instanceConfig) => {
  const { baseURL, headers } = instanceConfig || {};

  const vm = new Vue({ name: 'app-api' });
  
  let CancelToken = Axios.CancelToken,
      cancelApiCall = {},
      generateID = () => (Math.floor(Math.random() * Date.now()).toString(36).substr(2));
  
  // Process ENV Details
  // console.log(process.env);
  
  // Create New Axios Instance And Default Configurations
  const axiosInstance = Axios.create({ baseURL, headers });
  
  // console.log(axiosInstance.defaults);
  
  axiosInstance.interceptors.request.use(
    (config) => {
      // console.log(config);
      vm.$eventBus.$emit('progress', 'initiate'); // For every request start the progress
      return config;
    },
    (error) => {
      // console.log(error);
      return Promise.reject(error);
    }
  );
  
  axiosInstance.interceptors.response.use(
    (response) => {
      // console.log(response);
      vm.$eventBus.$emit('progress', 'success'); // Finish when a response is received
      return response;
    },
    (error) => {
      // console.log(error);
      if (Axios.isCancel(error)) {
        vm.$eventBus.$emit('progress', 'stop'); // Stop when a response is canceled
      } else {
        vm.$eventBus.$emit('progress', 'error'); // Fail when a response is failed
      }
      return Promise.reject(error);
    }
  );
  
  return {
    config: { baseURL, headers },
    getAuthorization() {
      return axiosInstance.defaults.headers.common['Authorization'];
    },
    setAuthorization(token) {
      // console.log(token);
      
      // Set Authorization
      if (token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } else {
        delete axiosInstance.defaults.headers.common['Authorization'];
      }
    },
    cancelCurrentApiCall() {
      const cancelSourceList = Object.keys(cancelApiCall);
      if (cancelSourceList.length > 0) {
        cancelSourceList.forEach((cancelSource) => { cancelApiCall[cancelSource]('Cancel Current API Call.'); });
        cancelApiCall = {};
      }
    },
    get(payload) {
      const { url, config } = payload || {},
            cancelSourceID = `cancel_source_${generateID()}`;
      return new Promise((resolve, reject) => {
        axiosInstance.get(url, {
          ...config,
          cancelToken: new CancelToken((cancelSource) => { cancelApiCall = { ...cancelApiCall, [cancelSourceID]: cancelSource }; })
        }).then(
          (response) => {
            // console.log(response);
            delete cancelApiCall[cancelSourceID];
            resolve(response);
          }
        ).catch(
          (error) => {
            // console.log(error);
            delete cancelApiCall[cancelSourceID];
            if (!Axios.isCancel(error)) { reject(error); }
          }
        );
      });
    },
    post(payload) {
      const { url, data, config } = payload || {},
            cancelSourceID = `cancel_source_${generateID()}`;
      return new Promise((resolve, reject) => {
        axiosInstance.post(url, data, {
          ...config,
          cancelToken: new CancelToken((cancelSource) => { cancelApiCall = { ...cancelApiCall, [cancelSourceID]: cancelSource }; })
        }).then(
          (response) => {
            // console.log(response);
            delete cancelApiCall[cancelSourceID];
            resolve(response);
          }
        ).catch(
          (error) => {
            // console.log(error);
            delete cancelApiCall[cancelSourceID];
            if (!Axios.isCancel(error)) { reject(error); }
          }
        );
      });
    },
    put(payload) {
      const { url, data, config } = payload || {},
            cancelSourceID = `cancel_source_${generateID()}`;
      return new Promise((resolve, reject) => {
        axiosInstance.put(url, data, {
          ...config,
          cancelToken: new CancelToken((cancelSource) => { cancelApiCall = { ...cancelApiCall, [cancelSourceID]: cancelSource }; })
        }).then(
          (response) => {
            // console.log(response);
            delete cancelApiCall[cancelSourceID];
            resolve(response);
          }
        ).catch(
          (error) => {
            // console.log(error);
            delete cancelApiCall[cancelSourceID];
            if (!Axios.isCancel(error)) { reject(error); }
          }
        );
      });
    },
    delete(payload) {
      const { url, config } = payload || {},
            cancelSourceID = `cancel_source_${generateID()}`;
      return new Promise((resolve, reject) => {
        axiosInstance.delete(url, {
          ...config,
          cancelToken: new CancelToken((cancelSource) => { cancelApiCall = { ...cancelApiCall, [cancelSourceID]: cancelSource }; })
        }).then(
          (response) => {
            // console.log(response);
            delete cancelApiCall[cancelSourceID];
            resolve(response);
          }
        ).catch(
          (error) => {
            // console.log(error);
            delete cancelApiCall[cancelSourceID];
            if (!Axios.isCancel(error)) { reject(error); }
          }
        );
      });
    }
  };
};

export default api;