// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import { Input, Table, Button, Message, Modal, Icon } from 'iview'
import 'iview/dist/styles/iview.css'
// import '@/assets/base.scss'
import { sync } from 'vuex-router-sync'

Vue.component('Input', Input)
Vue.component('Table', Table)
Vue.component('Button', Button)
Vue.component('Message', Message)
Vue.component('Modal', Modal)
Vue.component('Icon', Icon)
sync(store, router)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
