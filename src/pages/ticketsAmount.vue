<template>
	<div class="sectionBox pt10">
		<div v-for="(item, index) in ticketAmounts" class="radius4 overhidden bg-lightred m010 mbottom10 white">
			<ul class="displaybox p2010">
				<li><img class="w50 disblock" src="../assets/icon_ticket.png"></li>
				<li class="boxflex01 mleft10 t-left">
					<div class="f16">{{item.subject}}</div>
					<div class="opacity70">支付时可用粮票冲抵现金</div>
				</li>
				<li><span class="f18">{{item.balanceDiv100.toFixed(2)}}</span></li>
			</ul>
			<router-link class="white" :to="{path: '/ticketsUseList', query: {item_type: item.type}}">	<!--用query为url参数传递，params为动态路由路径-->
				<ul class="p10 displaybox bg-darkred">
					<li class="boxflex01 t-left opacity70 lineheight120">{{item.desc}}</li>
					<li class="mleft15 t-right opacity70">使用明细</li>
					<li class="mleft10"><img class="w8 disblock" src="../assets/icon_arrow_white.png"></li>
				</ul>
			</router-link>
		</div>
		<store-btn newTitle="历史总览">
			<span slot="t01">粮票总览1</span>
			<span slot="t02">粮票总览2</span>
		</store-btn>
		<div class="black">{{$store.state.cartCount}}</div>
		<!--vue-loading-tips-->
		<loading :loadingShow="true" :showIcon="true" :loadingText="'loadingTextHere…'"></loading>
		<!--v-message-->
		<div class="mtop10" @click="showAreaChange">显示区域选择</div>
		<div class="mtop10" @click="showMessage">加载数据 弹框</div>
		<!--<v-message :messageShow="messageShow" :messageText="'请稍候'"></v-message>-->
		<!--vue-area-change-->
		<vue-area-change :isShow="areaShow"></vue-area-change>
		
		<transition name="fade" tag="div">
			<div v-show="hasPrice">总览金额：2000</div>
		</transition>
	</div>
</template>

<script>
	import './../components/message.css'
	import Vue from 'vue'
	import npmShowTips from 'npm-show-tips'
	import qs from 'qs'
	
	import areaChange from 'vue-area-change'
	Vue.use(areaChange)
	
	//使用组件<v-message></v-message>形式
//	import messageTip from './../components/messageVue.js'
	
	//直接使用js生成组件形式
//	import messageTip from './../components/messageEntry.js'
	import messageTip from 'vue-show-message'
	Vue.use(messageTip, {
		duration: 2000
	})
	
	export default {
		//name: 'Home',
		data() {
			return {
				ticketAmounts: [{"desc":"全平台通用","totalConsumMoneyDiv100":0.00,"balance":2657,"totalConvertMoneyDiv100":0.00,"totalConsumMoney":0,"totalConvertMoney":0,"subject":"平台粮票金额","balanceDiv100":26.57,"type":0},{"balanceDiv100":57.39,"totalConsumMoneyDiv100":0.00,"totalConsumMoney":0,"balance":5739,"subject":"体验店粮票金额","totalConvertMoneyDiv100":0.00,"totalConvertMoney":0,"type":1,"desc":"限解放区优选体验店（园景园名苑）使用"}],
				messageShow: false,
				hasPrice: false,
				areaShow: false
			}
		},
		mounted() {
			console.log('changed');
			this.getAjax();
			npmShowTips.showMsg('show a message');
			
			console.log(messageTip, areaChange);
			this.$showMsg();
		},
		methods: {
			//post传参方式
			/*getAjax() {
				const self = this;
				//const url = '../hostname/common/toUrl.do'; 	//开发环境，接口代理到本地，前面加上/hostname
				const url = '../common/toUrl.do';		//build 正式环境
				let dataParams = {'detailUrl': '/redenvelope/qryBalanceList.json'}
				//const url = '/commonjs/loan.data.json';	 模拟生产接口
				
				//由于axios默认发送数据时，数据格式是Request Payload，而并非我们常用的Form Data格式，后端未必能正常获取到，所以在发送之前，需要使用qs模块对其进行处理
				self.$axios.post(url, qs.stringify(dataParams)).then(function(response) {
					if(response.data.status === '0000'){
						self.ticketAmounts = response.data.dataValue.list;
					}
				})
			},*/
			//get传参方式
			getAjax() {
				const self = this;
				//const url = '../hostname/common/toUrl.do'; 	//开发环境，接口代理到本地，前面加上/api
				const url = '../common/toUrl.do';		//build 正式环境
				let dataParams = {'detailUrl': '/livingPay/qryLivingPayItemList.json'}
				//const url = '/commonjs/loan.data.json';	 //模拟生产接口
				
				self.$axios.get(url, {params: dataParams}).then(function(response) {
					if(response.data.status === '0000'){
						//self.ticketAmounts = response.data.dataValue.list;
					}
				})
			},
			//全局调用axios/api，跨域接口不可使用此方法
			/*getAjax() {
				const self = this;
				const url = '/common/toUrl.do'; 	//开发环境，接口代理到本地，前面加上/api
				//const url = '../common/toUrl.do';		//build 正式环境
				let dataParams = {'detailUrl': '/livingPay/qryLivingPayItemList.json'}
				//const url = '/commonjs/loan.data.json';	 //模拟生产接口
				
				this.$api.get(url, dataParams, res => {
					if(response.data.status === '0000'){
						//self.ticketAmounts = response.data.dataValue.list;
					}
				})
			}*/
			showMessage() {
				this.$showMsg('弹框提示信息');

				//使用组件<v-message></v-message>形式
//				this.messageShow = true
				
				this.togglePrice();
			},
			togglePrice() {
				this.hasPrice = !this.hasPrice;
			},
			showAreaChange() {
				this.areaShow = !this.areaShow;
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	h1,
	h2 {
		font-weight: normal;
	}
	
	ul {
		list-style-type: none;
		padding: 0;
	}
	
	a {
		color: #42b983;
	}
	
	.bg-lightred {
		background: #f95b3d;
	}
	
	.bg-darkred {
		background: #f2482c;
	}
	
	.w50 {
		width: 50px;
	}
	
	.w8 {
		width: 8px;
	}
	
	.p2010 {
		padding: 20px 10px;
	}
	
	.opacity70 {
		opacity: 0.7;
	}
</style>