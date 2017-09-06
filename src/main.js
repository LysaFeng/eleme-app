// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/stylus/index.styl'
import VueResoure from 'vue-resource'
import axios from 'axios'//第三方插件


Vue.config.productionTip = false
Vue.use(VueResoure)
Vue.prototype.$axios=axios;//全局注册第三方插件
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  data:{
    eventHub:new Vue()
  }
})
