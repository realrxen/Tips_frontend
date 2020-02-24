<template class="bg-white">
	<view class="fixed-bottom">
		<view class="iconWrapper">
			<view class="iconfont cuIcon-paint myIcon animated" hover-class="jello"></view>
			<navigator url="../components/colorui/components/verticalnav">
				<view class="iconfont cuIcon-tag myIcon animated" hover-class="jello"></view>
			</navigator>
			<view class="iconfont cuIcon-album myIcon animated" hover-class="jello"></view>
		</view>
		<view class="bg-main send animated" hover-class="flash" style="color: #FFFFFF;" @click="send">{{edit?"更新":"发送"}}</view>
	</view>
</template>

<script>
	import common from "../../../common/common.js"
	var serverUrl =  common.serverUrl
	export default{
		name:"BottomBar",
		props:{
			targetPostId:String,
			Post:Object,
			edit:{
				type: Boolean,
				default: false
			},
			editText:String,
		},
		data(){
			return{
				userId:"",
				userInfo:{},
				token:'',
				type:'',
			}
		},
		//TODO 子组件不可以用onLoad(),但可用created()函数
		created() {
			var userInfo = uni.getStorageSync("globalUser")
			if(userInfo!=null&&userInfo!=""&&userInfo!=undefined){
				this.userInfo=userInfo
				this.token="Bearer "+this.userInfo.token
				this.type=this.userInfo.tokenType
				this.userId=this.userInfo.userId
			}
		},

		methods:{
			send() {
				if(this.Post.imgUrls.length===0&&(this.Post.content==null||this.Post.content==undefined||this.Post.content=="")){
					this.$emit("isNull","您这是唱哪出呢？")
					return
				}
				uni.showLoading({
					title:"发送中...",
					mask:true,
				})
				if (this.edit) {
					var imgs=this.Post.imgUrls
					if(this.Post.content===""){
						this.Post.content=this.editText
					}
					if(imgs.length>0){
						for (let i = 0; i < imgs.length; i++) {
							uni.uploadFile({
								header:{
									"Authorization":this.token,
									"type":this.type
								},
								url:serverUrl+'/oss/insert?parentId='+this.targetPostId,
								filePath:imgs[i],
								name:"file",
								method:'POST',
								success: (re) => {
									var mydata = JSON.parse(re.data)
									if(mydata.code===0){
										uni.request({
											url:serverUrl+'/posts/one?postId='+this.targetPostId+'&content='+this.Post.content,
											method:'PUT',
											success: (resp) => {
												if(resp.data.code===0){
													uni.hideLoading()
													uni.showToast({
														title:"更新成功!",
														duration:2000,
													})
													uni.redirectTo({
														url:'../post/post'
													})
												}
											}
										})
									}else if(mydata.code===30002){
										uni.hideLoading()
										uni.showToast({
											title:mydata.msg,
											duration:2000,
										})
										uni.navigateBack({
											delta:1
										})
									}

								},
							})
						}}else{
							uni.request({
								url:serverUrl+'/posts/one?postId='+this.targetPostId+'&content='+this.Post.content,
								method:'PUT',
								success: (resp) => {
									if(resp.data.code===0){
										uni.hideLoading()
										uni.showToast({
											title:"更新成功!",
											duration:2000,
										})
										// uni.navigateBack({delta:1})
										uni.redirectTo({
											url:'../post/post'
										})
									}else if(resp.data.code===30002){
										uni.hideLoading()
										uni.showToast({
											title:resp.data.msg,
											duration:2000,
										})
										uni.navigateBack({
											delta:1
										})
									}
								}
							})
						uni.showToast({title:"更新成功!",duration:1200})
						uni.redirectTo({
							url:'../post/post'
						})
					}
				} else {
					uni.request({
						header:{
							"Authorization":this.token,
							"type":this.type
						},
						url:serverUrl+'/posts/',
						data:{
							"userId":this.Post.userId,
							"content":this.Post.content,
							"type":this.Post.type,
							"tagIds":this.Post.tagIds,
							"location":this.Post.location,
						},
						method:'POST',
						success: (res) => {
							if(res.data.code===0){
								var currentPostId=res.data.data
								var imgs=this.Post.imgUrls
								if(imgs.length>0){
									for (let i = 0; i < imgs.length; i++) {
										uni.uploadFile({
											header:{
												"Authorization":this.token,
												"type":this.type
											},
											url:serverUrl+'/oss/insert?parentId='+currentPostId,
											filePath:imgs[i],
											name:"file",
											method:'POST',
											success: (response) => {

												uni.showToast({
													title:"发布成功!",
													duration:2000,
												})
												uni.navigateBack({delta:1})
												// uni.redirectTo({
												// 	url:'../post/post'
												// })
											},
										})
									}}else{
									uni.showToast({title:"发布成功!",duration:1200})
									uni.navigateBack({delta:1})
								}
								//
							}else if(res.data.code===30002){
										uni.hideLoading()
										// uni.navigateBack({
										// 	delta:1
										// })
										uni.reLaunch({
											url:"../me/me"
										})
										uni.showToast({
											title:res.data.msg,
											duration:2000,
										})
									}
						},

					});
				}
		}
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
