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
		<SearchItem :coverData="coverData"></SearchItem>
<!--		<view class="movie-list page-block">-->
<!--			<view class="movie-wrapper" v-for="post in articleList">-->
<!--				<image :src="post.coverPicture"-->
<!--					   :data-articleId="post.articleId"-->
<!--					   @click="showArticle"-->
<!--					   class="poster"></image>-->
<!--			</view>-->
<!--		</view>-->
		<PopUp :show="show"></PopUp>
		<Tabbar @pop="pop"></Tabbar>
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
				keywords:"",
				coverData:[]
			}
		},
		onLoad() {},
		onShow() {
			// setTimeout(() => {
			this.show = false;
			// }, 500);
		},
		onHide() {
			this.show = false;
		},
		methods: {
			search(data){
				this.keywords=data
				console.log(this.keywords)
				uni.request({
					url:serverUrl+'/posts/search?keywords='+this.keywords,
					method:'POST',
					success: (res) => {
						if(res.data.code===0){
							this.coverData=res.data.data
						}
					}
				})
			},
			pop(data){
				this.show = data;
			}

		}
	}
</script>

<style>
	@import url("search.css");
</style>
