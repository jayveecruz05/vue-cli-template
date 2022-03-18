import 'es6-promise/auto';
import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

// Axios API
import api from './assets/js/api';
Vue.prototype.$api = api;

// Vue Event Bus
import eventBus from './assets/js/event-bus';
Vue.prototype.$eventBus = eventBus;

// Inputs Validation
Vue.prototype.$validate = {
  emailRegex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, // Email Validator
  phoneNumberRegex: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
  passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
  rules: {
    required: value => !!value || 'Required.',
    requiredList: value => !!value.length > 0 || 'Required.',
    email: value => { return Vue.prototype.$validate.emailRegex.test(value) || 'Email is invalid.'; },
    password: value => { return Vue.prototype.$validate.passwordRegex.test(value) || 'Password is invalid.'; },
    mobileNumber: value => { return Vue.prototype.$validate.phoneNumberRegex.test(value) || 'Mobile number is invalid.'; }
  },
  numbersOnly($event, withPoint) {
    // console.log($event.keyCode, withPoint); //keyCodes value
    let keyCode = $event.keyCode ? $event.keyCode : $event.which;
    if ((keyCode < 48 || keyCode > 57) && !((keyCode == 190 || keyCode == 46) && withPoint)) { $event.preventDefault(); }
  },
  lettersOnly($event) {
    // console.log($event.keyCode); //keyCodes value
    let keyCode = $event.keyCode ? $event.keyCode : $event.which;
    if ((keyCode < 97 || keyCode > 122) && (keyCode < 65 || keyCode > 90) && keyCode != 32 && keyCode != 45) { $event.preventDefault(); }
  }
}

// Vue Cookies
import VueCookies from 'vue-cookies';
Vue.use(VueCookies);
const isSecured = /^production$/ig.test(process.env?.NODE_ENV);
Vue.$cookies.config('7d', '', '', isSecured, 'Strict');

// Vue Number Animation
import VueNumberAnimation from 'vue-number-animation';
Vue.use(VueNumberAnimation);

// Vue Notification
import VueNotification from 'vue-notification';
Vue.use(VueNotification);

// Global Mixin
import globalMixin from '@/mixins/global';
Vue.mixin(globalMixin);

// Global Components
import '@/plugins/global-components';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');