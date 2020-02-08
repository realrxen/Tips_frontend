import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
Vue.prototype.getGlobalUser=function(key){
	var userInfo = uni.getStorageSync("globalUser")
	if(userInfo!=null&&userInfo!=""&&userInfo!=undefined){
		return userInfo
	}
	return null
}
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
