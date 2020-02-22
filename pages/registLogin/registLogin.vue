<template>
	<view class="body">

			<view class="face-wrapper">
				<image src="../../static/icos/default-face.png" class="face"></image>
			</view>

			<view class="info-wrapper">
				<!-- <input type="text" value="" name="userId" :placeholder="status?'请输入用户名/手机号':'请输入手机号'" class="input" placeholder-class="graywords"/> -->
				<template v-if="status">
					<label class="words-lbl">账号</label>
					<input v-model="account" class="input" type="text" :placeholder="status?'请输入用户名/手机号':'请输入手机号'" value="" placeholder-class="graywords" />
				</template>
				<template v-else>
					<label class="words-lbl" style="margin-left: 17rpx;">手机号</label>
					<input v-model="telephone" class="input" type="text" :placeholder="status?'请输入用户名/手机号':'请输入手机号'" value="" placeholder-class="graywords" />
				</template>
			</view>


				<template v-if="status">
					<view class="info-wrapper" style="margin-top: 40upx;">
						<label class="words-lbl">密码</label>
						<input type="text" v-model="password" name="password" password="true" class="input" placeholder="请输入密码" placeholder-class="graywords"/>
					</view>
					<view class="cu-form-group rememberMe">
<!--						<checkbox class='round' :checked="true"></checkbox>-->
						<view :class="checked?'cuIcon-favorfill':'cuIcon-favor'" @click="rememberMe" class="myCheckbox" ></view>
						<view>记住密码</view>
					</view>
					<view class="registerBtnWrapper">
						<view class="registerBtn  animated" hover-class="bounceIn" @click="submitAp" style="margin-top: 60upx;margin-bottom: 5rpx; width: 90%;">登录</view>
					</view>
				</template>
				<template v-else>
					<view class="info-wrapper" style="margin-top: 25upx;">
						<label class="words-lbl">验证码</label>
						<input type="text" v-model="otpCode" name="password" class="input-otpCode" placeholder="请输入验证码" placeholder-class="graywords"/>
						<view class="animated" hover-class="RubberBand" :class="codeTime>0?'getOtpCodeBtnUn':'getOtpCodeBtn'" @click="getOtpCode">{{codeTime>0?codeTime+'s':'获取验证码'}}</view>
					</view>
					<view class="registerBtnWrapper">
						<view class="registerBtn animated" hover-class="bounceIn" @click="submitTc" style="margin-top: 60upx;margin-bottom: 5rpx; width: 90%;">登录</view>
					</view>
				</template>

		<view class="password-login-Wrapper">
			<view style="font-size: 30rpx;color: #969896;" @click="changeLogin">{{status?'验证码登录':'账号密码登录'}}</view>
			<text style="margin-left: 20rpx;margin-right: 20rpx;">|</text>
			<view style="font-size: 30rpx;color: #969896;margin-right: 20rpx;"@click="forgetPwd">忘记密码</view>
			<!-- <text style="margin-left: 20rpx;margin-right: 20rpx;">|</text>
			<navigator url="./login">
			<view style="font-size: 30rpx;color: #969896;">注册</view>
			</navigator> -->
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
		<HMmessages ref="HMmessages" @complete="HMmessages = $refs.HMmessages" @clickMessage="clickMessage"></HMmessages>
	<!-- #endif -->
	</view>
</template>

<script>
	import common from "../../common/common.js"
	var serverUrl = common.serverUrl
	import HMmessages from "../../components/HM-messages/HMmessages";
	export default{
		components:{
			HMmessages
		},
		data(){
			return{
				// userId:"",
				// password:""
				status:true,
				account:"",
				password:"",
				telephone:"",
				otpCode:"",
				codeTime:0,
				code:"",
				checked:true
			};
		},
		created(){
			var account = uni.getStorageSync("account")
			if(account!==null&&account!==""&&account!==undefined){
				this.account=account
			}
			var password = uni.getStorageSync("pwd")
			if(password!==null&&password!==""&&password!==undefined){
				this.password=password
			}
		},
		methods:{
			forgetPwd(){
				uni.navigateTo({
					url:"../meInfo/children/password"
				})
			},
			rememberMe(){
				this.checked=!this.checked
			},
			submitAp() {
				if (this.account === "") {
					this.warning("用户名/手机号不能为空哟")
					return
				}
				if (this.password === "") {
					this.warning("密码不能为空哟")
					return
				}
				if (this.validate2()) {
					uni.request({
						url:serverUrl+'/users/tpLogin',
						data:{
							"telephone":this.account,
							"password":this.password,
						},
						method:"POST",
						success: (res) => {
							// debugger
							if(res.data.code===0){
								var userInfo ={}
								userInfo=res.data.data
								console.log(res.data.data)
								// 缓存的API  保存用户信息到全局的缓存中
								uni.setStorageSync("globalUser",userInfo)
								if (this.checked) {
									uni.setStorageSync('account',this.account)
									uni.setStorageSync('pwd',this.password)
								}
								uni.navigateBack({delta:1});
								uni.showToast({
									title:res.data.msg,
									duration:2000,
									image:"../../static/icos/xixi.png"
								})
							}else if(res.data.code===466){
								uni.showToast({
									title:res.data.msg,
									duration:2000,
									image:"../../static/icos/error1.jpg"
								})
							}else if(res.data.code===1){
								uni.showToast({
									title:res.data.msg,
									duration:2000,
									image:"../../static/icos/error1.jpg"
								})
							}
						}
					})
				}else {
					uni.request({
						url:serverUrl+'/users/upLogin',
						data:{
							"username":this.account,
							"password":this.password,
						},
						method:"POST",
						success: (res) => {
							// debugger
							if(res.data.code===0){
								var userInfo ={}
								userInfo=res.data.data
								console.log(res.data.data)
								// 缓存的API  保存用户信息到全局的缓存中
								uni.setStorageSync("globalUser",userInfo)
								if (this.checked) {
									uni.setStorageSync('account',this.account)
									uni.setStorageSync('pwd',this.password)
								}
								uni.navigateBack({delta:1})
								uni.showToast({
									title:res.data.msg,
									duration:2000,
									image:"../../static/icos/xixi.png"
								})
							}else if(res.data.code===466){
								uni.showToast({
									title:res.data.msg,
									duration:2000,
									image:"../../static/icos/error1.jpg"
								})
							}else if(res.data.code===1){
								uni.showToast({
									title:res.data.msg,
									duration:2000,
									image:"../../static/icos/error1.jpg"
								})
							}
						}
					})
				}
			},
			// submitTc() {
			// 	if (this.telephone === "") {
			// 		this.warning("手机号不能为空哟")
			// 		return
			// 	}
			// 	if (this.otpCode === "") {
			// 		this.warning("验证码不能为空哟")
			// 		return
			// 	}
			// 	if (this.validate()) {
			// 		uni.request({
			// 			url:serverUrl+'/users/otpLogin',
			// 			data:{
			// 				"telephone":this.telephone,
			// 				"validCode":this.otpCode,
			// 			},
			// 			method:"POST",
			// 			success: (res) => {
			// 				// debugger
			// 				if(res.data.code===0){
			// 					this.successHandler()
			// 				}else if(res.data.code===466){
			// 					uni.showToast({
			// 						title:res.data.msg,
			// 						duration:2000,
			// 						image:"../../static/icos/error1.jpg"
			// 					})
			// 				}
			// 			}
			// 		})
			// 	}
			// },
			successHandler(){
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
			},
			getOtpCode(){
				var telephone = this.telephone
						if (telephone === "") {
							this.warning("手机号不能为空哟")
							return
						}
							uni.request({
								url:serverUrl+'/users/otp/'+telephone,
								method:'GET',
								success: (res) => {
									if(res.data.code===0){
										uni.showToast({
											title:res.data.data,
											mask:true,
											duration:2000
										})
										if(this.codeTime>0){return}
										this.codeTime=30
										let timer = setInterval(()=>{
											if(this.codeTime>=1){
												this.codeTime--
											}else{
												this.codeTime=0
												clearInterval(timer)
											}
										},1000)
									}
									if (res.data.code === 10009) {
										uni.showToast({
											title:res.data.msg,
											mask:true,
											duration:2000
										})
									}
								}
							});
			
					},
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
								if(res.data.code===0){
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
				this.username="",
				this.password="",
				this.telephone="",
				this.otpCode=""
			},
			changeLogin(){
				this.initForm()
				this.status=!this.status
			},
			validate(){
				var mPattern =/^1[34578]\d{9}$/
				if(!mPattern.test(this.telephone)){
					this.warning("手机号格式错误")
					return false
				}else{
					return true
				}
			},
			validate2(){
				var mPattern =/^1[34578]\d{9}$/
				if(!mPattern.test(this.account)){
					// this.warning("手机号格式错误")
					return false
				}else{
					return true
				}
			},
			warning(msg) {
				this.HMmessages.show(msg, {iconColor: '#ffffff', fontColor: '#ffffff', background: "#ffd655"})
			}
		},


	}
</script>

<style>
	@import url("registLogin.css");
</style>
