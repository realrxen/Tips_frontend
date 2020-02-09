<template>
	<view class="page page-fill">
		<SearchBar></SearchBar>
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
		<SearchItem></SearchItem>
<!--		<view class="movie-list page-block">-->
<!--			<view class="movie-wrapper" v-for="post in articleList">-->
<!--				<image :src="post.coverPicture"-->
<!--					   :data-articleId="post.articleId"-->
<!--					   @click="showArticle"-->
<!--					   class="poster"></image>-->
<!--			</view>-->
<!--		</view>-->
		<Tabbar></Tabbar>
	</view>
</template>

<script>
	import SearchBar from "../../components/colorui/components/searchbar.vue"
	import SearchItem from "./components/SearchItem.vue";
	export default {
		components:{
		SearchItem,
		SearchBar
		},
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style>
	@import url("search.css");
</style>
