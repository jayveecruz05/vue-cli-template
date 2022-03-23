'use strict';

const global = {
  data() {
    return {};
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
      return false;
    },
    generateApiCancelToken() { return `api_cancel_token_${Math.floor(Math.random() * Date.now()).toString(36).slice(2)}`; }
  }
};

export default global;