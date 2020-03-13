<template>
	<view class="page page-fill">
		<SearchBar @search="search"></SearchBar>
		<!-- <view class="search-block">
			<view class="search-icon-wrapper">
				<image src="../../static/icos/search.png" class="search-icon"></image>
			</view>
			<input
					type="text"
					value=""
					placeholder="游记/攻略/地点" maxlength="10"
					class="search-text" focus confirm-type="search"
					@confirm="searchMe"/>
		</view> -->
		<view class="mySearch">
			<SearchItem :coverData="myPageHelper.list"></SearchItem>
		</view>
<!--		<view class="movie-list page-block">-->
<!--			<view class="movie-wrapper" v-for="post in articleList">-->
<!--				<image :src="post.coverPicture"-->
<!--					   :data-articleId="post.articleId"-->
<!--					   @click="showArticle"-->
<!--					   class="poster"></image>-->
<!--			</view>-->
<!--		</view>-->
		<PopUp :show="show"></PopUp>
		<Tabbar @pop="pop" :tIndex="2"></Tabbar>
	</view>
</template>

<script>
	import SearchBar from "../../components/colorui/components/searchbar.vue"
	import SearchItem from "./components/SearchItem.vue";
	import Tabbar from "../../components/colorui/components/bar";
	import PopUp from "../../components/popup/popup";
	import common from "../../common/common.js"
	var serverUrl = common.serverUrl
	export default {
		components:{
		SearchItem,
		SearchBar,
		Tabbar,
		PopUp,
		},
		data() {
			return {
				show:false,
				keywords:" ",
				coverData:[],
				selectedIndex:2,
				myPageHelper:{},
				none:true
			}
		},
		onShareAppMessage: (res) => {
			return {
				title:'Hi,Tips!',
				path:'/pages/search/search'
			}
		},
		onPullDownRefresh(){
			uni.request({
				url:serverUrl+'/articles/search?currentNum=1',
				method:'GET',
				success: (res) => {
					if(res.data.code===0){
						uni.stopPullDownRefresh()
						this.myPageHelper=res.data.data
					}
				}
			})
		},
		onReachBottom() {
			var keywords = this.keywords
			var currentPage = this.myPageHelper.pageNum+1
			var hasNextPage = this.myPageHelper.hasNextPage
			if(hasNextPage){
				if(this.none){
					this.getMoreHomeArticles(currentPage,7)
				}else{
					this.getMoreSearchArticles(keywords,currentPage,7)
				}
			}else{
				return
			}
		},
		onLoad() {},
		onShow() {
			// setTimeout(() => {
			this.show = false;
			// }, 500);
			uni.request({
				url:serverUrl+'/articles/search?currentNum=1',
				method:'GET',
				success: (res) => {
					if(res.data.code===0){
						this.myPageHelper=res.data.data
					}
				}
			})
		},
		onHide() {
			this.show = false;
		},
		methods: {
			getMoreHomeArticles(currentNum,size){
				uni.request({
					header:{
						"Authorization":this.token,
						"type":this.type
					},
					url:serverUrl+'/articles/search?currentNum='+currentNum+'&size='+size,
					method: 'GET',
					success: (res) => {
						if(res.data.code==0){
							var myData = res.data.data
							var oldList = this.myPageHelper.list
							var newList =oldList.concat(myData.list)
							myData.list=newList
							this.myPageHelper = myData
						}
			
					},
					fail: () => {},
					complete: () => {}
				});
			},
			getMoreSearchArticles(keywords,currentNum,size){
				uni.request({
					header:{
						"Authorization":this.token,
						"type":this.type
					},
					url:serverUrl+'/articles/search?keywords='+keywords+'&currentNum='+currentNum+'&size='+size,
					method: 'GET',
					success: (res) => {
						if(res.data.code==0){
							var myData = res.data.data
							var oldList = this.myPageHelper.list
							var newList =oldList.concat(myData.list)
							myData.list=newList
							this.myPageHelper = myData
						}
			
					},
					fail: () => {},
					complete: () => {}
				});
			},
			search(data){
					if(data.length!==0){
						this.none = false
					}
					console.log(this.none)
					if(this.none){
						uni.request({
						url:serverUrl+'/articles/search?currentNum=1',
						method:'GET',
						success: (res) => {
							if(res.data.code===0){
								this.myPageHelper=res.data.data
							}
						}
					})
					return
				}else{
					var keywords = data
					this.keywords = data
					uni.request({
						url:serverUrl+'/articles/search?keywords='+keywords+'&currentNum=1',
						method:'GET',
						success: (res) => {
							if(res.data.code===0){
								this.myPageHelper=res.data.data
							}
						}
					})
				}
					
					
				
				
			},
			pop(data){
				this.show = data;
			}

		}
	}
</script>

<style>
	@import url("search.css");
	.mySearch{
		padding-bottom: 100rpx;
	}
</style>
