import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import Index from '@/views/index'
import Mine from '@/views/mine'
import Add from '@/views/add'
import Check from '@/views/check'
import Search from '@/views/search'
import Comments from '@/views/comments'
Vue.use(Router)

Router.prototype.goBack = function (val) {
  store.commit('SET_DIRECTION', val);
  if(store.state.direction == 'tip'){
    window.history.go(-1);
  }else{
    setTimeout(()=>{window.history.go(-1)},50);
  }
}

const router =  new Router({
  mode: 'history',
  hash: false,
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
    },
    {
      path: '/mine',
      name: 'Mine',
      component: Mine,
    },
    {
      path: '/add',
      name: 'Add',
      component: Add,
    },
    {
      path:'/check',
      name:'Check',
      component: Check,
    },
    {
      path:'/search',
      name:'Search',
      component: Search,
    },
    {
      path:'/comments',
      name:'Comments',
      component: Comments,
    },
  ]
})

router.afterEach((to, from) => {
  if(store.state.direction !== 'tip')
    store.commit('SET_DIRECTION', 'tip');
})
export default router;
