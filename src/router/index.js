import Vue from 'vue'
import Router from 'vue-router'
//import Home from '@/components/home'

Vue.use(Router)

//路由懒加载的实现：
//方法1：vue异步组件技术
//vue-router配置路由，使用vue的异步组件技术，可以实现按需加载。
const ticketsAmount = resolve => require(['@/pages/ticketsAmount.vue'], resolve);
const ticketsUseList = resolve => require(['@/pages/ticketsUseList.vue'], resolve);


//方法2：webpack提供的require.ensure()	//和方法1生成的js文件一样
//把路由对应的组件定义成异步组件，首页加载时app.js文件减小为(1.4M)，并且多了个1.xxx.js文件(24k)
/*const ticketsAmount = resolve => {
	require.ensure(['@/pages/ticketsAmount.vue'], () => {
		resolve(require('@/pages/ticketsAmount.vue'), 'ticketsfile1')
	})
}
const ticketsUseList = resolve => {
	require.ensure(['@/pages/ticketsUseList.vue'], () => {
		resolve(require('@/pages/ticketsUseList.vue'), 'ticketsfile2')
	})
}*/

export default new Router({
	//mode: 'history',	//history模式下build后打开页面空白。如果非要使用history模式，需要在服务端加一个覆盖所有的情况的候选资源：如果URL匹配不到任何静态资源，则应该返回一个index.html,这个页面就是app依赖页面
	routes: [{
			path: '/',
			name: 'ticketsAmount',
			//在每一个meta里面设置页面的title名字，最后在main.js里遍历设置
			meta: {
				title: '粮票金额',
			},
			component: ticketsAmount
		},
		{
			path: '/ticketsUseList',
			name: 'ticketsUseList',
			meta: {
				title: '使用明细',
			},
			component: ticketsUseList
		},
		// Not Found 路由，必须是最后一个路由 
		/*{
			path: '*',
			component: NotFound,	//暂未定义
			meta: {
				title: '找不到页面'
			}
		}*/
	]
})
