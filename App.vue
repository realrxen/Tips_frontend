<script>
	export default {
		onLaunch: function() {
			// uni.getSystemInfo({
			// 	success: function(e) {
			// 		// #ifndef MP
			// 		Vue.prototype.StatusBar = e.statusBarHeight;
			// 		if (e.platform == 'android') {
			// 			Vue.prototype.CustomBar = e.statusBarHeight + 50;
			// 		} else {
			// 			Vue.prototype.CustomBar = e.statusBarHeight + 45;
			// 		};
			// 		// #endif
			// 		// #ifdef MP-WEIXIN
			// 		Vue.prototype.StatusBar = e.statusBarHeight;
			// 		let custom = wx.getMenuButtonBoundingClientRect();
			// 		Vue.prototype.Custom = custom;
			// 		Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
			// 		// #endif
			// 		// #ifdef MP-ALIPAY
			// 		Vue.prototype.StatusBar = e.statusBarHeight;
			// 		Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
			// 		// #endif
			// 	}
			// })
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
    @import url("./common/animate.css");
    @import url("./common/uni.css");
    @import url("./common/common.css");
    @import url("./common/free.css");
	@import url("./components/colorui/main.css");
	@import url("./components/colorui/icon.css");
	@import "/static/iconfont/iconfont.css";
    .page{
        width: 100%;
        height: 100%;
        background-color: #F1F1F1;
        /* position: absolute; */
    }

    .page-block{
        background-color: #FFFFFF;
    }

    .line-wrapper{
        padding: 0upx 20upx;
    }

    .line{
        height: 1px;
        background-color: #DBDBDA;
    }
</style>
