// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import seller from 'components/seller/seller';
import goods from 'components/goods/goods';
import ratings from 'components/ratings/ratings';
import 'common/stylus/index.styl';

Vue.use(VueRouter);
Vue.use(VueResource);
const routes = [{
  path: '/',
  component: goods
}, {
  path: '/goods',
  component: goods
}, {
  path: '/seller',
  component: seller
}, {
  path: '/ratings',
  component: ratings
}];

const router = new VueRouter({
  linkActiveClass: 'active',
  routes
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
