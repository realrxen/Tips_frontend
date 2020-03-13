<template>
	<view>
		<ArticleHeader :article="article"></ArticleHeader>
		<view class="content" v-html="content">
			{{content}}
		</view>
		<ArticleBottom></ArticleBottom>
	</view>
</template>

<script>
	import ArticleHeader from "./components/ArticleHeader";
	import ArticleBottom from "./components/ArticleBottom";
	import common from "../../common/common.js"
	var serverUrl = common.serverUrl
	export default {
		components:{
			ArticleHeader,
			ArticleBottom,
		},
		data() {
			return {
				userInfo:{},
				token:'',
				type:'',
				article:{},
				content:""
			}
		},
		onShareAppMessage: (res) => {
			return {
				title:'Hi,Tips!',
				path:'/pages/article/article'
			}
		},
		onShow(){
			var userInfo = uni.getStorageSync("globalUser")
			if(userInfo!==null&&userInfo!==""&&userInfo!==undefined){
				this.userInfo=userInfo
				this.token="Bearer "+this.userInfo.token
				this.type=this.userInfo.tokenType
			}
			uni.request({
				header:{
					"Authorization":this.token,
					"type":this.type
				},
				url:serverUrl+'/articles/'+this.articleId,
				method: 'GET',
				success: (res) => {
					if(res.data.code===0){
						this.article=res.data.data
						// console.log(this.article)
						this.content = res.data.data.htmlContent
					}
					if(res.data.code===30001){
						uni.showToast({
							title:'😙要重新登录',
							duration:2500
						})
						uni.removeStorageSync("globalUser")
					}
				},
				complete() {
					uni.hideLoading();
					uni.stopPullDownRefresh();
			
				}
			
			})
		},
		onLoad(paramsObj) {
			var articleId = paramsObj.mediaId
			this.articleId = articleId 
		},
		methods: {

		}
	}
</script>

<style>
	.content{
		margin-top: 130rpx;
		padding-bottom: 102rpx;
	}
</style>
