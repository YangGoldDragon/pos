import Vue from 'vue'
import Router from 'vue-router'
import pos from '@/components/page/pos'
import leftNav from '@/components/common/leftNav'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/page',
      name: 'pos',
      component: pos
    },
    {
      path: '/common',
      name: 'leftNav',
      component: leftNav
    }
  ]
})
