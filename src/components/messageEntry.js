//弹框模版及提示信息的显示/隐藏逻辑写在install方法里面，因此不需要message.vue文件，仅需导入.css文件
import './message.css'

const messageTip = {
	install: function(Vue, options) {
		let opt = {
			duration: '2500' // 持续时间
		}
		for(let property in options) {
			opt[property] = options[property]; // 使用 options 的配置
		}

		Vue.prototype.$showMsg = function(msg='请稍候') {
			console.log('message show', msg);

			if(document.getElementsByClassName('message').length) {
				// 如果toast还在，则不再执行
				return;
			}
			let toastTpl = Vue.extend({
				template:  `\
					<transition name="fade" tag="div">\
						<div class="message">\
							<div class="text">${msg}</div>\
						</div>\
					</transition>\
				`
			});
			let tpl = new toastTpl().$mount().$el;
			
			document.body.appendChild(tpl);
			
			setTimeout(function() {
				document.body.removeChild(tpl);
			}, opt.duration)
		}
	}
}
// 多页面直接引用script
if(typeof window !== 'undefined' && window.Vue) {
	window.Vue.use(messageTip);
}

export default messageTip