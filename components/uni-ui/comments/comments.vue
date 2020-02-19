<template>
	<view>
		<view class="uni-padding-wrap">
			<!-- 评论区 start -->
			<view class="uni-comment">

				<view class="uni-comment-list" v-for="(comment,index) in comments" :key="comment.id">
					<view class="uni-comment-face"><image :src="comment.faceIcon" mode="widthFix"></image></view>
					<view class="uni-comment-body">
						<view class="uni-comment-top">
							<text>{{comment.username}}</text>
						</view>
						<view class="uni-comment-content">{{comment.name}}</view>
						<view class="uni-comment-date">
							<view>2天前</view><view class="uni-comment-replay-btn">{{comment.childrenCount}}回复</view>
						</view>
					</view>
				</view>

<!--				<view class="uni-comment-list-reply">-->
<!--					<view class="uni-comment-face"><image src="http://img4.imgtn.bdimg.com/it/u=3006607636,42691152&fm=11&gp=0.jpg" mode="widthFix"></image></view>-->
<!--					<view class="uni-comment-body">-->
<!--						<view class="uni-comment-top">-->
<!--							<text>Judy</text>-->
<!--						</view>-->
<!--						<view class="uni-comment-content">Hi~~~</view>-->
<!--						<view class="uni-comment-date">-->
<!--							<view>2天前</view><view class="uni-comment-replay-btn">5回复</view>-->
<!--						</view>-->
<!--					</view>-->
<!--				</view>-->
<!--				<view class="uni-comment-list-reply">-->
<!--					<view class="uni-comment-face"><image src="http://img4.imgtn.bdimg.com/it/u=3006607636,42691152&fm=11&gp=0.jpg" mode="widthFix"></image></view>-->
<!--					<view class="uni-comment-body">-->
<!--						<view class="uni-comment-top">-->
<!--							<text>Judy</text>-->
<!--						</view>-->
<!--						<view class="uni-comment-content">Hi~~~</view>-->
<!--						<view class="uni-comment-date">-->
<!--							<view>2天前</view><view class="uni-comment-replay-btn">5回复</view>-->
<!--						</view>-->
<!--					</view>-->
<!--				</view>-->
<!--				<view class="uni-comment-list">-->
<!--					<view class="uni-comment-face"><image src="http://img4.imgtn.bdimg.com/it/u=3006607636,42691152&fm=11&gp=0.jpg" mode="widthFix"></image></view>-->
<!--					<view class="uni-comment-body">-->
<!--						<view class="uni-comment-top">-->
<!--							<text>Fiary</text>-->
<!--						</view>-->
<!--						<view class="uni-comment-content">Hi~~~</view>-->
<!--						<view class="uni-comment-date">-->
<!--							<view>2天前</view><view class="uni-comment-replay-btn">5回复</view>-->
<!--						</view>-->
<!--					</view>-->
<!--				</view>-->
<!--				<view class="uni-comment-list">-->
<!--					<view class="uni-comment-face"><image src="http://img4.imgtn.bdimg.com/it/u=3006607636,42691152&fm=11&gp=0.jpg" mode="widthFix"></image></view>-->
<!--					<view class="uni-comment-body">-->
<!--						<view class="uni-comment-top">-->
<!--							<text>Meli</text>-->
<!--						</view>-->
<!--						<view class="uni-comment-content">Hi~~~</view>-->
<!--						<view class="uni-comment-date">-->
<!--							<view>2天前</view><view class="uni-comment-replay-btn">5回复</view>-->
<!--						</view>-->
<!--					</view>-->
<!--				</view>-->
			</view>
			<!-- 评论区 end -->
		</view>
	</view>
</template>

<script>
export default {
	props:{
		comments:Array
	},
	data() {
		return {
		}
	}
}
</script>

<style>
	.uni-comment-list-reply{

	}

</style>
