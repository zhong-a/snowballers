import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import store from "./store";
import { firestorePlugin} from 'vuefire';

//import Login from "./components/login/login.vue";
//import Home from "../components/home/home.vue";

//import router from './router'
//import store from './store'
//import {auth} from './firebase'

Vue.use(VueRouter);
Vue.config.productionTip = false;
Vue.use(firestorePlugin)


//ensure firebase initializes before reloading the app when page refresh
/*
let app
auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }

  if (user) {
    store.dispatch('fetchUserProfile', user)
  }
})*/

new Vue({
  el: "#app",
  store,
  render: (h) => h(App)
});
