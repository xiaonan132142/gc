import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import Index from '@/views/index'
import Mine from '@/views/mine'
import More from '@/views/more'
import MineDetails from '@/views/mineDetails'
import MessageBoard from '@/views/messageBoard'
import ActiveRule from '@/views/activeRule'

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
      path: '/more',
      name: 'More',
      component: More,
    },
    {
      path: '/mineDetails',
      name: 'MineDetails',
      component: MineDetails,
    },
    {
      path: '/activeRule',
      name: 'ActiveRule',
      component: ActiveRule,
    },
    {
      path: '/messageBoard',
      name: 'MessageBoard',
      component: MessageBoard,
    }
  ]
})

router.afterEach((to, from) => {
  if(store.state.direction !== 'tip')
    store.commit('SET_DIRECTION', 'tip');
})

export default router;
