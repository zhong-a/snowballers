import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import Login from "./components/login/login.vue";
import Home from "./components/home/home.vue";

//import router from './router'
//import store from './store'
//import {auth} from './firebase'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
];

new Vue({
  el: "#app",
  render: (h) => h(App)
});
