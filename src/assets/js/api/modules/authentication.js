'use strict';

import api from '../index';

export default {
  getData(payload) {
    const { to, config } = payload || {};
    return new Promise((resolve, reject) => {
      api.main.get({ url: `${to || ''}`, config }).then(
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
  postData(payload) {
    const { to, data, config } = payload || {};
    return new Promise((resolve, reject) => {
      api.main.post({ url: `${to || ''}`, data, config }).then(
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
  putData(payload) {
    const { to, data, config } = payload || {};
    return new Promise((resolve, reject) => {
      api.main.put({ url: `${to || ''}`, data, config }).then(
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
  deleteData(payload) {
    const { to, config } = payload || {};
    return new Promise((resolve, reject) => {
      api.main.delete({ url: `${to || ''}`, config }).then(
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