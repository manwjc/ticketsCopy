import loadingTips from './loading.vue' // 导入组件 

const VueLoadingTips = {
	install: function(Vue) {
		Vue.component(loadingTips.name, loadingTips)
	}
}
// 多页面直接引用script
if(typeof window !== 'undefined' && window.Vue) {
	window.Vue.use(VueLoadingTips);
}

export default VueLoadingTips