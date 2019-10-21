import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import dateFilter from '@/filters/date.filter'
import currencyFilter from '@/filters/currency.filter'
import router from './router'
import store from './store'
import messagePlugin from '@/plugins/message.plugin'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.filter('date', dateFilter);
Vue.filter('currency', currencyFilter);
Vue.use(messagePlugin);
Vue.use(Vuelidate);

firebase.initializeApp({
  apiKey: "AIzaSyAEhvr3cjEQ94RepaG028umNCABrMyD0Qo",
  authDomain: "vitamin-finanse-manager.firebaseapp.com",
  databaseURL: "https://vitamin-finanse-manager.firebaseio.com",
  projectId: "vitamin-finanse-manager",
  storageBucket: "vitamin-finanse-manager.appspot.com",
  messagingSenderId: "723912128545",
  appId: "1:723912128545:web:fd4cbf1850dd984b8b8b60",
  measurementId: "G-2SKV0MQV6V"
})

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})


