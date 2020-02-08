<template>
	<view class="page page-fill">
		<view class="search-block">
			<view class="search-icon-wrapper">
				<image src="../../static/icos/search.png" class="search-icon"></image>
			</view>
			<input
					type="text"
					value=""
					placeholder="游记/攻略/地点" maxlength="10"
					class="search-text" focus confirm-type="search"
					@confirm="searchMe"/>
		</view>
		<SearchItem></SearchItem>
<!--		<view class="movie-list page-block">-->
<!--			<view class="movie-wrapper" v-for="article in articleList">-->
<!--				<image :src="article.coverPicture"-->
<!--					   :data-articleId="article.articleId"-->
<!--					   @click="showArticle"-->
<!--					   class="poster"></image>-->
<!--			</view>-->
<!--		</view>-->

	</view>
</template>

<script>
	import SearchItem from "./components/SearchItem.vue";
	export default {
		components:{
		SearchItem
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
