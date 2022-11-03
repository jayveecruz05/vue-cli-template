import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const AuthView = () => import(/* webpackChunkName: "auth-view" */ '@/views/AuthView');
const Login = () => import(/* webpackChunkName: "login" */ '@/components/Views/AuthView/Login');

const MainView = () => import(/* webpackChunkName: "main-view" */ '@/views/MainView');
const Dashboard = () => import(/* webpackChunkName: "dashboard" */ '@/components/Views/MainView/Dashboard');
const Users = () => import(/* webpackChunkName: "users" */ '@/components/Views/MainView/Users');

const mainViewRedirect = { name: 'dashboard' };
const routes = [
  {
    path: '/',
    name: 'auth-view',
    redirect: { name: 'login' },
    component: AuthView,
    meta: { requiresAuthentication: false },
    children: [
      {
        path: 'login',
        name: 'login',
        component: Login,
        meta: { requiresAuthentication: false }
      }
    ]
  },
  {
    path: '/',
    name: 'main-view',
    redirect: mainViewRedirect,
    component: MainView,
    meta: { requiresAuthentication: true },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: { requiresAuthentication: true }
      },
      {
        path: 'users',
        name: 'users',
        component: Users,
        meta: { requiresAuthentication: true }
      }
    ]
  },
  // {
  //   path: '/template',
  //   name: 'template',
  //   // route level code-splitting
  //   // this generates a separate chunk (template.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "template" */ '@/views/template')
  // },
  { // For 404 Page
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    redirect: { path: '/' }
    // component: () => import(/* webpackChunkName: "template" */ '@/views/PathNotFound')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  // console.log({ to, from, next });

  // Cancel current API call in route change
  if (to.name != from.name) { router.app.$api.main.cancelCurrentApiCall(); }

  const token = router.app.$cookies.get('token');

  // console.log(token);

  if (to.meta.requiresAuthentication) {
    if (token) {
      if (!router.app.$api.main.getAuthorization()) { router.app.$api.main.setAuthorization(window.atob(token)); } // Decode Base64
      next();
    } else {
      router.app.$cookies.remove('token');
      router.app.$api.main.setAuthorization(undefined);
      window.localStorage.setItem('isLogin', 0);
      next({ name: 'login', query: { redirect: ((to.name != mainViewRedirect.name) ? to.name : undefined), ...to.query } });
    }
  } else {
    if (to.matched.length === 0) {
      next();
    } else if (token) {
      if (!router.app.$api.main.getAuthorization()) { router.app.$api.main.setAuthorization(window.atob(token)); } // Decode Base64
      next({ name: 'main-view' });
    } else {
      router.app.$cookies.remove('token');
      window.localStorage.setItem('isLogin', 0);
      next();
    }
  }
});

export default router;