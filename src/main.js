import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(MintUI);

new Vue({
  el: '#app',
  render: h => h(App)
})
