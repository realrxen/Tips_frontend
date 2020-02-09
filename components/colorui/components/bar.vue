<template>
	<view>
		<view class="cu-bar tabbar myTabbar">
			<view class="action text-main" :class="index===selectedIndex?'text-main':'text-gray'" :index="1">
				<!-- <navigator url="../post/post"> -->
					<view class="cuIcon-homefill" @click="skip21"></view> 首页
				<!-- </navigator> -->
			</view>
			<view class="action" :class="index===selectedIndex?'text-main':'text-gray'" :index="2">
				<!-- <navigator url="../search/search"> -->
				<view class="cuIcon-similar" @click="skip22"></view> 游记
				<!-- </navigator> -->
			</view>
			<view class="action text-gray add-action">
				<!-- <navigator url="../travels/travels"> -->
					<view class="cu-btn cuIcon-add shadow bg-main btn" @click="skip23"></view>
				<!-- </navigator> -->
				发布
			</view>
			<view class="action" :class="index===selectedIndex?'text-main':'text-gray'" :index="4">
				<!-- <navigator url="../userspace/UserSpace"> -->
					<view class="cuIcon-notification" @click="skip24">
						<view class="cu-tag badge">99</view>
					</view>
				<!-- </navigator> -->
				动态
			</view>
			<view class="action" :class="index===selectedIndex?'text-main':'text-gray'" :index="5">
				<!-- <navigator url="../me/me"> -->
				<view  @click="skip25">
					<view class="cuIcon-my">
					<view class="cu-tag badge"></view>
				</view>
				</view>
				<!-- </navigator> -->
				我的
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				InputBottom: 0,
				selectedIndex:1,
			};
		},
		methods: {
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			},
			// 跳转设置start
			skip21(){
				this.selectedIndex=1
				uni.redirectTo({
				    url: '../post/post'
				});
			},
			skip22(){
				this.selectedIndex=2
				uni.redirectTo({
				    url: '../search/search'
				});
			},
			skip23(){
				this.selectedIndex=3
				uni.redirectTo({
				    url: '../travels/travels'
				});
			},
			skip24(){
				this.selectedIndex=4
				uni.redirectTo({
				    url: '../userspace/UserSpace'
				});
			},
			skip25(){
				this.selectedIndex=5
				uni.redirectTo({
				    url: '../me/me'
				});
			}
			// 跳转设置end

		}

	}
</script>

<style>
	.box {
		margin: 20upx 0;
	}

	.box view.cu-bar {
		margin-top: 20upx;
	}
	.myTabbar{
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 999;
		margin-top: 100upx;
		background-color: #FFFEFF;
	}
	.myMiddleBtn{
		background-color: #FFD655;
	}
	.btn{
		border-radius: 100%;
	}
</style>

