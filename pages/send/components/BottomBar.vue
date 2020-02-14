<template class="bg-white">
	<view class="fixed-bottom">
		<view class="iconWrapper">
			<view class="iconfont cuIcon-paint myIcon animated" hover-class="jello"></view>
			<navigator url="../components/colorui/components/verticalnav">
				<view class="iconfont cuIcon-tag myIcon animated" hover-class="jello"></view>
			</navigator>
			<view class="iconfont cuIcon-album myIcon animated" hover-class="jello"></view>
		</view>
		<view class="bg-main send animated" hover-class="flash" style="color: #FFFFFF;">发送</view>
	</view>
</template>

<script>
	export default{
		name:"BottomBar",
		data(){
			return{}
		}

	}
</script>

<style>
	.fixed-bottom{
		position: fixed;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 1030;
		background-color: #FFFFFF;
		height: 85rpx;
		display: flex;
		align-items: center;
		justify-content: center;

	}

	.send{
		margin-left: auto;
		width: 140rpx;
		height: 60rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 20rpx;
		margin-right: 15rpx;
		background-color: #FFD655;
	}

	.iconWrapper{
		display: flex;
		justify-content: center;
		align-content: center;

	}

	.myIcon{
		width: 86rpx;
		height: 86rpx;
		font-size:50rpx ;
		margin-left: 10upx;
		left: 10upx;
		color: #FF0000;
	}




</style>
