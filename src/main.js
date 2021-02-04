import Vue from 'vue';
import firebase from 'firebase/app';
import config from '@/config';
import App from './App.vue';
import router from './router';
import store from './store';

import 'firebase/auth';
import 'firebase/firestore';

Vue.config.productionTip = false;

firebase.initializeApp(config);

// eslint-disable-next-line no-multi-assign
Vue.prototype.$firebase = Vue.firebase = firebase;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
