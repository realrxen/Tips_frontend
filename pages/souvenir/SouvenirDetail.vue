<template>
	<view>
		<!-- 状态栏 -->
		<page-status></page-status>
		<!-- header -->
		<goodsHeader />

		<!-- 轮播图 -->
		<view class="swiper-box">
			<swiper @change="swiperChange" circular="true" autoplay="true">
				<swiper-item v-for="swiper in goodsData.swiperList" :key="swiper.carouselId">
					<image :src="swiper.imgUrl"></image>
				</swiper-item>
			</swiper>
			<view class="indicator">
				{{currentSwiper + 1}}/{{goodsData.swiperList.length}}
			</view>
		</view>
		<!-- 标题和价格 -->
		<view class="info-box goods-info">
			<view class="price">￥{{goodsInfo.price}}</view>
			<view class="title">{{goodsInfo.name}}</view>
		</view>
		<view class="rating">
			<view class="rating-text">心动指数</view>
			<view>
				<Star :fontSize="starSize" @change="getRating" :value="stars"></Star>
			</view>
	    </view>
		<!-- 选择规格 -->
		<!-- <view class="info-box">
			<view class="row" @tap="spaceInfo.showSpace = true">
				<view class="text">选择</view>
				<view class="content">
					<view>选择规格:</view>
					<view class="sp">
						<view :class="{'on':item == goodsInfo.spec}" v-for="(item,index) in goodsData.spec" :key="index">
							{{item}}
						</view>
					</view>
				</view>
				<view class="arrow">
					<view class="icon iconfont">&#xe6a3;</view>
				</view>
			</view>
		</view> -->

		<!-- 模态框 -->
		<popupSpec @add="add" @sub="sub" @setSelectSpec="setSelectSpec" @hideSpec="hideSpec" :goodsInfo="goodsInfo" :goodsData="goodsData" :spaceInfo="spaceInfo" />

		<!-- 评价 -->
		<!-- <view class="info-box comments">
			<view class="row">
				<view class="text">商品评价({{goodsData.comment.length}})</view>
				<view class="arrow" @tap="handleRatings">
					<view class="show">
						查看全部
						<view class="icon iconfont">&#xe6a3;</view>
					</view>
				</view>
			</view>
			<view class="comment" @tap="handleRatings">
				<view class="user-info">
					<view class="face">
						<image :src="goodsData.comment[0].face"></image>
					</view>
					<view class="username">{{goodsData.comment[0].username}}</view>
				</view>
				<view class="content">
					{{goodsData.comment[0].content}}
				</view>
			</view>
		</view> -->

		<!-- 商品详情 -->
		<!-- <view class="description">
			<view class="title">———— 商品详情 ————</view>
			<view class="content">
				<rich-text :nodes="goodsData.descriptionStr"></rich-text>
			</view>
		</view> -->
		<!-- 底部菜单 -->
		<view class="footer">
			<view class="icons">
<!-- 				<view class="box">
					<view class="icon iconfont">&#xe7e0;</view>
					<view class="text">分享</view>
				</view> -->
				<view class="box" @tap="keep">
					<view class="icon iconfont" style="color: #FFD655;" v-if="isKeep">&#xe64b;</view>
					<view class="icon iconfont" v-else>&#xe64c;</view>
					<view :class="isKeep?'text-c1':'text'">{{isKeep?"已":''}}收藏</view>
				</view>
			</view>
			<view class="btn">
				<view @tap="joinCart2" class="joinCart">加入购物车</view>
				<view @tap="handleBuy" class="buy">立即购买</view>
			</view>
		</view>
	</view>

</template>

<script>
	import goodsHeader from './components/GoodsHeader.vue'
	import popupSpec from '../../common/popupSpec.vue'
	import Star from "../../components/sx-rate/index";
	import common from '../../common/common.js'
	var serverUrl = common.serverUrl
	export default {
		components: {
			goodsHeader,
			popupSpec,
			Star
		},
		data() {
				return {
					isKeep: false, // 收藏
					starSize:'20px',
					stars:0,
					goodsData: {
						"swiperList": []
					},
					goodsInfo: {
							goods_id:"",
							name: "",
							price: "",
							number: 1,
							spec: ""
							},
					currentSwiper: 0, // 轮播图下标
					userId:"",
					userInfo:{},
					token:'',
					type:'',
			}
			},
		onShow(){
			var userInfo = uni.getStorageSync("globalUser")
			if(userInfo!=null&&userInfo!=""&&userInfo!=undefined){
				this.userInfo=userInfo
				this.token="Bearer "+this.userInfo.token
				this.type=this.userInfo.tokenType
				this.userId=this.userInfo.userId
			}
		},
		onLoad(option) {
			var userInfo = uni.getStorageSync("globalUser")
			if(userInfo!=null&&userInfo!=""&&userInfo!=undefined){
				this.userInfo=userInfo
				this.token="Bearer "+this.userInfo.token
				this.type=this.userInfo.tokenType
				this.userId=this.userInfo.userId
			}
			this.goodsInfo = JSON.parse(option.goodsInfo);
			// 请求详情·
			// this.initData();
			uni.request({
				header:{
					"Authorization":this.token,
					"type":this.type
				},
				url:serverUrl+'/carousels/'+this.goodsInfo.goods_id,
				method:'GET',
				success: (res) => {
					if(res.data.code===0){
						this.goodsData.swiperList=res.data.data
					}else if (res.data.code === 30003) {
							uni.showToast({title:res.data.msg,duration:1500})
						}else if (res.data.code === 30002) {
							uni.showToast({title:res.data.msg,duration:1500})
						}
				}
			})


			uni.request({
				header:{
					"Authorization":this.token,
					"type":this.type
				},
				url:serverUrl+'/collects/'+this.goodsInfo.goods_id+'?userId='+this.userId,
				method:'GET',
				success: (res) => {
					if(res.data.code===0){
						this.isKeep=res.data.data
					}else if (res.data.code === 30003) {
							uni.showToast({title:res.data.msg,duration:1500})
						}else if (res.data.code === 30002) {
							uni.showToast({title:res.data.msg,duration:1500})
						}
				}
			})
			
			uni.request({
				header:{
					"Authorization":this.token,
					"type":this.type
				},
				url:serverUrl+'/ratings/'+this.goodsInfo.goods_id+'?userId='+this.userId,
				method:'GET',
				success: (res) => {
					if(res.data.code===0){
						this.stars=res.data.data
					}else if (res.data.code === 30003) {
							uni.showToast({title:res.data.msg,duration:1500})
						}else if (res.data.code === 30002) {
							uni.showToast({title:res.data.msg,duration:1500})
						}
				}
			})
		},
		methods: {
			getRating(data) {
				var rating = data 
				uni.request({
					header:{
						"Authorization":this.token,
						"type":this.type
					},
					url:serverUrl+'/ratings/'+this.goodsInfo.goods_id+'?userId='+this.userId+'&rating='+rating,
					method:'POST',
					success: (res) => {
						if(res.data.code===0){
							this.stars=res.data.data
							uni.showToast({
								title:res.data.msg,
								duration:1500
							})
						}else if (res.data.code === 30003) {
							uni.showToast({title:res.data.msg,duration:1500})
						}else if (res.data.code === 30002) {
							uni.showToast({title:res.data.msg,duration:1500})
						}
					}
				})
			},
			setSelectSpec(item){
				// 选择规格
				this.goodsInfo.spec = item;
			},
			hideSpec(){
				this.spaceInfo.showSpace = false;
			},
			add(){
				this.goodsInfo.number++;
			},
			sub(){
				if(this.goodsInfo.number <= 1){
					return;
				}
				this.goodsInfo.number--;
			},

			//请求详情
			// initData() {
			// 	this.request({
			// 		url: interfaces.getGoods,
			// 		success: ((res) => {
			// 			this.goodsData = res.data;
			// 			// console.log(this.goodsData);
			// 		})
			// 	})
			// },
			swiperChange(event) {
				// console.log(event.detail.current);
				this.currentSwiper = event.detail.current;
			},
			handleRatings() {
				// 本地存储
				uni.setStorageSync('comments', this.goodsData.comment)
				// 页面跳转
				uni.navigateTo({
					url: "./ratings"
				})
			},
			keep(){
				uni.request({
					header:{
						"Authorization":this.token,
						"type":this.type
					},
					url:serverUrl+'/collects/?userId='+this.userId+'&apiRootId='+this.goodsInfo.goods_id,
					method:'POST',
					success: (res) => {
						if(res.data.code===0){
							this.isKeep=!this.isKeep
							uni.showToast({
								title:res.data.data,
								duration:1500
							})
						}else if (res.data.code === 30003) {
							uni.showToast({title:res.data.msg,duration:1500})
						}else if (res.data.code === 30002) {
							uni.showToast({title:res.data.msg,duration:1500})
						}
					}
				})
			},
			joinCart(){

				// 存储到本地存储里
				// 1.先去本地存储中取
				uni.getStorage({
					key:"goodsList",
					success:(res => {
						// 拿数据
						let goodsList = res.data;
						// 查找商品是否存在
						let isExist = false;

						goodsList.forEach((goods,index) => {
							if(goods.goods_id === this.goodsInfo.goods_id){
								// 如果存在 修改商品商量
								debugger
								var count = this.goodsInfo.number+goods.number;
								goods.number=count
								console.log(goods.number)
								isExist = true;
							}
						})

						if(!isExist){
							goodsList.push(this.goodsInfo);
							// 更新本地存储
							this.setGoodsList(goodsList);
						}


					}),
					fail: (err => { // 没有得到数据,那么就存
						// console.log("加入失败")
						let goodsList = [];
						goodsList.push(this.goodsInfo);

						// 往本地存储中存储数据
						this.setGoodsList(goodsList);
					})
				})
			},
			setGoodsList(goodsList){
				// console.log("存储到本地存储中")
				// 存储到本地存储中
				uni.setStorage({
					key:"goodsList",
					data: goodsList,
					success:function(){
						uni.showToast({
							icon:"success",
							title:"添加购物车成功"
						})
					}
				})
			},
			joinCart2(){
				uni.request({
					header:{
						"Authorization":this.token,
						"type":this.type
					},
					url:serverUrl+'/carts/'+this.goodsInfo.goods_id+'?userId='+this.userId+'&count='+1,
					method:'POST',
					success: (res) => {
						if(res.data.code===0){
							uni.showToast({
								title:"添加购物车成功",
								duration:1500
							})
						}else if (res.data.code === 30003) {
							uni.showToast({title:res.data.msg,duration:1500})
						}else if (res.data.code === 30002) {
							uni.showToast({title:res.data.msg,duration:1500})
						}
					}
				})
			},
			handleBuy(){
				let tempList = [];
				tempList.push(this.goodsInfo);
				uni.setStorage({
					key:"confirmList",
					data: tempList,
					success: () => {
						uni.navigateTo({
							url:"../order/confirm"
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	/*  修改状态栏样式 */
	.status {
		/* #ifdef APP-PLUS */
		opacity: 0;
		/* #endif */
	}

	.rating{
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding: 10upx 20upx;
	}
	.rating-text {
		margin-right: 20upx;

	}

	.swiper-box {
		position: relative;
		width: 100%;
		height: 100vw;

		swiper {
			width: 100%;
			height: 100vw;

			swiper-item {
				image {
					width: 100%;
					height: 100vw;
				}
			}
		}

		.indicator {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0 25upx;
			height: 40upx;
			border-radius: 40upx;
			font-size: 22upx;
			position: absolute;
			bottom: 20upx;
			right: 20upx;
			color: #fff;
			background-color: rgba(0, 0, 0, 0.2);
		}
	}

	.info-box {
		width: 100%;
		padding: 20upx 4%;
		background-color: #fff;
		margin-bottom: 10upx;
	}

	.goods-info {
		border-radius: 20rpx;
		.price {
			font-size: 46upx;
			font-weight: 600;
			color: #f47925;
		}

		.title {
			font-size: 30upx;
		}
	}

	.row {
		width: 100%;
		display: flex;
		align-items: center;
		margin: 0 0 30upx 0;

		.text {
			font-size: 28upx;
			color: #a2a2a2;
			margin-right: 20upx;
		}

		.content {
			font-size: 28upx;
			display: flex;
			flex-wrap: wrap;

			.serviceitem {
				margin-right: 10upx;
			}

			.sp {
				width: 100%;
				display: flex;

				view {
					background-color: #f6f6f6;
					padding: 10upx;
					color: #999;
					margin-right: 10upx;
					font-size: 20upx;
					border-radius: 5upx;

					&.on {
						border: solid 1upx #f47952;
						padding: 4upx 8upx;
					}
				}
			}
		}

		.arrow {
			position: absolute;
			right: 4%;

			.icon {
				color: #ccc;
			}
		}
	}

	.comments {
		.row {
			width: 100%;
			height: 40upx;
			display: flex;
			align-items: center;
			margin: 0 0 30upx 0;

			.text {
				font-size: 30upx;
			}

			.arrow {
				font-size: 28upx;
				position: absolute;
				right: 4%;
				color: #17e6a1;

				.show {
					display: flex;
					align-items: center;

					.icon {
						color: #17e6a1;
					}
				}
			}
		}

		.comment {
			width: 100%;

			.user-info {
				width: 100%;
				height: 40upx;
				display: flex;
				align-items: center;

				.face {
					width: 40upx;
					height: 40upx;
					margin-right: 8upx;

					image {
						width: 40upx;
						height: 40upx;
						border-radius: 100%;
					}
				}

				.username {
					font-size: 24upx;
					color: #999;
				}
			}

			.content {
				margin-top: 10upx;
				font-size: 26upx;
			}
		}
	}

	.description {
		.title {
			width: 100%;
			height: 80upx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 26upx;
			color: #999;
		}
	}

	.footer {
		position: fixed;
		bottom: 0upx;
		width: 100%;
		padding: 0 4%;
		height: 99upx;
		border-top: solid 1upx #eee;
		background-color: #fff;
		z-index: 2;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.icons {
			height: 80upx;

			.box {
				width: 160upx;
				height: 80upx;
				display: flex;
				justify-content: flex-start;
				align-items: center;

				.icon {
					font-size: 40upx;
					color: #828282;
				}

				.text {
					font-size: 30upx;
					color: #666;
					margin-left: 10upx;
				}
				.text-c1{
					font-weight: bold;
					color: #FFD655;
				}

			}
		}

		.btn {
			height: 80upx;
			border-radius: 40upx;
			overflow: hidden;
			display: flex;
			margin-right: -2%;

			.joinCart,
			.buy {
				height: 80upx;
				padding: 0 40upx;
				color: #fff;
				display: flex;
				align-items: center;
				font-size: 28upx;
			}

			.joinCart {
				background-color: #f0b46c;
			}

			.buy {
				background-color: #f06c7a;
			}
		}
	}
</style>
