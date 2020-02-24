<template>
	<view class="body">

		<view class="face-wrapper">
			<image :src="userInfo.faceIcon" class="face"></image>
		</view>

		<view class="info-wrapper">
				<label class="words-lbl" style="margin-left: 17rpx;">手机号</label>
				<input v-model="telephone" class="input" type="text" :placeholder="status?'请输入用户名/手机号':'请输入手机号'" value="" placeholder-class="graywords" />
		</view>

			<view class="info-wrapper" style="margin-top: 25upx;">
				<label class="words-lbl">验证码</label>
				<input type="text" v-model="otpCode" class="input-otpCode" placeholder="请输入验证码" placeholder-class="graywords"/>
				<view class="animated" hover-class="RubberBand" :class="codeTime>0?'getOtpCodeBtnUn':'getOtpCodeBtn'" @click="getOtpCode">{{codeTime>0?codeTime+'s':'获取验证码'}}</view>
			</view>
			<view class="registerBtnWrapper">
				<view class="registerBtn animated" hover-class="bounceIn" @click="bind" style="margin-top: 60upx;margin-bottom: 5rpx; width: 90%;">Go!</view>
			</view>

		<HMmessages ref="HMmessages" @complete="HMmessages = $refs.HMmessages" @clickMessage="clickMessage"></HMmessages>
	</view>
</template>

<script>
	import common from "../../../common/common.js"
	var serverUrl = common.serverUrl
	import HMmessages from "../../../components/HM-messages/HMmessages.vue";
	export default{
		components:{
			HMmessages
		},
		data(){
			return{
				// userId:"",
				// password:""
				userId:"",
				userInfo:{},
				token:'',
				type:'',
				status:false,
				account:"",
				password:"",
				telephone:"",
				otpCode:"",
				codeTime:0,
				code:"",
				checked:true,
				faceIcon: "http://seeumt.oss-cn-hangzhou.aliyuncs.com/870c6addbb7b48988799af07b0a6d5c2.png"
			};
		},
		onShow() {
			this.show = false;
			var userInfo = uni.getStorageSync("globalUser")
			if(userInfo!=null&&userInfo!=""&&userInfo!=undefined){
				this.userInfo=userInfo
				this.token="Bearer "+this.userInfo.token
				this.type=this.userInfo.tokenType
				this.userId=this.userInfo.userId
			}
		},
		created(){
		},
		methods:{

			successHandler(){
				var userInfo ={}
				userInfo=res.data.data
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
				if (this.validate()) {
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
							}else if (res.data.code === 10008) {
								uni.showToast({
									title:res.data.msg,
									mask:true,
									duration:2000
								})
							}
						}
					});
				}


					},

			bind(){
				uni.request({
					header:{
						"Authorization":this.token,
						"type":this.type
					},
					url:serverUrl+'/users/bind?openId='+this.userInfo.openId+'&telephone='+this.telephone+'&code='+this.otpCode,
					method: 'POST',
					success: (res) => {
						if(res.data.code===0){
							uni.showToast({
								title: res.data.msg,
								duration:1500,
							});
							var userInfo = uni.getStorageSync("globalUser")
							userInfo.telephone=res.data.data
							uni.setStorageSync("globalUser",userInfo)
							uni.navigateBack({
								delta:1
							})
						}if(res.data.code===10012){
							uni.showToast({
								title: '未绑定微信',
								duration:1500,
							});
						}
					},
					complete() {


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
	@import url("telephone.css");
</style>
