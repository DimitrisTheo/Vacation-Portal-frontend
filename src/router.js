import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import NotFound404 from "./views/NotFound404";

let router = new Router({
    mode: 'history',
    routes: [
        { path: '/',
            component: () => import('./views/Login'),  // lazy-loaded
            meta: {
                title: 'Login'
            }
        },
        {
            path: '/admin',
            component: () => import('./views/AdminPage'),  // lazy-loaded
            meta: {
                title: 'Admin'
            }
        },
        {
            path: '/home',
            component: () => import('./views/Home'),  // lazy-loaded
            meta: {
                title: 'Home'
            }
        },
        {
            path: '/createNewUser',
            component: () => import('./views/CreateNewUser'),  // lazy-loaded
            meta: {
                title: 'Create New User'
            },
            props: { header : 'Create User'}
        },
        {
            name: 'UpdateUser',
            path: '/updateUser',
            component: () => import('./views/UpdateUser'),  // lazy-loaded
            meta: {
                title: 'Update User'
            },
            props: true
        },
        {
            path: '/submitRequest',
            component: () => import('./views/SubmitRequest'),
            meta: {
                title: 'Submit Request'
            },
            props:  {header : 'Submit Request'}
        },
        {
            path: '/404',
            component: NotFound404,
            meta: {
                title: '404'
            }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});

router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/', '/404'];
    const authRequired = !publicPages.includes(to.path);
    // localStorage.clear();
    const loggedIn = localStorage.getItem('user');

    if (authRequired && !loggedIn) {
        next('/');
    }else{
        next();
    }
})

export default router;