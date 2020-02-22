<template>
	<view class="page page-fill">
		<view class="page-block info-list">
					<!-- 头像 -->

					<view class="item-wrapper face-line-upbottom" @click="operator">
						<view class="info-words">头像</view>

						<view class="right-wrapper">
							<image :src="userInfo.faceIcon" class="face"></image>
							<view class="arrow-block">
								<image src="../../static/icos/left-gray-arrow.png" class="arrow-ico"></image>
							</view>
						</view>
					</view>

					<view class="line-top">
						<view class="line"></view>
					</view>

					<!-- 用户名 -->
					<view class="item-wrapper" @click="modifyNickname">
						<view class="info-words">用户名</view>

						<view class="right-wrapper">
							<view class="gray-fields">
								{{userInfo.username}}
							</view>
							<view class="arrow-block">
								<image src="../../static/icos/left-gray-arrow.png" class="arrow-ico"></image>
							</view>
						</view>
					</view>

					<view class="line-top">
						<view class="line"></view>
					</view>

					<!-- 昵称 -->
					<view class="item-wrapper" @click="modifyNickname">
						<view class="info-words">昵称</view>

						<view class="right-wrapper">
							<view class="gray-fields">
								{{userInfo.nickname}}
							</view>
							<view class="arrow-block">
								<image src="../../static/icos/left-gray-arrow.png" class="arrow-ico"></image>
							</view>
						</view>
					</view>

					<view class="line-top">
						<view class="line"></view>
					</view>

					<!-- 手机号 -->
					<view class="item-wrapper" @click="bindTel">
						<view class="info-words">手机号</view>

						<view class="right-wrapper">
							<view class="gray-fields">
		{{userInfo.telephone!==null&&userInfo.telephone!==undefined&&userInfo.telephone!=="none"?userInfo.telephone:"绑定手机号"}}
							</view>
							<view class="arrow-block">
								<image src="../../static/icos/left-gray-arrow.png" class="arrow-ico"></image>
							</view>
						</view>
					</view>

					<view class="line-top">
						<view class="line"></view>
					</view>

					<!-- 更改密码 -->
					<view class="item-wrapper" @click="resetPwd">
						<view class="info-words">更改密码</view>

						<view class="right-wrapper">
							<view class="gray-fields">
							</view>
							<view class="arrow-block">
								<image src="../../static/icos/left-gray-arrow.png" class="arrow-ico"></image>
							</view>
						</view>
					</view>

					<view class="line-top">
						<view class="line"></view>
					</view>

					<!-- 城市 -->
					<!-- <view class="item-wrapper" @click="modifyCity">
						<view class="info-words">城市</view>

						<view class="right-wrapper">
							<view class="gray-fields">
								{{userInfo.city}}
							</view>
							<view class="arrow-block">
								<image src="../../static/icos/left-gray-arrow.png" class="arrow-ico"></image>
							</view>
						</view>
					</view>

					<view class="line-top">
						<view class="line"></view>
					</view> -->

					<!-- 性别 -->
					<!-- <view class="item-wrapper" @click="modifySex">
						<view class="info-words">性别</view>
						<view class="right-wrapper">
							<view class="gray-fields">
								<view v-if="userInfo.gender == 0">
									男
								</view>
								<view v-else-if="userInfo.gender == 1">
									女
								</view>
								<view v-else>
									未选择
								</view>
							</view>
							<view class="arrow-block">
								<image src="../../static/icos/left-gray-arrow.png" class="arrow-ico"></image>
							</view>
						</view>
					</view>
					<view class="line-top">
						<view class="line"></view>
					</view> -->

					<!-- 生日 -->
					<!-- <view class="item-wrapper" @click="modifyBirthday">
						<view class="info-words">生日</view>

						<view class="right-wrapper">
							<view class="gray-fields">
								{{userInfo.birthday}}
							</view>
							<view class="arrow-block">
								<image src="../../static/icos/left-gray-arrow.png" class="arrow-ico"></image>
							</view>
						</view>
					</view>

					<view class="line-top">
						<view class="line"></view>
					</view> -->

				</view>

				<view class="footer-wrapper">
					<view class="footer-words" @click="cleanStorage">
						清理缓存
					</view>
					<view class="footer-words" style="margin-top: 10upx;" @click="logout">
						退出登录
					</view>
				</view>
	</view>
</template>

<script>
	import common from "../../common/common.js"
	var serverUrl = common.serverUrl
	export default{
		data(){
			return{
				userInfo:{},
				telephone:""
			}
		},
		onShow() {
			var me = this
			var userInfo = uni.getStorageSync("globalUser")
			if(userInfo!=null&&userInfo!=""&&userInfo!=undefined){
				this.userIsLogin = true
				this.userInfo=userInfo
				this.te
			}else{
				this.userIsLogin = false
			}
		},
		onLoad() {

		},
		methods:{
			resetPwd(){
				uni.navigateTo({
					url:"./children/password"
				})
			},
			bindTel(){
				uni.navigateTo({
					url:"./children/telephone"
				})
			},
			modifyBirthday(){
				uni.navigateTo({
					url:"../meBirthday/meBirthday"
				})
			},
			modifySex(){
				uni.navigateTo({
					url:"../sex/sex"
				})
			},
			modifyCity(){
				uni.navigateTo({
					url:"../meCity/meCity"
				})
			},
			modifyNickname(){
				uni.navigateTo({
					url:"../meNickname/meNickname"
				})
			},
			operator(){
				uni.showActionSheet({
					itemList:["查看我的头像","从相册中选择上传"],
					success: (res) => {
						var index = res.tapIndex
						if(index==0){
							var faceArr = []
							faceArr.push(this.userInfo.faceIcon)
							uni.previewImage({
								urls:faceArr,
								current:faceArr[0]
							})
						}else if(index==1){
							uni.chooseImage({
								count:1,
								sizeType:["compressed"],
								sourceType:["album","camera"],
								success: (res) => {
									//获得临时路径
								var tempFilePath = res.tempFilePaths[0]
								// #ifdef H5
								uni.navigateTo({
									url:"../meface/meface?tempFilePath="+tempFilePath
								})
								// #endif
								// #ifndef H5
								uni.navigateTo({
									url:"../faceCrop/faceCrop?tempFilePath="+tempFilePath
								})
								// #endif

								}
							})

						}
					}
				})
			},
			cleanStorage(){
				uni.clearStorageSync()
				uni.showToast({
					title:"成功清除缓存",
					mask:false,
					duration:1500
				})
				uni.navigateBack({delta:1})
			},
			logout(){
				var userInfo = this.getGlobalUser("globalUser")
				uni.request({
					url:serverUrl+'/users/logout?userId='+userInfo.userId,
					header:{
						"Authorization":"Bearer "+this.userInfo.token
					},
					method:'POST',
					// header:{
					// 	"Authorization":userInfo.token
					// },
					success:(res) => {
						if(res.data.code==0){
							uni.removeStorageSync("globalUser")
							uni.navigateBack({delta:1})
						}
					}
				})
		}
	}
}
</script>

<style>
	@import url("meInfo.css");
</style>
