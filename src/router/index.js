import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      redirect: { name: 'Index' }
    }, {
      path: '/index',
      name: 'Index',
      component: Index
    }
  ]
})
