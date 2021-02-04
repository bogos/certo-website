import store from '@/store';
import { SESSION_IS_LOGGED_IN } from '@/store/constants';
// import Home from '@/views/Home.vue';

const requireAuth = (to, from, next) => {
  if (!store.getters[SESSION_IS_LOGGED_IN]) {
    next({ name: 'home' });
  } else {
    next();
  }
};

export default [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: Home,
  // },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
  },
  {
    // path: '/login',
    path: '/',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue'),
    beforeEnter: requireAuth,
  },
];
