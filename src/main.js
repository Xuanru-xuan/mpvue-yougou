import Vue from 'vue'
import App from './App'
import request from './utils/request'
import store from '@/store'

Vue.prototype.$request = request
// store设置给Vue原型，方便页面实例可以访问到
Vue.prototype.$store = store

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
