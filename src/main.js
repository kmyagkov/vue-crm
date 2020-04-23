import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import dateFilter from './filters/date';
import currencyFilter from './filters/currency';
import messagePlugin from './utils/message.plugin';
import 'materialize-css/dist/js/materialize.min';
import Loader from './components/app/Loader';
import tooltipDirective from './directives/tooltip.directive';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import 'materialize-css/dist/css/materialize.min.css';
import './assets/index.css';

Vue.config.productionTip = false;
Vue.filter('date', dateFilter);
Vue.filter('currency', currencyFilter);
Vue.use(messagePlugin);
Vue.component('Loader', Loader);
Vue.directive('tooltip', tooltipDirective);

firebase.initializeApp({
  apiKey: "AIzaSyBuIIpVv69dXefhvmt7gomd9seB3xeET4s",
  authDomain: "vue-crm-8b38f.firebaseapp.com",
  databaseURL: "https://vue-crm-8b38f.firebaseio.com",
  projectId: "vue-crm-8b38f",
  storageBucket: "vue-crm-8b38f.appspot.com",
  messagingSenderId: "828486090525",
  appId: "1:828486090525:web:df82bfd5e647216632abf4"
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app');
  }
});
