<template>
	<view>
		<ArticleHeader></ArticleHeader>
		<view class="content">
			<h1>我很开心</h1>
			<image src="../../static/bgimg/1.jpg" mode=""></image>
			<p>啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦</p>
			<p>啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦</p>
			<p>啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦</p>
			<image src="../../static/bgimg/1.jpg" mode=""></image>
			<image src="../../static/bgimg/1.jpg" mode=""></image>
			<h2>嘻嘻嘻</h2>
			<image src="../../static/bgimg/1.jpg" mode=""></image>
			<image src="../../static/bgimg/1.jpg" mode=""></image>
		</view>
		<ArticleBottom></ArticleBottom>
	</view>
</template>

<script>
	import ArticleHeader from "./components/ArticleHeader";
	import ArticleBottom from "./components/ArticleBottom";
	export default {
		components:{
			ArticleHeader,
			ArticleBottom
		},
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style>
	.content{
		margin-top: 130rpx;
		padding-bottom: 102rpx;
	}
</style>
