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
	.article{
			padding: 20rpx;
		}
		.userWrapper{
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.faceIcon{
			width: 65rpx;
			height: 65rpx;
			border-radius: 100%;
			margin-right: 20upx;
		}

		.userInfoWrapper{
			display: flex;
			align-items: center;
	/* 		margin-left: 20rpx;
			margin-top: 18rpx; */
		}

		.userDetailWrapper{

		}
		.userName{
			font-size: 30rpx;
			line-height: 1.5;
		}
		.createTime{
			color: #9D9589;
			font-size: 25rpx;
			margin-top: -10rpx;
		}

		/* 关注按钮 start */
		.follow{
			width: 90rpx;
			height: 50rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 5rpx;
			background-color: #FFD655;
			color: #FFFFFF;
		}
		/* 关注按钮 end */

		/* 标题start */
		.title{
			width: 100%;
			font-size: 32rpx;
			padding: 0 20rpx 0 32rpx;
			margin: 10rpx 0 0 0;
			line-height: 1.2;
		}
		/* 标题end */

		/* 图片start */
		.imageWrapper{
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: space-between;
			padding: 12rpx 42rpx;
			margin-top: 5rpx;
			/* margin-left:20rpx; */

		}
		.coverPicture{
			width: 200rpx;
			height: 200rpx;
			border-radius: 15%;
			padding: 5rpx;
		}
		/* 图片end */

		/* 操作图标start */
		.operationIconsWrapper{
			display: flex;
			align-items: center;
			justify-content: space-around;
		}
		.icon{
	/* 		display: flex;
			flex: 1;
			align-items: center; */
			/* color: #FFD655; */
			/* color: #646762; */
			margin-right: 10rpx;
		}
		.font-color-change{
			color: #FFD655;
		}

		.font-color-change2{
			color: #FFD655;
		}
		/* 操作图标end */




</style>
