import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import Login from "./components/login/login.vue";
import Home from "./components/home/home.vue";

//import router from './router'
//import store from './store'
//import {auth} from './firebase'

Vue.use(VueRouter);

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
})*/

new Vue({
  el: "#app",
  render: (h) => h(App)
});
