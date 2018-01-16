<template>
	<div>
		<div class="black" @click="addCount(1)">增加cartCount {{cartCount}}</div>
		<div class="black" @click="changeTitle(newTitle)">
			slot： 
			<slot name="t01"></slot>
			<slot name="t02"></slot> 
			--修改pageTitle：{{pageTitle}}
		</div>
	</div>
</template>

<script>
	export default {
		name: 'storeBtn',
		props: ['newTitle'],
		mounted() {
			this.setCount(9);
		},
		computed: {
			cartCount() {
				return this.$store.state.cartCount;
			},
			pageTitle() {
				return this.$store.state.pageTitle;
			}
		},
		methods: {
			//从该入口页面设置初始化数量
			setCount(num) {
				this.$store.commit('setCart', num);
			},
			addCount(num) {
				this.$store.commit('addCart', num);
			},
			changeTitle(newTitle) {
				this.$store.commit('changeTitle', this.newTitle);
			}
		}
	}
</script>
