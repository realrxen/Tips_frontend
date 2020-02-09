import Vue from 'vue'
import App from './App'
import Divider from './components/Divider/Divider.vue'
Vue.component("Divider",Divider)
import cuCustom from './components/colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)
import Tabbar from './components/colorui/components/bar.vue'
Vue.component('Tabbar',Tabbar)
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
