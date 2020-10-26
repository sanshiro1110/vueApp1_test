import Vue from 'vue'
import App from './App.vue'
import router from "./router.js"
import * as firebase from 'firebase';
import Chartkick from 'vue-chartkick';
import Chart from 'chart.js';

const firebaseConfig = {
  apiKey: "AIzaSyAS5O9-MoyhNJiy1xhbujIEcAsokXPWIOY",
  authDomain: "vueapp1-c024a.firebaseapp.com",
  databaseURL: "https://vueapp1-c024a.firebaseio.com",
  projectId: "vueapp1-c024a",
  storageBucket: "vueapp1-c024a.appspot.com",
  messagingSenderId: "157469378277",
  appId: "1:157469378277:web:5273aca133ea7f9767760c"
};

firebase.initializeApp(firebaseConfig);

Vue.use(Chartkick.use(Chart));

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')


