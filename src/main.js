import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import 'common/stylus/index.styl'
import fastclick from 'fastclick'
import vueLazyLoad from 'vue-lazyload'
import store from './store'
fastclick.attach(document.body)
Vue.use(vueLazyLoad, {
  loading: require('common/image/default.png')
})
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
