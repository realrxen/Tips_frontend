<template>
	<view>
		<UniStatusBar></UniStatusBar>
		<view>
			<view class="iconfont icon-shanzi myIcon"></view>
		</view>
		
		<view class="text-login">手机号登录</view>
		<view class="loginFormWrapper">
			<view class="form-item" style="margin-bottom: 20rpx;">
				<label class="words-label">+86</label>
				<input class="input" style="" type="text" placeholder="手机号" value="" placeholder-class="graywords" />
				<view class="forgetPwd" style="background-color: #FFFFFF; color: #ffffff; text-align: center;"></view>
			</view>
			<view class="form-item">
				<label class="words-label">密码</label>
				<input class="input" type="text" placeholder="请输入密码" value="" placeholder-class="graywords"/>
				<view class="forgetPwd" style="background-color: #FFD655; color: #ffffff; text-align: center;">获取验证码</view>
			</view>
		</view>
		<view class="buttonWrapper">
			<button type="primary" class="loginButton">登录</button>
		</view>
		<view class="questionWrapper">
			<view style="font-size: 30rpx;color: #969896;">{{status?'手机验证码登录':'账号密码登录'}}</view>
			<text style="margin-left: 20rpx;margin-right: 20rpx;">|</text>
			<view style="font-size: 30rpx;color: #969896;">登录遇到问题</view>
		</view>
		<view class="socialLoginWrapper">
			<view style="width:120rpx;height:1rpx; background-color: #dddddd"></view>
			<view style="color: #969896;margin: 0 20rpx;">社交账号登录</view>
			<view style="width:120rpx;height:3rpx; background-color: #dddddd"></view>
		</view>
		<view class="third-icos-wrapper">
				<image src="../../static/icos/weixin.png"  class="third-ico"></image>
				<image src="../../static/icos/QQ.png" class="third-ico" style="margin-left: 80upx;"></image>
				<image src="../../static/icos/weibo.png" class="third-ico" style="margin-left: 80upx;"></image>
		</view>
	</view>
</template>

<script>
	import UniStatusBar from"../../components/uni-ui/uni-status-bar/uni-status-bar.vue"
	export default {
		components:{
			UniStatusBar
		},
		data() {
			return {
				status:true
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.face-wrapper {
		display: flex;
		flex-direction: row;
		justify-content: center;
		margin-top: 65rpx;
		margin-bottom: 65rpx;
	}
	
	.face {
		width: 160upx;
		height: 160upx;
	}
	.loginFormWrapper{
		padding: 20rpx;
	}
	.form-item{
		display: flex;
		border-bottom: solid 1px #DBDBDA;
		padding: 20rpx;
		align-items: center;
		justify-content: center;
	}
	.words-label{
		font-size: 18.75px;
		color: #808080;
	}
	.input{
		width: 400rpx;
		margin-left: 20rpx;
		margin-top: 10rpx;
	}
	.graywords {
		color: #EAEAEA;
	}
	.forgetPwd{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 140rpx;
		height: 70rpx;
		padding: 5rpx;
		margin-top: 9rpx;
		margin-left: auto;
	}
	.text-login{
		padding-top: 130rpx;
		padding-bottom: 70rpx;
		font-size: 55rpx;
		text-align: center;
	}
	.buttonWrapper{
		padding:20rpx 40rpx
	}
	.loginButton{
		border-radius: 50rpx;
		border: 0;
		font-size: 40rpx;
		color: #ffffff;
		background-color: #FFD655;
	}
	.questionWrapper{
		display: flex;
		align-items: center;
		justify-content: center;
		padding-top: 10rpx;
		padding-bottom: 30rpx;
	}
	.socialLoginWrapper{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
	.third-icos-wrapper {
		margin-top: 30upx;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
	.third-ico {
		width: 70upx;
		height: 70upx;
	}
	.myIcon{
		width: 100rpx;
		height: 100rpx;
		font-size: 50rpx;
		/* padding: 20rpx; */
		left: 0;
	}
</style>
