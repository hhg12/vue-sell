// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import goods from 'components/goods/goods'
import sellers from 'components/sellers/sellers'
import ratings from 'components/ratings/ratings'

Vue.config.productionTip = false

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   // router,
//   template: '<App/>',
//   components: { App }
// })
Vue.use(VueRouter)
const routes = [
  { path: '/goods', component: goods },
  { path: '/sellers', component: sellers },
  { path: '/ratings', component: ratings },
]

const router = new VueRouter({
  routes, // （缩写）相当于 routes: routes
  linkActiveClass: 'active'
})
// router.go('/goods');
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
router.push('/goods')


