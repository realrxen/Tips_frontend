<template>
	<view class="page page-fill">
		<view class="header">
			<view v-if="userIsLogin">
				<image :src="userInfo.faceIcon" class="face"></image>
			</view>
			<view v-else>
				<image src="http://img4.imgtn.bdimg.com/it/u=3006607636,42691152&fm=11&gp=0.jpg" class="face"></image>
			</view>
			<view class="info-wrapper" v-if="userIsLogin">
				<view class="nickname">
					用户名：{{userInfo.username}}
				</view>
				<view class="nav-info">
					昵称：{{userInfo.nickname}}
				</view>
			</view>
			<view class="info-wrapper" v-else>
				<navigator url="../registLogin/registLogin">
					<view class="nickname regist-login">
						注册/登录
					</view>
				</navigator>
			</view>	
			
			<view class="set-wrapper" v-if="userIsLogin">
				<navigator url="../meInfo/meInfo">
					<image src="../../static/icos/settings.png" class="settings"></image>
				</navigator>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userIsLogin:false,
				userInfo:{}
			}
		},
		methods: {
			
		},
		onShow() {
			// var me = this
			// var userInfo = uni.getStorageSync("globalUser")
			// if(userInfo!=null&&userInfo!=""&&userInfo!=undefined){
				var userInfo = this.getGlobalUser("globalUser")
			if(userInfo!=null){
				this.userIsLogin = true
				this.userInfo=userInfo
			}else{
				this.userIsLogin = false
			}
		}
	}
</script>

<style>
	@import url("me.css");
</style>
