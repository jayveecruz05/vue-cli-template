'use strict';

const global = {
  data() {
    return {
      confirmDialog: { show: false, loading: false, title: 'Confirmation', message: 'Confirmation Message.', action: '', data: {}, callback: undefined }
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
      return false;
    },
    confirmAction({ title = 'Confirmation', message = 'Confirmation Message.', action = '', data = {}, callback = undefined }) {
      this.confirmDialog = { show: true, loading: false, title, message, action, data, callback };
    }
  }
};

export default global;