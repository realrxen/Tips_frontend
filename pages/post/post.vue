<template>
	<view class="page-fill page">
		<Nav :tabsArray="tabsArray" @tabChanged="tabChanged"></Nav>
		<block v-for="(item,dataIndex) in dataList" :key="dataIndex">
			<template v-if="tabIndex===item.id">
				<block v-for="(post,index) in item.posts" :key=index>
					<UserPost :post='post' :index='index'
							  @follow='follow' @love='love'></UserPost>
					<Divider></Divider>
				</block>
			</template>
		</block>


		<PopUp :show="show"></PopUp>
		<Tabbar @pop="pop"></Tabbar>
	</view>
</template>

<script>
	import common from "../../common/common.js"
	var serverUrl = common.serverUrl
	import Nav from "../../components/colorui/components/nav.vue"
	import Tabbar from "../../components/colorui/components/bar.vue"
	import UserPost from "./components/UserPost";
	import Card from "../../components/colorui/components/card.vue"
	import PopUp from "../../components/popup/popup";
	export default {
		components:{
			Nav,
			UserPost,
			Card,
			Tabbar,
			PopUp
		},
		data() {

			return {
				dataList2:[
						{	id:0,
							posts:[
							{
								username:"Seeumt",
								faceIcon:'http://seeumt.oss-cn-hangzhou.aliyuncs.com/870c6addbb7b48988799af07b0a6d5c2.png',
								createTime:'2000-10-07',
								isFollow:false,
								title:'Love',
								imgUrls:["http://seeumt.oss-cn-hangzhou.aliyuncs.com/5ebfed05dbd340a69cd288d75628986a.jpg",
								"https://seeumt.oss-cn-hangzhou.aliyuncs.com/7749ba06df674a9d8336dc55d7b487f9.jpg",
								"http://seeumt.oss-cn-hangzhou.aliyuncs.com/5ebfed05dbd340a69cd288d75628986a.jpg"],
								love:{
									type:'like',
									likeCount:6000,
									hateCount:0
								},
								commentCount:8222000,
								collectCount:5000,
							},
							{
								username:'Tips',
								faceIcon:'http://seeumt.oss-cn-hangzhou.aliyuncs.com/870c6addbb7b48988799af07b0a6d5c2.png',
								createTime:'2010-10-07',
								isFollow:false,
								title:'Love',
								imgUrls:"",
								love:{
									type:'like',
									likeCount:8000,
									hateCount:100
								},
								commentCount:0,
								collectCount:7000,
							},
							{
								username:'Test1',
								faceIcon:'http://seeumt.oss-cn-hangzhou.aliyuncs.com/870c6addbb7b48988799af07b0a6d5c2.png',
								createTime:'2010-10-07',
								isFollow:false,
								title:'Love',
								imgUrls:["http://seeumt.oss-cn-hangzhou.aliyuncs.com/5ebfed05dbd340a69cd288d75628986a.jpg"],
								love:{
									type:'hate',
									likeCount:0,
									hateCount:1
								},
								commentCount:8622000,
								collectCount:7000,
							},
							{
								username:'Test2',
								faceIcon:'http://seeumt.oss-cn-hangzhou.aliyuncs.com/870c6addbb7b48988799af07b0a6d5c2.png',
								createTime:'2010-10-07',
								isFollow:false,
								title:'Love',
								imgUrls:["http://seeumt.oss-cn-hangzhou.aliyuncs.com/5ebfed05dbd340a69cd288d75628986a.jpg"],
								love:{
									type:'',
									likeCount:8000,
									hateCount:10
								},
								commentCount:8622000,
								collectCount:7000,
							}
						]},
					    {	id:1,
					    	posts:[
							{
								username:"Tips",
								faceIcon:'http://seeumt.oss-cn-hangzhou.aliyuncs.com/870c6addbb7b48988799af07b0a6d5c2.png',
								createTime:'2000-10-07',
								isFollow:false,
								title:'Love',
								imgUrls:["https://seeumt.oss-cn-hangzhou.aliyuncs.com/7749ba06df674a9d8336dc55d7b487f9.jpg",
								"https://seeumt.oss-cn-hangzhou.aliyuncs.com/7749ba06df674a9d8336dc55d7b487f9.jpg",
								"https://seeumt.oss-cn-hangzhou.aliyuncs.com/7749ba06df674a9d8336dc55d7b487f9.jpg"],
								love:{
									type:'like',
									likeCount:6000,
									hateCount:0
								},
								commentCount:8222000,
								collectCount:5000,
							},
							{
								username:'Tips',
								faceIcon:'http://seeumt.oss-cn-hangzhou.aliyuncs.com/870c6addbb7b48988799af07b0a6d5c2.png',
								createTime:'2010-10-07',
								isFollow:true,
								title:'Love',
								imgUrls:"",
								love:{
									type:'like',
									likeCount:8000,
									hateCount:100
								},
								commentCount:0,
								collectCount:7000,
							},
							{
								username:'Test1',
								faceIcon:'http://seeumt.oss-cn-hangzhou.aliyuncs.com/870c6addbb7b48988799af07b0a6d5c2.png',
								createTime:'2010-10-07',
								isFollow:true,
								title:'Love',
								imgUrls:["https://seeumt.oss-cn-hangzhou.aliyuncs.com/7749ba06df674a9d8336dc55d7b487f9.jpg",
								"https://seeumt.oss-cn-hangzhou.aliyuncs.com/7749ba06df674a9d8336dc55d7b487f9.jpg",
								"https://seeumt.oss-cn-hangzhou.aliyuncs.com/7749ba06df674a9d8336dc55d7b487f9.jpg",
								"https://seeumt.oss-cn-hangzhou.aliyuncs.com/7749ba06df674a9d8336dc55d7b487f9.jpg",
								"https://seeumt.oss-cn-hangzhou.aliyuncs.com/7749ba06df674a9d8336dc55d7b487f9.jpg"],
								love:{
									type:'hate',
									likeCount:0,
									hateCount:1
								},
								commentCount:8622000,
								collectCount:7000,
							},
							{
								username:'Test2',
								faceIcon:'http://seeumt.oss-cn-hangzhou.aliyuncs.com/870c6addbb7b48988799af07b0a6d5c2.png',
								createTime:'2010-10-07',
								isFollow:false,
								title:'Love',
								imgUrls:["https://seeumt.oss-cn-hangzhou.aliyuncs.com/7749ba06df674a9d8336dc55d7b487f9.jpg"],
								love:{
									type:'',
									likeCount:8000,
									hateCount:10
								},
								commentCount:8622000,
								collectCount:7000,
							}
						]}
				],
				tabsArray:["关注","热门"],
				dataList:[],
				show: false,
				tabIndex:1,
				userId:"",
				userInfo:{},
				token:'',
				type:'',
				sortType:'createTime',
			}
		},
		onPullDownRefresh() {
			uni.request({
				url:serverUrl+'/posts/?userId='+this.userId,
				header:{
					"Authorization":this.token,
					"type":this.type
				},
				method: 'GET',
				success: (res) => {
					if(res.data.code===0){
						var dataList =res.data.data
						console.log(dataList)
						this.dataList=dataList
					}
				},
				complete() {
					uni.hideLoading()
					uni.stopPullDownRefresh();
					// uni.hideNavigationBarLoading()

				}
			})
		},
		onLoad() {
			var userInfo = uni.getStorageSync("globalUser")
			if(userInfo!=null&&userInfo!=""&&userInfo!=undefined){
				this.userInfo=userInfo
				this.token="Bearer "+this.userInfo.token
				this.type=this.userInfo.tokenType
				this.userId=this.userInfo.userId
			}

				},
		onShow() {
			this.show = false;
			var userInfo = uni.getStorageSync("globalUser")
			if(userInfo!=null&&userInfo!=""&&userInfo!=undefined){
				this.userInfo=userInfo
				this.token="Bearer "+this.userInfo.token
				this.type=this.userInfo.tokenType
				this.userId=this.userInfo.userId
			}
			uni.request({
				header:{
					"Authorization":this.token,
					"type":this.type
				},
				url:serverUrl+'/posts/?userId='+this.userId,
				method: 'GET',
				success: (res) => {
					if(res.data.code===0){
						console.log(res.data.data)
						var dataList = res.data.data
						this.sort()
						this.dataList=dataList
					}
				},
				complete() {
					uni.hideLoading()
					uni.stopPullDownRefresh();
					// uni.hideNavigationBarLoading()

				}

			})
			// }, 500);
		},
		onHide() {
			this.show = false;
		},
		methods: {
			// 点击关注

			follow(e){
				var idolId=e;
				// if(this.tabIndex===1&&this.userId!==""){
				// 	this.dataList[1].posts.forEach((item)=> {
				// 		if (item.userId === idolId) {
				// 			item.isFollow=true
				// 			this.dataList[0].posts=this.dataList[0].posts.concat(item)
				// 		}
				// 	})
				// }
				uni.request({
					header:{
						"Authorization":this.token,
						"type":this.type
					},
					url:serverUrl+'/follows/',
					method: 'POST',
					data:{
						"userId":this.userId,
						"idolId":idolId
					},
					success: (res) => {
						if(res.data.code===123){
							uni.showToast({title:res.data.msg,duration:1500})
							var dataList = this.dataList
							if(this.tabIndex===1){
								this.dataList[this.tabIndex].posts.forEach(function(item) {
									if (item.userId === idolId) {
										item.isFollow=true
										dataList[0].posts=dataList[0].posts.concat(item)
									}
								})
							}
						}else if (res.data.code === 30003) {
							uni.showToast({title:res.data.msg,duration:1500})
						}else if (res.data.code === 30002) {
							uni.showToast({title:res.data.msg,duration:1500})
						}else if (res.data.code === 147) {
							uni.showToast({title:res.data.msg,duration:1500})
						}
					},
					complete() {
						// uni.hideNavigationBarLoading()

					}
				})

			},
			tabChanged(data){
				this.tabIndex=data
			},
			pop(data){
				this.show = data;
			},
			sort(){                     // 排序
				// this.dataList[0].posts.sort(this.compare(this.sortType));
				// this.dataList[1].posts.sort(this.compare(this.sortType));
				// 调用下面 compare 方法 并传值
			},
			compare(attr){                  // 排序方法
				return function(a,b){
					let val1 = a[attr];
					let val2 = b[attr];

						if(this.sortType === 'createTime'){            // 如果是时间就转换成时间格式
							return new Date(val2.replace(/-/,'/')) - new Date(val1.replace(/-/,'/'));
						}else{
							return val2 - val1;
						}

				}
			}
		}

	}
</script>

<style>

</style>
