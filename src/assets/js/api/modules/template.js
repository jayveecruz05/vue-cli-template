'use strict';

import api from '../index';

export default {
  getData(payload = {}) {
    const { url, config, apiCancelToken } = payload;
    return new Promise((resolve, reject) => {
      api.main.get({ url, config, apiCancelToken }).then(
        (response) => {
          // console.log(response);
          resolve(response.data);
        }
      ).catch(
        (error) => {
          // console.log(error);
          reject(error);
        }
      );
    });
  },
  postData(payload = {}) {
    const { url, data, config, apiCancelToken } = payload;
    return new Promise((resolve, reject) => {
      api.main.post({ url, data, config, apiCancelToken }).then(
        (response) => {
          // console.log(response);
          resolve(response.data);
        }
      ).catch(
        (error) => {
          // console.log(error);
          reject(error);
        }
      );
    });
  },
  putData(payload = {}) {
    const { url, data, config, apiCancelToken } = payload;
    return new Promise((resolve, reject) => {
      api.main.put({ url, data, config, apiCancelToken }).then(
        (response) => {
          // console.log(response);
          resolve(response.data);
        }
      ).catch(
        (error) => {
          // console.log(error);
          reject(error);
        }
      );
    });
  },
  patchData(payload = {}) {
    const { url, data, config, apiCancelToken } = payload;
    return new Promise((resolve, reject) => {
      api.main.patch({ url, data, config, apiCancelToken }).then(
        (response) => {
          // console.log(response);
          resolve(response.data);
        }
      ).catch(
        (error) => {
          // console.log(error);
          reject(error);
        }
      );
    });
  },
  deleteData(payload = {}) {
    const { url, config, apiCancelToken } = payload;
    return new Promise((resolve, reject) => {
      api.main.delete({ url, config, apiCancelToken }).then(
        (response) => {
          // console.log(response);
          resolve(response.data);
        }
      ).catch(
        (error) => {
          // console.log(error);
          reject(error);
        }
      );
    });
  }
};