// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'

//全局引入axios，通过修改原型链，来更方便的使用
import axios from 'axios'
Vue.prototype.$axios = axios

//导入api接口文件
import api from './api/index.js'
//将api方法绑定到Vue全局
Vue.prototype.$api = api

//全局引入.vue文件
//调用.vue组件，使用Vue.component('loading', VueLoadingTips)调用
//import loading from './components/loading'
//Vue.component('loading', loading)
import storeBtn from './components/storeBtn'
Vue.component('store-btn', storeBtn)
/*import message from './components/message'
Vue.component('v-message', message)*/

//自定义插件
//调用.js模块或npm插件(js文件)，使用Vue.use(VueLoadingTips)调用
//import loading from './lib/index.js'
import loading from 'vue-loading-tips'
Vue.use(loading)

//import npmShowTips from 'npm-show-tips'
//Vue.prototype.$npmShowTips = npmShowTips	//将方法添加在Vue原型上，可供全局使用


Vue.config.productionTip = false

/* eslint-disable no-new */
var ticketModel = new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})

//在每一个meta里面设置页面的title名字，最后在遍历
router.beforeEach((to, from, next) => {
	/* 路由发生变化修改页面title */
	if(to.meta.title) {
		document.title = to.meta.title
	}
	next()
})