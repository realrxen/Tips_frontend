<template>
	<view>
		<view class="page page-fill User-Post">
		<view class="article">
			<!-- 头像昵称 -->
			<view class="userWrapper" :data-postId="post.postId" @click="goToPostDetail(post)">
				<view class="userInfoWrapper" :data-postId="post.postId" @click="goToPostDetail(post)">
					<image :src="post.faceIcon" class="faceIcon" :data-postId="post.postId" lazy-load @click="goToPostDetail(post)"></image>
					<view class="userDetailWrapper">
						<view class="userName" :data-postId="post.postId" @click="goToPostDetail(post)">{{post.nickname}}</view>
						<view class="createTime" :data-postId="post.postId" @click="goToPostDetail(post)">{{post.createTime}}</view>
					</view>
				</view>
				<view id="follow" class="follow animated" hover-class="rotateOutDownRight" @click.stop="follow"
				v-if="!post.isFollow">+关注</view>
			</view>
			<view>
				<!--标题-->
				<view class="title" @click="goToPostDetail(post)" :data-postId="post.postId">{{post.content}}</view>
				<!--图片 -->
				<view class="bg-white" :class="post.imgUrls.length>0?'padding-thirty':'padding-xs'">
					<view class="grid col-3 grid-square">
							<image :src="imgurl" v-for="(imgurl,index) in post.imgUrls" :key="index" @click.stop="viewMe(index)" class="coverPicture" v-if="post.imgUrls">
					</view>
				</view>
			</view>
			<view class="myTagsWrapper"  @click="goToPostDetail(post)" :data-postId="post.postId">
				<view  class="bg-main myTag" v-for="(tag,index) in post.tags" :key="tag.tagId">
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
				<view class="myIcon animated cuIcon-comment faster" hover-class="rubberBand font-color-change"
				  @click="goToPostDetail(post)" :data-postId="post.postId">
						<text class="iconfont icon-shanzi icon"></text>
						<text class="iconText">{{post.commentCount>0?post.commentCount:'评论'}}</text>
				</view>
				<!-- 收藏 -->
				<view class="myIcon animated cuIcon-forward faster" hover-class="rubberBand font-color-change">
						<text class="iconfont icon-dahongdenglong icon"></text>
						<text class="iconText">{{post.collectCount}}</text>
				</view>
			</view>
			<view class="operationWrapper" v-if="currentUserId==post.userId&&currentUserId!=''">
				<view class="operationText" @tap="edit" :data-postId="post.postId">编辑</view>
				<view class="operationText" @tap="deletePost" :data-postId="post.postId">删除</view>
			</view>
		</view>

	</view>
	</view>
</template>


<script>
	import common from "../../../common/common.js"
	var serverUrl = common.serverUrl
	export default{
		name:"UserPost",
		props:{
			post:Object,
			index:Number,
			currentUserId:String
		},
		data() {
				return {
				userId:"",
				userInfo:{},
				token:'',
				type:'',
				}

			},
			onLoad() {
				var userInfo = uni.getStorageSync("globalUser")
				if(userInfo!=null&&userInfo!=""&&userInfo!=undefined){
					this.userInfo=userInfo
					this.token="Bearer "+this.userInfo.token
					this.type=this.userInfo.tokenType
					this.userId=this.userInfo.userId
				}
			},
		methods:{
			viewMe(index){
				var current = index
				uni.previewImage({
					current:current,
					urls: this.post.imgUrls,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							// console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
			edit(e){
				var postId = e.currentTarget.dataset.postid
				uni.navigateTo({
					url:'../send/PostEdit?postId='+postId
				})
			},
			deletePost(e){
				var postId = e.currentTarget.dataset.postid
				this.$emit("deletePost",postId)
			},
			love(type){
				this.$emit("love",{
					type,
					index:this.index
					})
			},
			goToPostDetail(data){
				var postStr = JSON.stringify(data)
				uni.navigateTo({
					url:'./PostDetail?postStr='+postStr
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
	@import url("./UserPost.css");



</style>
