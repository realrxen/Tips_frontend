<template>
	<view class="myHeader">
		<view class="box">
			<view class="cu-bar bg-white">
				<view class="userInfo">
					<image class="myIcon" src="../../../static/icos/default-face.png" mode=""></image>
					<view>
						<view class="myNickname">{{article.nickname}}</view>
						<view class="releaseTime" v-if="article.createTime===article.updateTime">发布于 {{article.createTime}}</view>
						<view class="releaseTime" v-if="article.createTime!==article.updateTime">更新于 {{article.updateTime}}</view>
					</view>
				</view>
				<view class="action">
					<view class="bg-main followBtn">已关注</view>
					<view class="cuIcon-moreandroid more"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			article:Object
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
	
	.myHeader{
		position: fixed;
		top: 0;
		z-index: 2000;
		width: 100%;
	}
	.userInfo{
		display: flex;
		align-items: center;
		justify-content: center;

	}
	.myIcon{
		width: 70rpx;
		height: 70rpx;
		border-radius: 100%;
		padding: 5rpx;
		margin-left: 20rpx;
	}
	.myNickname{
		font-weight: 20;
		margin-left: 15rpx;
	}

	.releaseTime{
		font-size: 20rpx;
		color: #C8C8C8;
		margin-left: 15rpx;
	}

	.followBtn{
		margin-left: auto;
		width: 120rpx;
		height: 50rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-right: 10rpx;
		border-radius: 20rpx;
		background-color: #ffffff;
		border: 3rpx solid #FFD655;
		color: #FFD655;
	}

	.more{
		padding: 10rpx;
		margin-right: 5rpx;
	}
</style>
