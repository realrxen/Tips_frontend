<template>
	<view class="wrapper">
		<view class="itemWrapper"  :data-mediaId="item.mediaId" v-for="(item,index) in coverData" :key="index" @tap="goToDatail">
			<view>
				<image :src="item.cover" class="coverPicture"></image>
				<view class="title">
					{{item.title}}
				</view>
				<view class="resultWrapper">
					<view class="userWrapper">
						<image :src="item.faceIcon" class="faceIcon"></image>
						<text class="nickName">{{item.username}}</text>
					</view>
					<view class="mediaWrapper">
						<text class="iconfont icon-shanzi myIcon"></text>
						<view class="thumbCount">{{item.thumbCount}}</view>
					</view>
				</view>
			</view>
		</view>
<!--		<view class="itemWrapper">-->
<!--			<image src="../../../static/demo/44.jpg" class="coverPicture"></image>-->
<!--			<view class="title">-->
<!--				一蓑烟雨任平生-->
<!--			</view>-->
<!--			<view class="resultWrapper">-->
<!--				<view class="userWrapper">-->
<!--					<image src="../../../static/icos/default-face.png" class="faceIcon"></image>-->
<!--					<text class="nickName">Tips</text>-->
<!--				</view>-->
<!--				<view class="mediaWrapper">-->
<!--					<text class="iconfont icon-shanzi myIcon"></text>-->
<!--					<view class="thumbCount">6669</view>-->
<!--				</view>-->
<!--			</view>-->
<!--		</view>-->

	</view>
</template>

<script>
	export default {
		props:{
			coverData:Array
		},
		data() {
			return {

			};
		},
		methods:{
			goToDatail(e){
				var mediaId = e.currentTarget.dataset.mediaid
				// uni.navigateTo({
				// 	url:'../post/PostDetail?mediaId='+mediaId
				// })
				uni.navigateTo({
					url:'../article/article?mediaId='+mediaId
				})
			}
		}
	}
</script>

<style>
	.wrapper{
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		margin-top: 93rpx;
		padding: 20rpx 20rpx 0;
	}
	.itemWrapper{
		display: flex;
		flex-direction: column;
		padding: 5rpx 13rpx;
		background-color: #FFFFFF;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		width: 49%;
		border-radius: 15rpx;
		padding: 10rpx;
		margin-bottom: 12rpx;
		margin-left: 7rpx;
	}
	.coverPicture{
		width: 350rpx;
		height: 250rpx;
		border-radius: 5%;
	}
	.title{
		font-size: 30rpx;
		font-weight: bold;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.resultWrapper{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.userWrapper{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		/* padding: 20rpx; */
	}
	.mediaWrapper{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
	.faceIcon{
		width: 30rpx;
		height: 30rpx;
		margin-right: 5rpx;
		border-radius: 100%;
	}
	.myIcon{
	}
	.thumbCount{
		margin-left: 5rpx;
	}



</style>
