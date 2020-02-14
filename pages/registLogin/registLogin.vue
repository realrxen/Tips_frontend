<template>
	<view class="body">

			<view class="face-wrapper">
				<image src="../../static/icos/default-face.png" class="face"></image>
			</view>

			<view class="info-wrapper">
				<label class="words-lbl">账号</label>
				<!-- <input type="text" value="" name="userId" :placeholder="status?'请输入用户名/手机号':'请输入手机号'" class="input" placeholder-class="graywords"/> -->
				<template v-if="status">
					<input v-model="username" class="input" type="text" :placeholder="status?'请输入用户名/手机号':'请输入手机号'" value="" placeholder-class="graywords" />
				</template>
				<template v-else>
					<input v-model="telephone" class="input" type="text" :placeholder="status?'请输入用户名/手机号':'请输入手机号'" value="" placeholder-class="graywords" />
				</template>
			</view>
			<view class="info-wrapper" style="margin-top: 40upx;">
				<label class="words-lbl">密码</label>
				<input type="text" value="" name="password" password="true" class="input" placeholder="请输入密码" placeholder-class="graywords"                                  />
			</view>
<!--			<button type="primary" form-type="submit" style="margin-top: 60upx; width: 90%;">登录</button>-->
			<view class="registerBtnWrapper">
				<view class="registerBtn" type="primary" form-type="submit" style="margin-top: 60upx; width: 90%;">注册</view>
			</view>
		<view class="password-login-Wrapper">
			<view style="font-size: 30rpx;color: #969896;" @click="changeLogin">{{status?'验证码登录':'账号密码登录'}}</view>
			<text style="margin-left: 20rpx;margin-right: 20rpx;">|</text>
			<view style="font-size: 30rpx;color: #969896;">忘记密码</view>
			<text style="margin-left: 20rpx;margin-right: 20rpx;">|</text>
			<navigator url="./login">
			<view style="font-size: 30rpx;color: #969896;">注册</view>
			</navigator>
		</view>
		<!-- 第三方登录H5不支持，所以隐藏掉 -->
	<!-- #ifndef H5 -->
		<view class="third-wrapper">

			<view class="third-line">
				<view class="single-line">
					<view class="line"></view>
				</view>

				<view class="third-words">第三方账号登录</view>

				<view class="single-line">
					<view class="line"></view>
				</view>
			</view>

			<view class="third-icos-wrapper">
				<!-- 5+app 用qq/微信/微博 登录 小程序用微信小程序登录 h5不支持 -->
				<!-- #ifdef APP-PLUS -->
					<image src="../../static/icos/weixin.png" data-logintype="weixin" @click="appOAuthLogin" class="third-ico"></image>
					<image src="../../static/icos/QQ.png" data-logintype="qq" @click="appOAuthLogin" class="third-ico" style="margin-left: 80upx;"></image>
					<image src="../../static/icos/weibo.png" data-logintype="sinaweibo" @click="appOAuthLogin" class="third-ico" style="margin-left: 80upx;"></image>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
					<button open-type='getUserInfo' @getuserinfo="wxLogin" class="third-btn-ico">
					</button>
				<!-- #endif -->
			</view>
		</view>
	<!-- #endif -->
	</view>
</template>

<script>
	import common from "../../common/common.js"
	var serverUrl = common.serverUrl
	export default{
		data(){
			return{
				// userId:"",
				// password:""
				status:true,
				username:'',
				password:'',
				telephone:'',
				code:'',
				codeTime:0
			};
		},
		methods:{
			appOAuthLogin(e){
				var logintype =e.currentTarget.dataset.logintype
				uni.login({
					provider:logintype,
					success: (loginRes) => {
						// 授权登录成功以后 获取用户的信息
						uni.getUserInfo({
							provider:logintype,
							success: (info) => {
								// console.log(JSON.stringify(info))
								var userInfo = info.userInfo
								var faceIcon = ""
								var nickName=""
								var thirdPartyId=""
								if(logintype=="weixin"){
									faceIcon = userInfo.avatarUrl
									nickName=userInfo.nickName
									thirdPartyId=userInfo.openId
								}else if(logintype=="qq"){
									 faceIcon = userInfo.figureurl_qq_2
									 nickName=userInfo.nickname
									 thirdPartyId=userInfo.openid
								}else if(logintype=="sinaweibo"){
									 faceIcon = userInfo.avatar_large
									 nickName=userInfo.nickName
									 thirdPartyId=userInfo.id
								}
								uni.request({
									url:serverUrl+'/users/thirdPartyLogin/'+logintype,
									data:{
										"faceIcon":faceIcon,
										"nickName": nickName,
										"thirdPartyId": thirdPartyId
									},
									method:"POST",
									success: (res) => {
										if(res.data.code==0){
										var userInfo ={}
											userInfo=res.data.data
											console.log(res.data.data)
											// 缓存的API  保存用户信息到全局的缓存中
											uni.setStorageSync("globalUser",userInfo)
											uni.switchTab({
												url:"../me/me"
											})
											uni.showToast({
												title:res.data.msg,
												duration:2000,
												image:"../../static/icos/xixi.png"
											})
										}else if(res.data.code==466){
											uni.showToast({
												title:res.data.msg,
												duration:2000,
												image:"../../static/icos/error1.jpg"
											})
										}
									}

								})
							}
						})
					}
				})
				var appOAuthLogin
			}
			,
			//实现在微信小程序的微信登录
			wxLogin(e){
					// 通过微信开放能力 获得微信用户的基本信息
					var userInfo = e.detail.userInfo
					console.log(userInfo)
					console.log(userInfo.avatarUrl)
					//实现微信登录
					uni.login({
						provider:"weixin",
						success: (loginResult) => {
						// 获得微信登录的code:授权码
						var code = loginResult.code
						uni.request({
							url:serverUrl+'/users/mpLogin/'+code,
							data:{
								"avatarUrl":userInfo.avatarUrl,
								"city": userInfo.city,
								"country": userInfo.country,
								"gender": userInfo.gender,
								"language": userInfo.country,
								"nickName": userInfo.nickName,
								"province": userInfo.province
							},
							method:"POST",
							success: (res) => {
								if(res.data.code==0){
								var userInfo ={}
									userInfo=res.data.data
									console.log(res.data.data)
									// 缓存的API  保存用户信息到全局的缓存中
									uni.setStorageSync("globalUser",userInfo)
									uni.navigateBack({delta:1})
									uni.showToast({
										title:res.data.msg,
										duration:2000,
										image:"../../static/icos/xixi.png"
									})
								}else if(res.data.code==466){
									uni.showToast({
										title:res.data.msg,
										duration:2000,
										image:"../../static/icos/error1.jpg"
									})
								}
							}
						})
						}
					})
			},
			formSubmit(e){
				var userId = e.detail.value.userId
				var password = e.detail.value.password
				uni.request({
					url:serverUrl+'/users/registerOrLogin',
					data:{
						"userId":userId,
						"password":password
					},
					method:"POST",
					success: (res) => {
						if(res.data.code==0){
							var userInfo ={}
							userInfo=res.data.data
							// console.log(res.data)
							// 缓存的API  保存用户信息到全局的缓存中
							uni.setStorageSync("globalUser",userInfo)
							uni.switchTab({
								url:"../me/me"
							})
						}else if(res.data.code==466){
							uni.showToast({
								title:res.data.msg,
								duration:2000,
								image:"../../static/icos/error1.jpg"
							})
						}

					}
				})
			},
			initForm(){
				this.username='',
				this.password='',
				this.telephone='',
				this.code=''
			},
			changeLogin(){
				this.initForm()
				this.status=!this.status
			}
		},


	}
</script>

<style>
	@import url("registLogin.css");
</style>
