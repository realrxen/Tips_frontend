<template>
	<view id="id" class="content">
		<scroll-view scroll-y="true" style="height: 100%;" v-if="!crControl"
		@touchstart="refreshStart" @touchmove="refreshMove" @touchend="refreshEnd" @scrolltolower="loadMore">
			<refresh ref="refresh" @isRefresh='isRefresh'></refresh>
			<view v-for="(item, key) in myPageHelper.list" :key="key">
				<item :reviewMsg="item" @childReview="childReview" :obk="item" @commentMe="commentMe"></item>
			</view>
			<!-- <loadmore :status="more"></loadmore> -->
			<view class="getMore" :class="myPageHelper.hasNextPage?'cuIcon-loading2':''">{{myPageHelper.hasNextPage?'加载更多':'--- The end ---'}}</view>
		</scroll-view>
		<view class="childReview" v-if="crControl" :animation="animationData">
			<view class="myDetail">
				<view class="cr-title">
				<text class="textSendMsg">评论详情</text>
				<uniicon type="closeempty" size="30" color="#757575" @click="closeCr"></uniicon>
			</view>
			<scroll-view scroll-y="true" style="height: calc(100% - 50px);">
				<view v-for="(titem, key) in myPageHelperData.list" :key="key">
					<item :reviewMsg="titem" @commentMe="commentMe" :obj="clickComment"></item>
				</view>
				<view class="getMore" :class="myPageHelperData.hasNextPage?'cuIcon-loading2':''">{{myPageHelperData.hasNextPage?'加载更多':'--- The end ---'}}</view>
			</scroll-view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import dnIcon from '../dn-icon/dn-icon.vue';
	import uniicon from '../../components/uni-icons/uni-icons.vue'
	import item from './item.vue';
	import refresh from '../refresh/refresh.vue';
	import loadmore from '../uni-load-more/uni-load-more.vue';
	export default {
		name: 'review',
		props: {
			reviewMsg: [Array],
			childData: [Array],
			clickComment: Object,
			myPageHelper:{},
			myPageHelperData:{}
		},
		components: {
			uniicon,
			dnIcon,
			item,
			refresh,
			loadmore
		},
		data() {
			return {
				// 弹出列表详情动画
				animationData: '',
				// 弹出列表详情开关
				crControl: false,
				// 获取节点高度
				setHeight: '',
				// 上拉加载
				more: 'more',
			}
		},
		onLoad() {

		},
		onReachBottom() {
			var currentNum = this.myPageHelper.pageNum+1
			var hasNextPage = this.myPageHelper.hasNextPage
			if(hasNextPage){
				this.getMore(currentNum,5)
			}else{return}
			
		},
		mounted() {
			this.animation = uni.createAnimation();
			const query = uni.createSelectorQuery().in(this);
			query.select('#id').boundingClientRect(data => {
				// console.log("得到布局位置信息" + JSON.stringify(data));
				this.setHeight = data.height;
			}).exec();
		},
		methods: {
			getMore(currentNum,size){
				console.log(currentNum,size)
				// this.$emit('newPage',{currentNum,size})
			},
			commentMe(obj){
				this.$emit('comment',obj)

			},
			childReview(item, key) {
				this.crControl = true;
				this.animation.translateY(this.setHeight).step();
				this.animationData = this.animation.export();
				this.$nextTick(function(){

					this.animation.translateY(0).step({ duration: 150 });
					this.animationData = this.animation.export();
				})
				this.$emit('childReview', item);
			},
			closeCr() {
				this.crControl = false;
				this.$emit("hasClose",true)
			},
			// 刷新touch监听
			refreshStart(e) {
				this.$refs.refresh.refreshStart(e);
			},
			refreshMove(e) {
				this.$refs.refresh.refreshMove(e);
			},
			refreshEnd(e) {
				this.$refs.refresh.refreshEnd(e);
			},
			isRefresh() {
				let that = this;
				setTimeout(() => {
					uni.showToast({
						icon: 'none',
						title: '刷新成功'
					})
					this.$refs.refresh.endAfter() //刷新结束
				}, 1000)
			},
			loadMore() {
				this.more = "loading";
				setTimeout(() => {
					this.more = "noMore";
				}, 1000);
			}
		}
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
	}

	.content {
		width: 100%;
		height: 100%;
	}

	.cenHost-Content {
		position: relative;
		width: 100%;
	}

	.cr-title {
		width: 100%;
		height: 50px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 0 15px 0 15px;
		border-bottom: 1px solid #e8e8e8;
		box-sizing: border-box;
		background-color: #FFFFFF;
	}

	.childReview {
		position: absolute;
		margin: auto;
		width: 100%;
		height: 100%;
		background-color: #F9F9F9;
		display: flex;
		flex-direction: column;
	}

	.textSendMsg {
		font-size: 14px;
	}
	.getMore{
		text-align: center;
		color: #C8C8C8;
		background-color: #FFFEFF;
	}
	.myDetail{
		padding-bottom: 102upx;
	}
</style>
