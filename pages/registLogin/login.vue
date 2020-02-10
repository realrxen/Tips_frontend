<template>
	<view>
		<template v-if="status">
			<view class="face-wrapper">
				<image src="../../static/icos/default-face.png" class="face"></image>
			</view>
			<!-- <view class="text-login">账号密码登录</view> -->
			<view class="loginFormWrapper">
				<view class="form-item" style="margin-bottom: 20rpx;">
					<label class="words-label">账号</label>
					<template v-if="status">
						<input v-model="username" class="input" type="text" placeholder="用户名/手机号/邮箱" value="" placeholder-class="graywords" />
						<view class="form-item">
							<label class="words-label">密码</label>
							<input  v-model="password" class="input" style="margin-bottom: 20rpx;" type="text" placeholder="请输入密码" value="" placeholder-class="graywords" />
							<view class="forgetPwd" style="background-color: #FFFFFF;">忘记密码?</view>
						</view>
					</template>

					<template v-else>
						<input v-model="telephone" class="input" type="text" placeholder="用户名/手机号/邮箱" value="" placeholder-class="graywords" />
						<view class="form-item">
							<label class="words-label">验证码</label>
							<input  v-model="code" class="input" style="margin-bottom: 20rpx;" type="text" placeholder="请输入密码" value="" placeholder-class="graywords" />
							<view :class="codeTime>0?'forgetPwd1':'forgetPwd'" style="color: #ffffff; text-align: center;" @click="getCode">{{codeTime>0?codeTime+'s':'获取验证码'}}</view>
						</view>
					</template>
				</view>

			</view>
		</template>
		<template v-else>
			<navigator url="./teleLogin">
				<view class="text-login">手机验证码登录</view>
			</navigator>
			<view class="loginFormWrapper">
				<view class="form-item" style="margin-bottom: 12rpx;">
					<label class="words-label"style="margin-top: 20rpx;">+86</label>
					<input v-model="telephone" class="input" style="margin-left: 35rpx;" type="text" placeholder="手机号" value="" placeholder-class="graywords" />
					<view class="forgetPwd" style="background-color: #FFFFFF; color: #ffffff; text-align: center;"></view>
				</view>
				<view class="form-item">
					<label class="words-label"style="margin-top: 12rpx;">code</label>
					<input v-model="code" class="input" type="text" placeholder="请输入验证码" value="" placeholder-class="graywords"/>
					<view :class="codeTime>0?'forgetPwd1':'forgetPwd'" style="color: #ffffff; text-align: center;" @click="getCode">{{codeTime>0?codeTime+'s':'获取验证码'}}</view>
				</view>
			</view>
		</template>

		<view class="buttonWrapper">
			<button type="primary" :disabled="disabled" :class="disabled?'disabled-button':'loginButton'" @click="submit">登录</button>
		</view>
		<view class="questionWrapper">
			<view style="font-size: 30rpx;color: #969896;" @click="changeLogin">{{status?'验证码登录':'账号密码登录'}}</view>
			<text style="margin-left: 20rpx;margin-right: 20rpx;">|</text>
			<view style="font-size: 30rpx;color: #969896;">登录遇到问题</view>
		</view>
		<!-- #ifndef MP-WEIXIN -->
		<view class="socialLoginWrapper">
			<view style="width:120rpx;height:3rpx; background-color: #dddddd"></view>
			<view style="color: #969896;margin: 0 20rpx;">社交账号登录</view>
			<view style="width:120rpx;height:3rpx; background-color: #dddddd"></view>
		</view>
		<view class="third-icos-wrapper">
				<image src="../../static/icos/weixin.png"  class="third-ico"></image>
				<image src="../../static/icos/QQ.png" class="third-ico" style="margin-left: 80upx;"></image>
				<image src="../../static/icos/weibo.png" class="third-ico" style="margin-left: 80upx;"></image>
		</view>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<view class="socialLoginWrapper">
			<view style="width:120rpx;height:3rpx; background-color: #dddddd"></view>
			<view style="color: #969896;margin: 0 20rpx;">微信授权登录</view>
			<view style="width:120rpx;height:3rpx; background-color: #dddddd"></view>
		</view>
		<view class="third-icos-wrapper">
				<image src="../../static/icos/weixin.png"  class="third-ico"></image>
		</view>
		<!-- #endif -->

	</view>
</template>

<script>
	// import UniStatusBar from"../../components/uni-ui/uni-status-bar/uni-status-bar.vue"
	export default {
		components:{
			// UniStatusBar
		},
		data() {
			return {
				status:true,
				username:'',
				password:'',
				telephone:'15600000000',
				code:'',
				codeTime:0
			}
		},
		methods: {
			submit(){
				// 表单验证、
				if(!this.validate()) return
			},
			validate(){
				var mPattern =/^1[34578]\d{9}$/
				if(!mPattern.test(this.telephone)){
					uni.showToast({
						title:'手机号格式错误'
					})
					return false
				}
			},
			getCode(){
				if(this.codeTime>0){
					return
				}
				this.codeTime=30
				let timer = setInterval(()=>{
					if(this.codeTime>=1){
					this.codeTime--
					}else{
						this.codeTime=0
						clearInterval(timer)
					}
				},1000)
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
		computed:{
			disabled(){
				if((this.username===''||this.password==='')&&(this.telephone===''||this.code==='')){
					return true
				}
				return false
			}
		}
	}
</script>

<style>
	.face-wrapper {
		display: flex;
		flex-direction: row;
		justify-content: center;
		margin-top: 30rpx;
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
	}
	.words-label{
		font-size: 18.75px;
		color: #808080;
	}
	.input{
		width: 400rpx;
		height: auto;
		margin-left: 20rpx;
		margin-top: 10rpx;
	}
	.graywords {
		color: #e5eae2;
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
		background-color: #FFD655;
	}
	.forgetPwd1{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 140rpx;
		height: 70rpx;
		padding: 5rpx;
		margin-top: 9rpx;
		margin-left: auto;
		background-color: #f0ec79;
	}
	.text-login{
		padding-top:65rpx;
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
	.disabled-button{
		border-radius: 50rpx;
		border: 0;
		font-size: 40rpx;
		color: #ffffff;
		background-color: #aaaaff;
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
