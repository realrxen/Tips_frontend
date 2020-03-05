<template>
	<view class="page page-fill">
		<view class="header">
			<view v-if="userIsLogin">
				<image :src="userInfo.faceIcon" class="face"></image>
			</view>
			<view v-else>
				<image src="http://img4.imgtn.bdimg.com/it/u=3006607636,42691152&fm=11&gp=0.jpg" class="face"></image>
			</view>
			<view class="info-wrapper" v-if="userIsLogin">
				<view class="nickname">
					用户名：{{userInfo.username}}
				</view>
				<view class="nav-info">
					昵称：{{userInfo.nickname}}
				</view>
			</view>
			<view class="info-wrapper" v-else>
				<navigator url="../registLogin/registLogin">
					<view class="nickname regist-login">
						注册/登录
					</view>
				</navigator>
			</view>

			<view class="set-wrapper" v-if="userIsLogin">
				<navigator url="../meInfo/meInfo">
					<image src="../../static/icos/settings.png" class="settings"></image>
				</navigator>
			</view>

		</view>
		<view>
			<UniListItem @click="toSpace" title="我的空间" showExtraIcon>
				<text slot="icon" class="iconfont icon-bingtanghulu"></text>
			</UniListItem>
			<UniListItem title="浏览历史" showExtraIcon>
				<text slot="icon" class="iconfont icon-dongtai10"></text>
			</UniListItem>
			<UniListItem title="社区认证" showExtraIcon>
				<text slot="icon" class="iconfont icon-dongtai11"></text>
			</UniListItem>
			<UniListItem @click="online" title="在线人数" showExtraIcon>
				<text slot="icon" class="iconfont icon-bingtanghulu"></text>
			</UniListItem>
			<navigator url="../souvenir/souvenir">
				<UniListItem @click="skip" title="积分兑换" showExtraIcon>
					<text slot="icon" class="iconfont icon-bingtanghulu"></text>
				</UniListItem>
			</navigator>
		</view>
		<PopUp :show="show"></PopUp>
		<Tabbar @pop="pop" :selectedIndex="selectedIndex"></Tabbar>

	</view>
</template>

<script>
	import UniListItem from '../../components/uni-ui/uni-list-item/uni-list-item.vue'
	import common from "../../common/common.js"
	var serverUrl =common.serverUrl
	export default {
		components:{
			UniListItem
		},
		data() {
			return {
				userIsLogin:false,
				userInfo:{},
				show:false,
				selectedIndex:5
			}
		},
		methods: {
			pop(data){
				this.show = data;
			},
			online(){
				uni.request({
					url:serverUrl+'/users/online',
					method:'GET',
					success: (res) => {
						if(res.data.code===0){
							uni.showToast({
								title:'在线人数:'+res.data.data,
								duration:2000,
								image:"../../static/icos/xixi.png"
							})
						}
					}
				})
			}

		},
		onShow() {
			this.show=false
			// var me = this
			// var userInfo = uni.getStorageSync("globalUser")
			// if(userInfo!=null&&userInfo!=""&&userInfo!=undefined){
				var userInfo = this.getGlobalUser("globalUser")
			if(userInfo!=null){
				this.userIsLogin = true
				this.userInfo=userInfo
			}else{
				this.userIsLogin = false
			}
		},
		onHide(){
			this.show=false
		}
	}
</script>

<style>
	@import url("me.css");
</style>
