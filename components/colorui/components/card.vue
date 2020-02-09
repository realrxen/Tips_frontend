<template>
	<view>
		<view class="cu-bar bg-white solid-bottom" :class="isCard?'margin-top':''">
			<view class="action">
				<text class="cuIcon-titles text-orange "></text> 动态类卡片
			</view>
			<view class="action">
				<switch :class="isCard?'checked':''" :checked="isCard?true:false" @change="IsCard"></switch>
			</view>
		</view>
		<view class="cu-card dynamic" :class="isCard?'no-card':''">
			<view class="cu-item shadow">
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"></view>
						<view class="content flex-sub">
							<view>凯尔</view>
							<view class="text-gray text-sm flex justify-between">
								2019年12月3日
							</view>
						</view>
					</view>
				</view>
				<view class="text-content">
					折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！
				</view>
				<view class="grid flex-sub padding-lr" :class="isCard?'col-3 grid-square':'col-1'">
					<view class="bg-img" :class="isCard?'':'only-img'" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"
						  v-for="(item,index) in isCard?9:1" :key="index">
					</view>
				</view>
				<view class="text-gray text-sm text-right padding">
					<text class="cuIcon-attentionfill margin-lr-xs"></text> 10
					<text class="cuIcon-appreciatefill margin-lr-xs"></text> 20
					<text class="cuIcon-messagefill margin-lr-xs"></text> 30
				</view>

				<view class="cu-list menu-avatar comment solids-top">
					<view class="cu-item">
						<view class="cu-avatar round" style="background-image:url(https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png);"></view>
						<view class="content">
							<view class="text-grey">莫甘娜</view>
							<view class="text-gray text-content text-df">
								凯尔，你被自己的光芒变的盲目。
							</view>
							<view class="bg-grey padding-sm radius margin-top-sm  text-sm">
								<view class="flex">
									<view>凯尔：</view>
									<view class="flex-sub">妹妹，你在帮他们给黑暗找借口吗?</view>
								</view>
							</view>
							<view class="margin-top-sm flex justify-between">
								<view class="text-gray text-df">2018年12月4日</view>
								<view>
									<text class="cuIcon-appreciatefill text-red"></text>
									<text class="cuIcon-messagefill text-gray margin-left-sm"></text>
								</view>
							</view>
						</view>
					</view>

					<view class="cu-item">
						<view class="cu-avatar round" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"></view>
						<view class="content">
							<view class="text-grey">凯尔</view>
							<view class="text-gray text-content text-df">
								妹妹，如果不是为了飞翔，我们要这翅膀有什么用?
							</view>
							<view class="bg-grey padding-sm radius margin-top-sm  text-sm">
								<view class="flex">
									<view>莫甘娜：</view>
									<view class="flex-sub">如果不能立足于大地，要这双脚又有何用?</view>
								</view>
							</view>
							<view class="margin-top-sm flex justify-between">
								<view class="text-gray text-df">2018年12月4日</view>
								<view>
									<text class="cuIcon-appreciate text-gray"></text>
									<text class="cuIcon-messagefill text-gray margin-left-sm"></text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import UserPost from "../../../pages/information/components/UserPost";
	export default {
		components:{
			UserPost
		},
			data() {
				return {
					isCard: false,
					post:[
						{
							username:"Seeumt",
							faceIcon:'http://seeumt.oss-cn-hangzhou.aliyuncs.com/870c6addbb7b48988799af07b0a6d5c2.png',
							createTime:'2000-10-07',
							isFollow:false,
							title:'Lo看附件打开附件打开啦基督教考虑到房价快递君框架的克里夫健康的即可饥渴',
							coverPicture:"http://seeumt.oss-cn-hangzhou.aliyuncs.com/5ebfed05dbd340a69cd288d75628986a.jpg",
							love:{
								type:'like',
								likeCount:6000,
								hateCount:0
							},
							commentCount:8222000,
							collectCount:5000,
						}

					]
				};
			},
			methods: {
				IsCard(e) {
					this.isCard = e.detail.value
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
