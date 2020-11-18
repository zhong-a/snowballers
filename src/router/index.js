//router for firebase authentication
import Vue from 'vue'
import VueRouter from 'vue-router'
import { auth } from '../firebase/firebase.js'

//.use(MyPlugin) automatically prevents you from using the same plugin more than once
Vue.use(VueRouter)

//List the routes
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: { //meta is used to flag routes that require a user to be authenticated
            requiresAuth: true
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../components/login/login.vue')
    },
]

//If the user tries to access Home without logging, redirect to /login
router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

    if (requiresAuth && !auth.currentUser) {
        next('/login')
    } else {
        next()
    }
})