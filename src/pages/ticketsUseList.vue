<template>
	<div class="sectionBox">
		<ul class="tab-title displaybox ptb10 f14 line smallborderbottomgrey">
			<li v-for="(item, index) in tabs" class="boxflex01" @click="swapRecords(index, $event)">
				<span class="grey" :class="curTabIndex === index ? 'on animated shake' : ''">{{item}}</span>
			</li>
		</ul>
		<div class="radius4 overhidden bg-lightred list-box">
			<div class="divide-box10 line smallborderbottomgrey"></div>
			<ul v-for="(item, index) in itemList" class="displaybox f14 flexstart">
				<li class="ptb15 mleft10">
					<img v-if="curTabIndex === 0" class="w20" src="../assets/icon_record.png">
					<img v-else class="w20" src="../assets/icon_record_used.png">
				</li>
				<li class="boxflex01 ptb15 t-left mleft10 line smallborderbottomgrey">
					<div>{{item.left_up}}</div>
					<div>{{item.left_bottom}}</div>
				</li>
				<li class="ptb15 line smallborderbottomgrey t-right pright10">
					<div>{{item.right_up}}</div>
					<div>{{item.right_bottom}}</div>
				</li>
			</ul>
		</div>
		<loading :loadingShow="loadingShow" :showIcon="showIcon" :loadingText="loadingText"></loading>
		{{cartCount}}
		<store-btn newTitle="历史明细">
			<span slot="t02">粮票总览2</span></store-btn>
	</div>
</template>

<script>
	import qs from 'qs'
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				curTabIndex: 0,
				tabs: ['已获得', '已消费'],
				itemList: [],
				itemListTab0: [ {"dateTime":"2017-10-31 15:15:54","right_bottom":"退款金额：7.00","discount":null,"type":0,"userName":"韦先生","userId":73568,"dateTimeLong":1509434154000,"right_up":"兑换人:  埚牛","id":1253001,"convertMoney":7.00,"userHuaId":"73568","ext_room_isAdmin":false,"left_bottom":"退款成功","left_up":"2017-10-31 15:15:54"},{"dateTime":"2017-10-31 15:15:43","right_bottom":"退款金额：98.00","discount":null,"type":0,"userName":"韦先生","userId":73568,"dateTimeLong":1509434143000,"right_up":"兑换人:  埚牛","id":1253000,"convertMoney":98.00,"userHuaId":"73568","ext_room_isAdmin":false,"left_bottom":"退款成功","left_up":"2017-10-31 15:15:43"},{"dateTime":"2017-09-19 19:40:03","right_bottom":"粮票金额:  500.00","discount":"参与活动获得","type":0,"userName":"韦先生","userId":73568,"dateTimeLong":1505821203000,"right_up":"获取人:  埚牛","id":1252933,"convertMoney":500.00,"userHuaId":"73568","ext_room_isAdmin":false,"left_bottom":"参与活动","left_up":"2017-09-19 19:40:03"},{"dateTime":"2017-10-31 15:15:43","right_bottom":"退款金额：98.00","discount":null,"type":0,"userName":"韦先生","userId":73568,"dateTimeLong":1509434143000,"right_up":"兑换人:  埚牛","id":1253000,"convertMoney":98.00,"userHuaId":"73568","ext_room_isAdmin":false,"left_bottom":"退款成功","left_up":"2017-10-31 15:15:43"},{"dateTime":"2017-09-19 19:40:03","right_bottom":"粮票金额:  500.00","discount":"参与活动获得","type":0,"userName":"韦先生","userId":73568,"dateTimeLong":1505821203000,"right_up":"获取人:  埚牛","id":1252933,"convertMoney":500.00,"userHuaId":"73568","ext_room_isAdmin":false,"left_bottom":"参与活动","left_up":"2017-09-19 19:40:03"},{"dateTime":"2017-10-31 15:15:43","right_bottom":"退款金额：98.00","discount":null,"type":0,"userName":"韦先生","userId":73568,"dateTimeLong":1509434143000,"right_up":"兑换人:  埚牛","id":1253000,"convertMoney":98.00,"userHuaId":"73568","ext_room_isAdmin":false,"left_bottom":"退款成功","left_up":"2017-10-31 15:15:43"},{"dateTime":"2017-09-19 19:40:03","right_bottom":"粮票金额:  500.00","discount":"参与活动获得","type":0,"userName":"韦先生","userId":73568,"dateTimeLong":1505821203000,"right_up":"获取人:  埚牛","id":1252933,"convertMoney":500.00,"userHuaId":"73568","ext_room_isAdmin":false,"left_bottom":"参与活动","left_up":"2017-09-19 19:40:03"} ],
				itemListTab1: [],
				tabPage0: 1,
				tabPage1: 1,
				tabEnd0: false,
				tabEnd1: false,
				pageNum: 20,
				loadingShow: true,
				showIcon: true,
				loadingText: '加载中…',
				isScrolling: true,
				page: 1
			}
		},
		mounted: function() {
			const self = this;

			//加载首屏记录
			self.getAjax();
			
//			this.setCount(9);

			window.onscroll = function() {
				self.loadNextPage();
			}
		},
		/*computed: {
			//...mapState()映射computed里的方法
			...mapState({
				cartCount: 'cartCount',
				pageTitle: 'pageTitle'
			})
		},*/
		methods: {
			swapRecords(index, $event) {
				const self = this;

				self.curTabIndex = index;
				//console.log($event);

				self.itemList = self['itemListTab' + self.curTabIndex];

				if(self['tabEnd' + self.curTabIndex] && self.itemList.length) {
					self.showIcon = false;
					self.loadingText = '已加载全部记录';
				} else if(self['tabEnd' + self.curTabIndex] && !self.itemList.length) {
					self.showIcon = false;
					self.loadingText = '暂无' + self.tabs[index] + '记录';
				} else {
					self.showIcon = true;
					self.loadingText = '加载中…';

					if(self['itemListTab' + self.curTabIndex].length === 0) {
						self.getAjax();
					}
				}

			},
			getAjax() {
				const self = this;
				//config/index.js里设置代理proxyTable
				const url = '../api/common/toUrl.do';
//				const url = '../common/toUrl.do';
				let curItemList = self['itemListTab' + self.curTabIndex];
				let curPage = self['tabPage' + self.curTabIndex];
				let dataParams = {};
				
				if(self.curTabIndex === 0) {
					dataParams = {
						'pageNum': self.pageNum,
						'type': self.$route.query.item_type,
						'page': curPage,
						'detailUrl': '/redenvelope/qryRecord2hb.json'
					}
				} else {
					dataParams = {
						'pageNum': self.pageNum,
						'type': self.$route.query.item_type,
						'page': curPage,
						'detailUrl': '/redenvelope/qryRecordConsum.json'
					}
				}

				if(self['tabEnd' + self.curTabIndex]) {
					return false;
				}

				self.$axios.post(url, qs.stringify(dataParams)).then(function(response) {
					if(response.data.status === '0000'){
						let newDataList = response.data.dataValue.list || [];
	
						self['itemListTab' + self.curTabIndex] = [].concat(curItemList, newDataList);
						self.itemList = self['itemListTab' + self.curTabIndex];
	
						if(!response.data.dataValue.hasNext && self.itemList.length) {
							self.showIcon = false;
							self.loadingText = '已加载全部记录';
							self['tabEnd' + self.curTabIndex] = true;
						} else if(!response.data.dataValue.hasNext && !self.itemList.length) {
							self.showIcon = false;
							self.loadingText = '暂无' + self.tabs[self.curTabIndex] + '记录';
							self['tabEnd' + self.curTabIndex] = true;
						} else {
							self['tabPage' + self.curTabIndex] = curPage += 1;
						}
					}
				})
			},
			scrollEnd() {
				const self = this;

				let scrollt = document.documentElement.scrollTop + document.body.scrollTop; //获取滚动的距离
				let docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight - 1; //当前文档高度-当前窗口高度-1。document.body.clientHeight获取窗口高度在.vue文件里数据不对

				self.isScrolling = true;

				//页面加载完成时，不触发
				if(scrollt === 0) {
					return false;
				}

				if(scrollt > docHeight) {
					self.getAjax();
				}
			},
			loadNextPage() {

				const self = this;

				if(self.isScrolling) {
					setTimeout(self.scrollEnd, 1000);
					self.isScrolling = false;
				}

			},
			
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.tab-title {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		background: #fff;
		z-index: 2;
	}
	
	.list-box {
		padding-top: 41px;
	}
	
	.on {
		border-bottom: 2px solid #f2482c;
		color: #f2482c !important;
		padding: 0 10px 10px;
	}
	
	.w20 {
		width: 20px;
	}
	
	.pright10 {
		padding-right: 10px !important;
	}
</style>