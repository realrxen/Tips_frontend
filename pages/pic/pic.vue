<template>
	<view class="black">
		<image :src="imgUrl"
		mode="widthFix"
		class="cover"
		@longpress="operator"></image>
	</view>
</template>

<script>
	export default{
		data() {
			return{
				imgUrl:""
			};
		},
		onLoad(params) {
			uni.setNavigationBarColor({
				frontColor:"#000000",
				backgroundColor:"#FFFFFF"
			}),
			this.imgUrl=params.imgUrl
		},
		methods:{
			operator(){
				uni.showActionSheet({
					itemList:["收留我","嘿嘿嘿","嘻嘻嘻"],
					success:(res)=> {
						if(res.tapIndex==0){
							uni.showLoading({
								title:"图片保存中"
							}),
							uni.downloadFile({
								url:this.imgUrl,
								success: (result) => {
									var tempFilePath = result.tempFilePath
									console.log(tempFilePath)
									uni.saveImageToPhotosAlbum({
										filePath:tempFilePath,
										success: () => {
											uni.showToast({
												title:"成功保存！",
												duration:2000
											})
										},
										complete: () => {
											uni.hideLoading();
										}
									})
								}
							})
						}
					}
				})
			}
		}

	}
</script>

<style>
	.black{
		background-color: #000000;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		position: fixed;
	}

	.cover{
		align-self: center;
	}
</style>
