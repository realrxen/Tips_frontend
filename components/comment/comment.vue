<!--<template>-->
<!--	<view class="content">-->
<!--		<review :reviewMsg="reviewMsg" @childReview="childReview" :childData="childData"></review>-->
<!--	</view>-->
<!--</template>-->

<!--<script>-->
<!--	import review from '../../components/dl-review/review.vue';-->
<!--	export default {-->
<!--		components: {-->
<!--			review-->
<!--		},-->
<!--		data() {-->
<!--			return {-->

<!--				// 列表详情数据-->
<!--				childData: [],-->
<!--				// 评论列表-->
<!--				reviewMsg: []-->
<!--		},-->

<!--		onLoad(){-->
<!--			uni.request({-->
<!--				url:"http://192.168.1.7:8082/comments/?apiRootId=a",-->
<!--				method:'GET',-->
<!--				success: (res) => {-->
<!--					if(res.data.code===0){-->
<!--						console.log(res.data.data)-->
<!--						this.reviewMsg=res.data.data.reviewMsg-->
<!--					}-->
<!--				}-->
<!--			})-->
<!--		},-->
<!--		methods: {-->
<!--			childReview(data) {-->
<!--				console.log(data.cenId)-->
<!--				uni.request({-->
<!--					url:"http://192.168.1.7:8082/comments/"+data.cenId,-->
<!--					method:'GET',-->
<!--					success: (res) => {-->
<!--						if(res.data.code===0){-->
<!--							console.log(res.data.data)-->
<!--							this.childData=res.data.data-->
<!--						}-->
<!--					}-->
<!--				})-->
<!--			}-->


<!--		}-->
<!--	}-->

<!--</script>-->

<!--<style>-->
<!--	.content {-->
<!--		width: 100%;-->
<!--		height: 100%;-->
<!--	}-->

<!--	.logo {-->
<!--		height: 200rpx;-->
<!--		width: 200rpx;-->
<!--		margin-top: 200rpx;-->
<!--		margin-left: auto;-->
<!--		margin-right: auto;-->
<!--		margin-bottom: 50rpx;-->
<!--	}-->

<!--	.text-area {-->
<!--		display: flex;-->
<!--		justify-content: center;-->
<!--	}-->

<!--	.title {-->
<!--		font-size: 36rpx;-->
<!--		color: #8f8f94;-->
<!--	}-->
<!--</style>-->
