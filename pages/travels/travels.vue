<template>
	<view>
		<view class="travels">
			<!-- 标题 -->
			<view class="travels-title">
				<input type="text" placeholder="给旅行日记起个标题吧" class="place-text" v-model="titleData"/>
			</view>
			<!-- 描述 -->
			<view class="travels-describe">
				<textarea  placeholder="描述下你的旅行心得,帮助更多旅行的人" v-model="contentData"/>
			</view>
		</view>
		<!-- 上传图片 -->
		<view class="travels-image">
			<view class="topimg">
				<image src="../../static/tab/topimg.png" mode="widthFix" @click="uploadImg()"></image>
			</view>
			<!-- 九宫格 -->
			<view class="conteng">
				<block v-for="(item,index) in imgs" :key="index">
					<view class="conteng-img">
						<image :src="item" mode="aspectFill" class="uploadimg" @click="preImage(index)"></image>
						<image src="../../static/tab/deteimg.svg" mode="widthFix" class="deleteimg" @click="deleteImg(index)"></image>
					</view>
				</block>
			</view>
		</view>
		<!-- 发布 -->
		<view class="release" @click="submit()">
			发布
		</view>
		<!-- 及时反馈组件 -->
		<HMmessages ref="HMmessages" @complete="HMmessages = $refs.HMmessages" @clickMessage="clickMessage"></HMmessages>

	</view>
</template>

<script>
	//及时反馈
	import HMmessages from "../../components/HM-messages/HMmessages.vue"
	export default {
		name:"travels",
		components:{
			HMmessages
		},
		data() {
			return {
				uploadvideos: false,
				watchaddress: '',
				classData: '景点',  //分类
				titleData: '',   //标题内容
				contentData: '',   //描述
				imgs: [],   //上传的图片
				videos: '',  //上传的视频
				address: '', //选择的城市
				avatarUrl: '', // 用户头像
				nickName: ''
			};
		},

		methods: {
			// 上传图片
			uploadImg(){
				uni.chooseImage({
					count: 9, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res)=> {
						this.topimg.push(...res.tempFilePaths)

					}
				});
			},
			// 删除图片
			deleteImg(index){
				console.log(index)
				this.topimg.splice(index,1)
				console.log(this.topimg)
			},
			// 预览图片
			preImage(index){
				// 预览图片
				let imglist = this.topimg
				preview(index,imglist)
						.then((res)=>{
							console.log('预览成功')
						})
						.catch((err)=>{
							console.log('预览失败')
						})
			},
			// 提交
			submit(){
				if(this.titleData == ''){
					let message = '亲，记得写标题哦'
					this.alert(message)
				}else if(this.contentData == ''){
					let message = '亲，内容一定要填哦'
					this.alert(message)
				}else if(this.imgs.length < 3){
					let message = '上传的图片不少于三张'
					this.alert(message)
				}else{
					console.log('可以提交' +this.titleData)
					console.log('可以提交' +this.contentData)
					// 判断用户是否登录，登录再提交
					// this.userinfo()
				}
			},
			// 及时反馈
			alert(message){
				this.HMmessages.show(message,{iconColor:"#ffffff",background: "#ffd655"})
			}
		}
	}
</script>

<style>
	@import url("travel.css");
</style>
