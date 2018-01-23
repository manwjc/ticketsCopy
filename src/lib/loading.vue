<template>
	<div class="sectionBox loading grey" v-show="loadingShow">
		<!--<img src="../assets/loading01.gif" v-show="showIcon" />--> {{loadingText}}
	</div>
</template>

<script>
	export default {
		name: 'loading',
		props: ['loadingShow', /*'showIcon',*/ 'loadingText']
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.sectionBox { margin: 0 auto; background: #fff; overflow:hidden;}
	.loading{ text-align:center; height:36px; line-height:36px; font-size: 12px;}
	.loading img{ vertical-align:middle; margin-top:-3px; width:16px;}
	/*细边框*/
	.line {position:relative;}
	.line:after{width:200%;height:200%;position:absolute;top:0;left:0;z-index:0;content:"";-webkit-transform:scale(0.5);-webkit-transform-origin:0 0;transform:scale(0.5);transform-origin:0 0;}
	.smallbordertopgrey:after {border-top:1px solid #e2e1e4;}
	.smallborderbottomgrey:after {border-bottom:1px solid #e2e1e4;}
	.grey{ color:#8e8e93 !important;}
	.hide { display: none !important }
</style>