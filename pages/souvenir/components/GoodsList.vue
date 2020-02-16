<template>
	<view>

		<!-- 商品列表 -->
		<view class="goods-list">
			<view class="product-list">
				<view class="product" @tap="handleGoods(goods)" v-for="goods in goodsList" :key="goods.goods_id">
					<image mode="widthFix" :src="goods.img"></image>
					<view class="name">{{goods.name}}</view>
					<view class="info">
						<view class="price">
							<text>￥</text>
							{{goods.price}}
						</view>
						<view class="slogan">{{goods.slogan}} <text>人喜欢</text></view>
					</view>
				</view>
			</view>
			<view class="loading-text">{{loadingText}}</view>
		</view>
	</view>
</template>

<script>
	import common from '../../../common/common.js';
		var serverUrl = common.serverUrl;
	export default {
		data() {
			return {
					   
				// 商品列表大数组
				goodsList:[
					
				],
				filterby: "all", // 默认选择的tab
				page: 1,
				size: 6,
				loadingText: "正在加载....",
			}
		},
		methods: {
			handleGoods(goods){
				// 页面跳转 商品详情
				uni.navigateTo({
					url:'./SouvenirDetail?goodsInfo='+JSON.stringify(goods)
				})
			},
			// handleSelect(index) {
			// 	this.filterByList[index].selected = true;

			// 	// 其他的selected false
			// 	for (let i = 0; i < this.filterByList.length; i++) {
			// 		if (i != index) {
			// 			this.filterByList[i].selected = false;
			// 		}
			// 	}
				
			// 	// 数据请求
			// 	this.filterby = this.filterByList[index].filterby;
			// 	this.page = 1;
			// 	this.loadingText = "加载中...";
			// 	this.goodsList = [];
			// 	this.loadData();
			// },
			loadData() {
				uni.request({
					url:serverUrl+'/souvenirs/',
					method:'GET',
					success: (res) => {
						if(res.data.code===0){
							this.goodsList=res.data.data
						}
					}
				})
			}
		},
		onLoad() {
			this.loadData();
		},
		created() {
			this.loadData();
		}

		// 上啦加载

	}
</script>

<style lang="scss">
	.header {
		width: 92%;
		padding: 0 4%;
		height: 79upx;
		display: flex;
		justify-content: space-around;
		align-items: flex-end;
		position: fixed;
		z-index: 10;
		background-color: #fff;
		border-bottom: solid 1upx #eee;

		.target {
			width: 20%;
			height: 60upx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 28upx;
			margin-bottom: -2upx;
			color: #aaa;

			&.on {
				color: #555;
				border-bottom: 4upx solid #f06c7a;
				font-weight: 600;
				font-size: 30upx;
			}

			.icon {
				font-size: 26upx;
			}
		}
	}

	.place {
		background-color: #ffffff;
		height: 100upx;
	}

	.goods-list {
		.loading-text {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 60upx;
			color: #979797;
			font-size: 24upx;
		}

		.product-list {
			width: 100%;
			padding: 20rpx;
			column-count: 2;
			column-gap: 1em;

			.product {
				break-inside: avoid;
				border-radius: 20upx;
				background-color: #fff;
				margin: 0 0 15upx 0;
				box-shadow: 0upx 5upx 25upx rgba(0, 0, 0, 0.1);

				image {
					width: 100%;
					border-radius: 20upx 20upx 0 0;
				}

				.name {
					width: 92%;
					padding: 6upx 4%;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					text-align: justify;
					overflow: hidden;
					font-size: 30upx;
				}

				.info {
					display: flex;
					justify-content: space-between;
					align-items: flex-end;
					width: 92%;
					padding: 10upx 4% 10upx 4%;

					.price {
						color: #e65339;
						font-size: 30upx;
						font-weight: 600;
					}

					.slogan {
						color: #807c87;
						font-size: 24upx;
					}
				}
			}

		}
	}
</style>
