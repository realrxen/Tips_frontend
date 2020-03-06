<template>
	<view>
		<view class="cu-bar search-bar search bg-white">
				<!-- <view class="cu-avatar round" style="background-image:url(http://img4.imgtn.bdimg.com/it/u=3006607636,42691152&fm=11&gp=0.jpg)"></view> -->
				<view class="cu-avatar round" :style="face?'background-image:url('+userInfo.faceIcon+')':'background-image:url(http://img4.imgtn.bdimg.com/it/u=3006607636,42691152&fm=11&gp=0.jpg)'"></view>
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input focus :adjust-position="false" type="text" placeholder="游记/攻略/地点" confirm-type="search" value=""
						   @confirm="searchMe">
				</view>
				<view class="action">
					<text>北京</text>
					<text class="cuIcon-triangledownfill"></text>
				</view>
		</view>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				userInfo:{}
			}
		},
		created() {
			var userInfo = uni.getStorageSync("globalUser")
			if(userInfo!==null&&userInfo!==""&&userInfo!==undefined){
				this.userInfo=userInfo
			}
		},
		methods: {
			searchMe(e){
				var value= e.detail.value
				this.$emit('search',value)
			},
		},
		computed:{
					face: function () {
						var userInfo = uni.getStorageSync("globalUser")
						if(userInfo!==null&&userInfo!==""&&userInfo!==undefined){
							return true
						}
						return false
			    }
		},
		
		
	}
</script>

<style>
	.search-bar{
		position: fixed;
		top: 0;
		z-index: 2000;
		width: 100%;
	}
</style>
