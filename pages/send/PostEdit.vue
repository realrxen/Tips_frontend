<template class="bg-white">
	<view class="send page-fill page">
		<!-- <NavBar></NavBar> -->
		<MyTextArea @getContent="getTextContent" :editText="post.content"></MyTextArea>
		<Tags @getTagIds="getTagIds" :hasSelectTagList="hasSelectTagList"></Tags>
		<UploadImages :isPost="isPost" @getImgList="getImgList" :imgUrls="imgUrls"></UploadImages>
		<HMmessages></HMmessages>
		<BottomBar :Post="postForm" @click="send"></BottomBar>

	</view>
</template>

<script>
	import MyTextArea from "./components/TextArea.vue"
	import Tags from "../../components/colorui/components/tags";
	import UploadImages from "../../components/colorui/components/uploadImages";
	import HMmessages from "../../components/HM-messages/HMmessages";
	import BottomBar from "./components/BottomBar.vue"
	export default {
		// props:{
		// 	list:Array,
		// },
		components:{
			// NavBar,
			MyTextArea,
			Tags,
			UploadImages,
			HMmessages,
			BottomBar,

		},
		data() {
			return {
				postId:"",
				isCard: false,
				isPost:true,
				showback:false,
				hasSelectTagList:[],
				hasPostImgs:[],
				imageList:[],
				postForm:{
					userId:"",
					content:"",
					type:true,
					tagIds:"",
					imgUrls:[],
					location:"",
				},
				post:{},
			};
		},
		computed:{
			show(){
				return this.imageList.length>=0
			}
		},
		onBackPress(){
			if((this.content !==''||this.imageList.length>0)&&!this.showback){
				uni.showModal({
					content:'是否保存为草稿?',
					showCancel:true,
					cancelText:'不保存',
					confirmText:'保存',
					success: (res) => {
						if(res.confirm){
							this.saveDraft()
						}else{
							 uni.removeStorageSync("postDraft ")
						}
						uni.navigateBack({
							delta:1
						})
					}
				})
				this.showback=true
				return true
			}
			return true
		},
		onLoad(paramsObj) {
			var userInfo = uni.getStorageSync("globalUser")
			if(userInfo!=null&&userInfo!=""&&userInfo!=undefined){
				this.userInfo=userInfo
				this.token="Bearer "+this.userInfo.token
				this.type=this.userInfo.tokenType
				this.userId=this.userInfo.userId
			}else{
				this.isFollow=false
			}
			this.postId = paramsObj.postId
			/* 返回PostDTO */
			uni.request({
				url:serverUrl+'/posts/'+this.postId,
				method:'GET',
				success: (res) => {
					if(res.data.code===0){
						var post =res.data.data
						this.post= post
					}

				},
				fail: () => {

				},
				complete: () => {

				}
			});
		},
		onShow() {
			var userInfo = uni.getStorageSync("globalUser")
			if(userInfo!=null&&userInfo!=""&&userInfo!=undefined){
				this.userInfo=userInfo
				this.postForm.userId=this.userInfo.userId
			}
		},
		// onReady() {
		// 	this.imageList = this.list
		// },
		methods: {
			/*获取图片数组*/
			getImgList(data) {
				this.postForm.imgUrls = data;
				console.log(this.postForm)
			},
			/*获取标签ids String*/
			getTagIds(data) {
				this.postForm.tagIds = data;
			},
			/*获取文本内容*/
			getTextContent(data) {
				this.postForm.content = data;
			},
			// up() {
			// 	uni.chooseImage({
			// 		count: 6, //默认9
			// 		sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			// 		sourceType: ['album'], //从相册选择
			// 		success: function (res) {
			// 			console.log(JSON.stringify(res.tempFilePaths));
			// 		}
			// 	});
			// },
			saveDraft() {
				let obj = {
					content: this.content,
					imageList: this.imageList
				}
				uni.setStorage({
					key: "postDraft",
					data: JSON.stringify(obj)
				})
			},

			IsCard(e) {
				this.isCard = e.detail.value
			},

			changeImage(e) {
				console.log(e)
				this.imageList = e
			},


		}
	}
</script>

<style>
	.send{
		display: flex;
		flex-direction: column;
	}

</style>
