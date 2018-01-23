<template>
	<transition name="fade" tag="div">
		<div class="message" v-show="messageShow">
			<div class="text">{{messageText}}</div>
		</div>
	</transition>
</template>

<script>
	export default {
		name: 'v-message',
		props: ['messageShow', 'messageText']
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.sectionBox {
		margin: 0 auto;
		background: #fff;
		overflow: hidden;
	}
	
	.message {
		display: box;
		box-align: center;
		display: flex;
		align-items: center;
		text-align: center;
		width: 90px;
		height: 90px;
		border-radius: 4px;
		font-size: 12px;
		color: #fff;
		background: rgba(0, 0, 0, 0.9);
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
	
	.text {
		box-flex: 1;
		flex: 1;
	}
	
	.fade-move,
	.fade-enter-active,
	.fade-leave-active {
		opacity: 1;
	}
	
	.fade-enter,
	.fade-leave-to {
		opacity: 0;
		transform: scaleY(0.01) translate(0, -30px);
	}
	/* 必需 */
	
	.expand-transition {
		transition: all 2s ease;
		height: 30px;
		padding: 10px;
		background-color: #eee;
		overflow: hidden;
	}
	/* .expand-enter 定义进入的开始状态 */
	/* .expand-leave 定义离开的结束状态 */
	
	.expand-enter,
	.expand-leave {
		height: 0;
		padding: 0 10px;
		opacity: 0.5;
	}
</style>