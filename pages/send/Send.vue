<template class="bg-white">
	<view class="send page-fill page">
		<!-- <NavBar></NavBar> -->
		<MyTextArea></MyTextArea>
<!--		<view class="textWrapper">-->

<!--		</view>-->
		<Tags></Tags>
		<UploadImages :isPost="isPost"></UploadImages>
		<BottomBar></BottomBar>

	</view>
</template>

<script>
	import MyTextArea from "./components/TextArea.vue"
	import Tags from "../../components/colorui/components/tags";
	import UploadImages from "../../components/colorui/components/uploadImages";
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
			BottomBar,

		},
		data() {
			return {
				isCard: false,
				isPost:true,
				content:'',
				imageList:[],
				showback:false
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
		onload(){
			uni.getStorage({
				key:"postDraft",
				success:(res)=>{
					let result = JSON.prase(res.data)
					this.content= result.content
					this.imageList= result.imageList
				}
			})
		},
		// onReady() {
		// 	this.imageList = this.list
		// },
		methods: {
			up(){
				uni.chooseImage({
				    count: 6, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album'], //从相册选择
				    success: function (res) {
				        console.log(JSON.stringify(res.tempFilePaths));
				    }
				});
			},
			saveDraft(){
				let obj = {
						content:this.content,
						imageList:this.imageList
					}
				uni.setStorage({
					key:"postDraft",
					data:JSON.stringify(obj)
				})
			},

			IsCard(e) {
				this.isCard = e.detail.value
			},

			changeImage(e){
				console.log(e)
				this.imageList=e
			}
		}
	}
</script>

<style>
	.send{
		display: flex;
		flex-direction: column;
	}

</style>
