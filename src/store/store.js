import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'

Vue.use(Vuex)

const store =  new Vuex.Store({
	state: {
		haveBeenSet: false,
		cartCount: 0,
		pageTitle: '默认标题'
	},
	mutations
})

export default store