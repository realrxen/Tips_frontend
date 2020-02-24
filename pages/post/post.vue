<template>
	<view class="page-fill page">
		<Nav :tabsArray="tabsArray" @tabChanged="tabChanged"></Nav>
		<view class="myPost">
			<block v-for="(item,dataIndex) in dataList" :key="dataIndex">
				<template v-if="tabIndex===item.id">
					<block v-for="(post,index) in item.posts" :key=index>
						<UserPost :post='post' :index='index' :currentUserId='userId'
								  @follow='follow' @love='love' @deletePost='deletePost'></UserPost>
						<Divider></Divider>
					</block>
				</template>
			</block>
		</view>

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
						this.dataList=dataList
					}else if(res.data.code===30001){
						uni.showToast({
							title:'😙要重新登录',
							duration:2000
						})
					}
				},
				complete() {
					uni.hideLoading()
					uni.stopPullDownRefresh();
				}
			})
		},
		onLoad() {
			var userInfo = uni.getStorageSync("globalUser")
			if(userInfo!==null&&userInfo!==""&&userInfo!==undefined){
				this.userInfo=userInfo
				this.token="Bearer "+this.userInfo.token
				this.type=this.userInfo.tokenType
				this.userId=this.userInfo.userId
			}

				},
		onShow() {
			this.show = false;
			var userInfo = uni.getStorageSync("globalUser")
			if(userInfo!==null&&userInfo!==""&&userInfo!==undefined){
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
						var dataList = res.data.data;
						this.sort()
						this.dataList=dataList
					}
					if(res.data.code===30001){
						uni.showToast({
							title:'😙要重新登录',
							duration:2500
						})
						uni.removeStorageSync("globalUser")
					}
				},
				complete() {
					uni.hideLoading();
					uni.stopPullDownRefresh();

				}

			})
		},
		onHide() {
			this.show = false;
		},
		methods: {

			deletePost(data){
				var postId= data
				uni.showModal({
				    title: 'Hola',
				    content: '亲，真的要删除这条动态吗？',
				    cancelText: '留下它',
				    confirmText: '狠心删除',
				    success: resp => {
				        if (resp.confirm) {
							uni.request({
								header:{
									"Authorization":this.token,
									"type":this.type
								},
								url:serverUrl+'/posts/'+postId,
								method:'DELETE',
								success: (res) => {
									if(res.data.code===10007){
										uni.showToast({title:res.data.msg,duration:1500})
										if(this.tabIndex===1){
											var currentDataList = this.dataList[this.tabIndex].posts
											currentDataList.forEach(function(item,index) {
												if (item.postId === postId) {
													currentDataList.splice(index, 1)
												}
											})
											var otherDataList = this.dataList[this.tabIndex-1].posts
											otherDataList.forEach(function(item,index) {
												if (item.postId === postId) {
													otherDataList.splice(index, 1)
												}
											})
										}if(this.tabIndex===0){
											var currentDataList = this.dataList[this.tabIndex].posts
											currentDataList.forEach(function(item,index) {
												if (item.postId === postId) {
													currentDataList.splice(index, 1)
												}
											})
											var otherDataList = this.dataList[this.tabIndex+1].posts
											otherDataList.forEach(function(item,index) {
												if (item.postId === postId) {
													otherDataList.splice(index, 1)
												}
											})
										}
									}
								}
							})
				        }
				    }
				})


			},

			// 点击关注
			follow(e){
				var idolId=e;
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
			//点赞start
			likeHateUpDown(posts,e){
				let post = posts[e.index]
				if(post.love.type===""){
					uni.request({
						header:{
							"Authorization":this.token,
							"type":this.type
						},
						url:serverUrl+'/loves/3?apiRootId='+post.postId+'&userId='+this.userId,
						method:'POST',
						success: (res) => {
							if(res.data.code===0){
								posts[e.index].love[e.type+'Count']+=1
								posts[e.index].love.type=e.type
							}else if(res.data.code===30002){
								uni.showToast({
									title:res.data.msg,
									duration:2000
								})
							}
						},
						fail: () => {

						},
						complete: () => {

						}
					});

					return
				}else if(post.love.type===e.type){
					uni.request({
						header:{
							"Authorization":this.token,
							"type":this.type
						},
						url:serverUrl+'/loves/3?apiRootId='+post.postId+'&userId='+this.userId,
						method:'POST',
						success: (res) => {
							if(res.data.code===0){
								posts[e.index].love[post.love.type+'Count']--
								posts[e.index].love.type=""
							}
						},
						fail: () => {

						},
						complete: () => {

						}
					});
				}else if(post.love.type!==e.type){
					uni.request({
						header:{
							"Authorization":this.token,
							"type":this.type
						},
						url:serverUrl+'/loves/?apiRootId='+post.postId+'&userId='+this.userId,
						method:'PUT',
						success: (res) => {
							if(res.data.code===0){
								posts[e.index].love[post.love.type+'Count']--
								posts[e.index].love.type=e.type
								posts[e.index].love[e.type+'Count']+=1
							}
						},
						fail: () => {

						},
						complete: () => {

						}
					});
				}
			}
			,
			love(e){
				var posts=this.dataList[this.tabIndex].posts
				this.likeHateUpDown(posts,e)
			},
			//点赞end
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
	.myPost{
		padding-bottom: 100rpx;
	}
</style>
