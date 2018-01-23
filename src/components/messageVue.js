import message from './message.vue'

const messageTip = {
	install: function(Vue, options) {
		Vue.component(message.name, message);
	}
}
// 多页面直接引用script
if(typeof window !== 'undefined' && window.Vue) {
	window.Vue.use(messageTip);
}

export default messageTip