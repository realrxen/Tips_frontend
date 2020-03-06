<template>
	<view class="bottomBarWrapper">
		<view class="box">
			<view class="bottomBar bg-white">
				<view class="round commentBar">
					<text class="cuIcon-edit myExitIcon"></text>
					<input @focus="InputFocus" @blur="InputBlur"
						   type="text" confirm-type="send"
						   :value="content"
						   @confirm="sendComment"
						   @input="contentInput"
						   :placeholder="placeHolder"
						   placeholder-class="placeholder-c"
						   :adjust-position="true" class="solid-bottom"
						   :focus="isFocus" maxlength="1000" cursor-spacing="10">
					</input>
				</view>
				<view class="wrapper">
					<view class="operation-item" style="margin-left: 20rpx;">
						<view class="cuIcon-like operation-icon"></view>
						<view class="operation-num">18000</view>
					</view>
					<view class="operation-item">
						<view class="cuIcon-magic operation-icon"></view>
						<view class="operation-num">1000</view>
					</view>
					<view class="operation-item" style="margin-right: 20rpx;">
						<view class="cuIcon-comment operation-icon"></view>
						<view class="operation-num">2000</view>
					</view>
				</view>


			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				placeHolder:"你想说什么~~~",
				content:"",
				isFocus:false
			}
		},
		methods: {
			contentInput(e){
				var value= e.detail.value
				this.content=value
			},
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			},
		}
	}
</script>

<style>
	.bottomBarWrapper{
		position: fixed;
		bottom: 0;
		z-index: 2000;
		width: 100%;
	}
	.commentBar{
		background-color: #f5f5f5;
		line-height: 64upx;
		height: 64upx;
		font-size: 24upx;
		color: #333333;
		display: flex;
		align-items: center;
		/*margin: 0 30upx;*/
		margin-left: 30rpx;
		width: 60%;
	}
	.myExitIcon{
		font-size: 30rpx;
		margin-right:0 20rpx;
	}
	.bottomBar{
		display: flex;
		align-items: center;
		height: 100upx;
	}
	.wrapper{
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		height: 100%;
	}
	.operation-item{
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: 15rpx;
	}
	
	.operation-icon{
		font-size: 40rpx;
	}
	.operation-num{
		font-size: 25rpx;
		margin-left: 10rpx;
	}
</style>
