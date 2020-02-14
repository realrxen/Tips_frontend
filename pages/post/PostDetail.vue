<template>
	<view>
		<view class="page page-fill User-Post">
		<view class="article">
			<!-- 头像昵称 -->
			<view class="userWrapper" >
				<view class="userInfoWrapper">
					<image :src="post.faceIcon" class="faceIcon" lazy-load @click="openSpace"></image>
					<view class="userDetailWrapper">
						<view class="userName">{{post.username}}</view>
						<view class="createTime">{{post.createTime}}</view>
					</view>
				</view>
				<view class="follow animated" hover-class="rotateOutDownRight" @tap="follow"
				v-if="!isFollow">+关注</view>
			</view>
			<view>
				<!--标题-->
				<view class="title" >{{post.content}}</view>
				<!--图片-->
<!--				<view class="imageWrapper">-->
<!--					<image :src="imgurl" v-for="(imgurl,index) in post.imgUrls" :key="index" class="coverPicture" v-if="post.imgUrls"-->
<!--					@click="goToPostDetail"></image>-->

<!--				</view>-->
				<view class="bg-white padding">
					<view class="grid col-3 grid-square">
							<image :src="imgurl" v-for="(imgurl,index) in post.imgUrls" :key="index" class="coverPicture" v-if="post.imgUrls"-->
					</view>
				</view>
			</view>
			<view class="myTagsWrapper" >
				<view class="bg-main myTag" v-for="(tag,index) in post.tags" :key="tag.tagId">
					<view class="tagContent">#{{tag.name}}</view>
				</view>
			</view>

			<!--图标按钮-->
			<view class="operationIconsWrapper">
				<!-- 点赞 -->
				<view class="myIcon cuIcon-like animated faster" hover-class="rubberBand font-color-change"
				@click="love('like')"
				:class="post.love.type==='like' ? 'font-color-change2':''"
				>
						<text class="iconfont icon-call-yellow icon"></text>
						<text class="iconText">{{post.love.likeCount>0?post.love.likeCount:'喜欢'}}</text>
				</view>
				<!-- 点踩 -->
				<view class="myIcon cuIcon-selection animated faster" hover-class="rubberBand font-color-change"
				@click="love('hate')"
				:class="post.love.type==='hate' ? 'font-color-change2':''"
				>
						<text class="iconfont icon-cai icon"></text>
						<text class="iconText">{{post.love.hateCount>0?post.love.hateCount:'不喜欢'}}</text>
				</view>
				<!-- 评论 -->
				<view class="myIcon animated cuIcon-comment faster" hover-class="rubberBand font-color-change" >
						<text class="iconfont icon-shanzi icon"></text>
						<text class="iconText">{{post.commentCount>0?post.commentCount:'评论'}}</text>
				</view>
				<!-- 收藏 -->
				<view class="myIcon animated cuIcon-forward faster" hover-class="rubberBand font-color-change">
						<text class="iconfont icon-dahongdenglong icon"></text>
						<text class="iconText">{{post.collectCount}}</text>
				</view>
			</view>
		</view>
	</view>
		<CutBar :text="cutBarText" :commentCount="commentCount"></CutBar>
		<Comments></Comments>
		<ChatBar></ChatBar>
	</view>
</template>


<script>
	import common from "../../common/common.js"
	import CutBar from "../../components/colorui/components/cutbar";
	import Comments from "../../components/uni-ui/comments/comments";
	import ChatBar from "../../components/colorui/components/chatbar";
	// import ChatBar from "../../components/user-chat/user-chat-bottom";
	var serverUrl = common.serverUrl;
	export default{
		name:"PostDetail",
		props:{

		},
		components:{
			CutBar,
			Comments,
			ChatBar
		},
		data() {
				return {
				postId:"",
				isFollow:false,
				cutBarText:"最新评论",
				commentCount: 0,
				userId:"",
				userInfo:{},
				token:'',
				type:'',
				post:{}
				}

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
				uni.request({
					url:serverUrl+'/posts/'+this.postId,
					method:'GET',
					success: (res) => {
						if(res.data.code===0){
							var post =res.data.data
							this.post= post
							this.commentCount=post.commentCount
							uni.request({
								header:{
									"Authorization":this.token,
									"type":this.type
								},
								url:serverUrl+'/follows/'+post.userId+'?userId='+this.userId,
								method:'GET',
								success: (res) => {
									console.log(res)
									if(res.data.code===0){
										this.isFollow=res.data.data
										console.log(this.isFollow)

									}

								},
								fail: () => {

								},
								complete: () => {

								}
							});
						}

					},
					fail: () => {

					},
					complete: () => {

					}
				});



			},
		methods:{
			follow(){
				var idolId=this.post.userId
				uni.request({
					header:{
						"Authorization":this.token,
						"type":this.type
					},
					url:serverUrl+'/follows/',
					method: 'POST',
					data:{
						"userId":this.userId,
						"idolId":idolId
					},
					success: (res) => {
						if(res.data.code===123){
							uni.showToast({title:res.data.msg,duration:1500})
							this.isFollow=true
						}else if (res.data.code === 30003) {
							uni.showToast({title:res.data.msg,duration:1500})
						}else if (res.data.code === 30002) {
							uni.showToast({title:res.data.msg,duration:1500})
						}else if (res.data.code === 147) {
							uni.showToast({title:res.data.msg,duration:1500})
						}
					},
					complete() {
						// uni.hideNavigationBarLoading()

					}
				})

			},
			love(type){
				this.$emit("love",{
					type,
					index:this.index
					})
			},
			goToPostDetail(){
				uni.navigateTo({
					url:"./PostDetail"
				})

			},
			follow(index){
				// 点击后触发一个事件给父组件
				this.$emit('follow',this.post.userId)
			},
			openSpace(){
				uni.navigateTo({
					url:"../userCenter/userCenter"
				})
			},

		}

	}

</script>

<style>
	@import url("./PostDetail.css");



</style>
