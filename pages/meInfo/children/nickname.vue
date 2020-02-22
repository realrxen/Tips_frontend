<template>
	<view class="page page-fill">
		
		<form @submit="formSubmitNickname">
			
			<view class="page-block" style="margin-top: 20upx;">
				<input 
					type="text"
					name="nickname"
					:value="globalUser.nickname" 
					class="input"
					placeholder="请输入昵称"
					placeholder-class="graywords"
					maxlength="32"
					/>
			</view>
			
			<button type="primary" form-type="submit" class="submitBtn">提交</button>
			
		</form>
		
	</view>
</template>

<script>
	import common from "../../common/common.js"
	var serverUrl = common.serverUrl
	export default {
		data() {
			return {
				globalUser: {}
			};
		},
		onLoad() {
			this.globalUser = this.getGlobalUser("globalUser");
			
		},
		methods: {
			formSubmitNickname(e) {
				var nickname = e.detail.value.nickname;
				
				uni.request({
					url: serverUrl + "/users/modifyUserInfo",
					data: {
						"userId": this.globalUser.userId,
						"faceIcon":this.globalUser.faceIcon,
						"city":this.globalUser.city,
						"country":this.globalUser.country,
						"gender":this.globalUser.gender,
						"language":this.globalUser.language,
						"nickname": nickname,
						"province": this.globalUser.province,
						"skey": this.globalUser.skey,
						"sessionKey": this.globalUser.sessionKey,
						"birthday":this.globalUser.birthday
					},
					// header: {
					// 	"headerUserId": me.globalUser.id,
					// 	"headerUserToken": me.globalUser.userUniqueToken
					// },
					method: "POST",
					success(res) {
						var resData = res.data;
						// console.log(typeof(resData));
						if (resData.code == 0) {
							// 获得最新的用户数据
							var userInfo = resData.data;
							uni.setStorageSync("globalUser", userInfo);
							uni.navigateBack({
								delta: 1
							})
						} else if (resData.status == 502 || resData.status == 500) {
							uni.showToast({
								title: res.data.msg,
								image: "../../static/icos/error1.jpg",
								duration: 2000
							})
						}
					}
				})
			}
		}
	}
</script>

<style>
/* 页面铺满屏幕 */
.page-fill {
	width:100%;
	height: 100%;
	position: absolute;
}

.graywords {
	color: #EAEAEA;
}

.input {
	height: 80upx;
	line-height: 80upx;
	width: 500upx;
	margin-left: 40upx;
}

.submitBtn {
	width: 95%;
	margin-top: 40upx;
}
</style>
