'use strict';

const global = {
  data() {
    return {
      confirmDialog: { show: false, loading: false, title: '', message: '', buttonText: '', buttonTextColor: '', buttonBGColor: '', action: '', data: {}, callBack: () => {} }
    };
  },
  filters: {},
  methods: {
    getParent(name) {
      let p = this.$parent;
      while (typeof p !== 'undefined') {
        if (p.$options.name === name) {
          return p;
        } else {
          p = p.$parent;
        }
      }
      return undefined;
    },
    generateApiCancelToken() { return `api_cancel_token_${Math.floor(Math.random() * Date.now()).toString(36).slice(2)}`; },
    confirmAction(payload) {
      const { title, message, buttonText, buttonTextColor, buttonBGColor, action, data, callBack } = payload || {};
      this.confirmDialog = { show: true, loading: false, title, message, buttonText, buttonTextColor, buttonBGColor, action, data, callBack };
    }
  }
};

export default global;