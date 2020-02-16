<template class="bg-white">
	<view class="send page-fill page">
		<!-- <NavBar></NavBar> -->
		<MyTextArea @getContent="getTextContent" :editText="post.content"></MyTextArea>
		<Tags @getTagIds="getTagIds" :hasSelectTags="hasSelectTags"></Tags>
		<UploadImages :edit="edit" @editImgsChange="editImgsChange" :isPost="isPost" @getImgList="getImgList" :imgs="hasPostImgs"></UploadImages>
		<HMmessages></HMmessages>
		<BottomBar :edit="edit" :Post="postForm" @click="send"></BottomBar>

	</view>
</template>

<script>
	import MyTextArea from "./components/TextArea.vue"
	import Tags from "../../components/colorui/components/tags";
	import UploadImages from "../../components/colorui/components/uploadImages";
	import HMmessages from "../../components/HM-messages/HMmessages";
	import BottomBar from "./components/BottomBar.vue";
	import common from "../../common/common.js";
	var serverUrl = common.serverUrl;
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
				edit:true,
				postId:"",
				isCard: false,
				isPost:true,
				showback:false,
				hasSelectTags:[],
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
							 uni.removeStorageSync("postDraft")
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
			if (userInfo != null && userInfo != "" && userInfo != undefined) {
				this.userInfo = userInfo
				this.token = "Bearer " + this.userInfo.token
				this.type = this.userInfo.tokenType
				this.userId = this.userInfo.userId
			} else {
				this.isFollow = false
			}
			this.postId = paramsObj.postId
			/* 返回 Post的图片 */
			uni.request({
				url: serverUrl + '/oss/imgs/' + this.postId,
				method: 'GET',
				success: (res) => {
					if (res.data.code === 0) {
						this.hasPostImgs = res.data.data.imgs
					}
				},
				fail: () => {

				},
				complete: () => {

				}
			});
			/*返回Post的已选标签*/
			uni.request({
				url:serverUrl+'/mt/'+this.postId,
				method:'GET',
				success: (res) => {
					if(res.data.code===0){
						this.hasSelectTags=res.data.data
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
			editImgsChange(data) {
				this.hasPostImgs = data;
				var newImgs = [];

				this.hasPostImgs.forEach((img,index)=>{
					if (img.imgId === "") {
						newImgs.push(img.imgUrl)
					}
				})
				this.postForm.imgUrls = newImgs;
				console.log(this.postForm)
			},
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
