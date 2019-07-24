import Vue from 'vue'
import App from './App'
import axios from '@/utils/axios.js';
import router from './router'
import store from './store'
import "babel-polyfill"
import 'lib-flexible/flexible'
import '@/assets/scss/index.scss'
import global from './global'

import FastClick from 'fastclick'
FastClick.attach(document.body)

import VueScroller from 'vue-scroller'
Vue.use(VueScroller)
Vue.prototype.axios = axios
Vue.prototype.GLOBAL = global
import transition from '@/components/layout/transition';
Vue.component('lg-transition', transition);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { transition },
  template: '<transition/>'
})
