<template>
	<view class="page page-fill">
		<view class="article">
			<!-- 头像昵称 -->
			<view class="userWrapper">
				<view class="userInfoWrapper">
					<image :src="post.faceIcon" class="faceIcon" lazy-load @click="openSpace"></image>
					<view class="userDetailWrapper">
						<view class="userName">{{post.username}}</view>
						<view class="createTime">{{post.createTime}}</view>
					</view>
				</view>
				<view class="follow animated" hover-class="rotateOutDownRight" @click="follow"
				v-if="!post.isFollow">+关注</view>
			</view>
			<view>
				<!--标题-->
				<view class="title" @click="openDetail">{{post.title}}</view>
				<!--图片-->
				<view class="imageWrapper">
					<image :src="post.coverPicture" class="coverPicture" v-if="post.coverPicture"
					@click="openDetail"></image>
					<image :src="post.coverPicture" class="coverPicture" v-if="post.coverPicture"
					@click="openDetail"></image>
					<image :src="post.coverPicture" class="coverPicture" v-if="post.coverPicture"
					@click="openDetail"></image>
					<image :src="post.coverPicture" class="coverPicture" v-if="post.coverPicture"
					@click="openDetail"></image>
					<image :src="post.coverPicture" class="coverPicture" v-if="post.coverPicture"
					@click="openDetail"></image>
					<image :src="post.coverPicture" class="coverPicture" v-if="post.coverPicture"
					@click="openDetail"></image>
					<image :src="post.coverPicture" class="coverPicture" v-if="post.coverPicture"
					@click="openDetail"></image>
	<!-- 				<image :src="post.coverPicture" class="coverPicture" v-if="post.coverPicture"
					@click="openDetail"></image> -->
	<!-- 				<image :src="post.coverPicture" class="coverPicture" v-if="post.coverPicture"
					@click="openDetail"></image> -->
				</view>
			</view>
			
			<!--图标按钮-->
			<view class="operationIconsWrapper">
				<!-- 点赞 -->
				<view class="myIcon animated faster" hover-class="rubberBand font-color-change"
				@click="love('like')"
				:class="post.love.type==='like' ? 'font-color-change2':''"
				>
						<text class="iconfont icon-call-yellow icon"></text>
						<text class="iconText">{{post.love.likeCount>0?post.love.likeCount:'喜欢'}}</text>
				</view>
				<!-- 点踩 -->
				<view class="myIcon animated faster" hover-class="rubberBand font-color-change"
				@click="love('hate')"
				:class="post.love.type==='hate' ? 'font-color-change2':''"
				>
						<text class="iconfont icon-cai icon"></text>
						<text class="iconText">{{post.love.hateCount>0?post.love.hateCount:'不喜欢'}}</text>
				</view>
				<!-- 评论 -->
				<view class="myIcon animated faster" hover-class="rubberBand font-color-change">
						<text class="iconfont icon-shanzi icon"></text>
						<text class="iconText">{{post.commentCount>0?post.commentCount:'评论'}}</text>
				</view>
				<!-- 收藏 -->
				<view class="myIcon animated faster" hover-class="rubberBand font-color-change">
						<text class="iconfont icon-dahongdenglong icon"></text>
						<text class="iconText">{{post.collectCount}}</text>
				</view>
			</view>
		</view>

	</view>
</template>


<script>
	export default{
		name:"UserPost",
		props:{
			post:Object,
			index:Number
		},
		data() {
				return {

				}

			},
		methods:{
			love(type){
				this.$emit("love",{
					type,
					index:this.index
					})
			},
			openDetail(){
				console.log("详情页面")
			},
			follow(index){
				// 点击后触发一个事件给父组件
				this.$emit('follow',this.index)
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
