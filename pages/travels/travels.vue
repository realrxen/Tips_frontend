<template>
	<view class="page page-fill">

		<view class="travels">
			<!-- 标题 -->
			<view class="travels-title">
				<input type="text" placeholder="给旅行日记起个标题吧" class="place-text" v-model="titleData"/>
			</view>
			<!-- 描述 -->
<!--			<view class="travels-describe">-->
<!--				<textarea  placeholder="描述下你的旅行心得,帮助更多旅行的人" v-model="contentData"/>-->
<!--			</view>-->
			<RichText></RichText>
<!--		<RichText></RichText>-->
<!--		<view class="travels-image">-->
<!--			<view class="topimg">-->
<!--				<image src="../../static/tab/topimg.png" mode="widthFix" @click="changePendingFace"></image>-->
<!--			</view>-->
<!--			&lt;!&ndash; 九宫格 &ndash;&gt;-->
<!--			<view class="conteng">-->
<!--				<block v-for="(item,index) in imgs" :key="index">-->
<!--					<view class="conteng-img">-->
<!--						<image :src="item" mode="aspectFill" class="uploadimg" @click="preImage(index)"></image>-->
<!--						<image src="../../static/tab/deteimg.svg" mode="widthFix" class="deleteimg" @click="deleteImg(index)"></image>-->
<!--					</view>-->
<!--				</block>-->
<!--			</view>-->
<!--		</view>-->
		<!-- 发布 -->
			<UploadImages></UploadImages>
		<view class="release" @click="upload">
			发布
		</view>
		<HMmessages ref="HMmessages" @complete="HMmessages = $refs.HMmessages" @clickMessage="clickMessage"></HMmessages>

		</view>
		<Tabbar></Tabbar>
	</view>
</template>


<script>
	import common from "../../common/common.js"
	import HMmessages from "../../components/HM-messages/HMmessages.vue"
	import RichText from "./components/richtext/RichText.vue";
	import UploadImages from "../../components/colorui/components/uploadImages";
	var serverUrl = common.serverUrl
	export default {
		components:{
			HMmessages,
			RichText,
			UploadImages
		},
		data() {
			return {
				imgUrl:"",
				tempFace: "",
				userInfo:{},
				token:'',
				type:'',
				imgs:[],
			};
		},
		onLoad() {
			var userInfo = uni.getStorageSync("globalUser")
			if(userInfo!=null&&userInfo!=""&&userInfo!=undefined){
				this.userInfo=userInfo
				this.token="Bearer "+this.userInfo.token
				this.type=this.userInfo.tokenType
				console.log(userInfo)
			}
		},
		methods: {
			upload(){

				// if(this.imgs.length===0){
				// 	this.HMmessages.show("成功",{iconColor:'#ffffff',fontColor:'#ffffff', background:"#ffd655"})
				// }
				var i = 0
				var length = this.imgs.length
				this.upLoadApi(i,length)
			},
			upLoadApi(i,length){
				var userInfo =this.getGlobalUser("globalUser")
				uni.uploadFile({
					url:serverUrl+'/oss/insert?parentId='+userInfo.userId,
					filePath:this.imgs[i],
					name:"file",
					success: (uploadFileRes) => {
						var response = JSON.parse(uploadFileRes.data)
						console.log(response.data)
						if(response.code==0){
							i++
							console.log(i)
						if (i < length) {
							// debugger
							this.upLoadApi(i,length);//upLoadApi undefined
						}else{
							return
						}
					}
					},
					complete(){}
					}
			)},

			// 重新选择头像
			changePendingFace(){
				uni.chooseImage({
					count:9,
					sizeType:["compressed"],
					sourceType:["album","camera"],
					success: (res) => {
						//获得临时路径
					// var tempFilePath = res.tempFilePaths[0]
					// console.log(res.tempFilePaths)
					// this.imgUrl=tempFilePath
					// console.log(this.imgUrl)

					this.imgs.push(res.tempFilePaths[0])
					console.log(this.imgs)
					}
				})
			}
			}
	}
</script>

<style>
	@import url("travel.css");
</style>
