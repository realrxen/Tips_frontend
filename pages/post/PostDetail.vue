<template>
	<view>
		<view class="page page-fill User-Post">
		<view class="article">
			<!-- 头像昵称 -->
			<view class="userWrapper" >
				<view class="userInfoWrapper">
					<image :src="post.faceIcon" class="faceIcon" lazy-load @click="openSpace"></image>
					<view class="userDetailWrapper">
						<view class="userName">{{post.username}}</view>
						<view class="createTime">{{post.createTime}}</view>
					</view>
				</view>
				<view class="follow animated" hover-class="rotateOutDownRight" @tap="follow"
				v-if="!isFollow">+关注</view>
			</view>
			<view>
				<!--标题-->
				<view class="title" >{{post.content}}</view>
				<!--图片-->
<!--				<view class="imageWrapper">-->
<!--					<image :src="imgurl" v-for="(imgurl,index) in post.imgUrls" :key="index" class="coverPicture" v-if="post.imgUrls"-->
<!--					@click="goToPostDetail"></image>-->

<!--				</view>-->
				<view class="bg-white padding">
					<view class="grid col-3 grid-square">
							<image :src="imgurl" v-for="(imgurl,index) in post.imgUrls" :key="index" class="coverPicture" v-if="post.imgUrls"-->
					</view>
				</view>
			</view>
			<view class="myTagsWrapper" >
				<view class="bg-main myTag" v-for="(tag,index) in post.tags" :key="tag.tagId">
					<view class="tagContent">#{{tag.name}}</view>
				</view>
			</view>

			<!--图标按钮-->
			<view class="operationIconsWrapper">
				<!-- 点赞 -->
				<view class="myIcon cuIcon-like animated faster" hover-class="rubberBand font-color-change"
				@click="love('like')"
				:class="post.love.type==='like' ? 'font-color-change2':''"
				>
						<text class="iconfont icon-call-yellow icon"></text>
						<text class="iconText">{{post.love.likeCount>0?post.love.likeCount:'喜欢'}}</text>
				</view>
				<!-- 点踩 -->
				<view class="myIcon cuIcon-selection animated faster" hover-class="rubberBand font-color-change"
				@click="love('hate')"
				:class="post.love.type==='hate' ? 'font-color-change2':''"
				>
						<text class="iconfont icon-cai icon"></text>
						<text class="iconText">{{post.love.hateCount>0?post.love.hateCount:'不喜欢'}}</text>
				</view>
				<!-- 评论 -->
				<view class="myIcon animated cuIcon-comment faster" hover-class="rubberBand font-color-change" >
						<text class="iconfont icon-shanzi icon"></text>
						<text class="iconText">{{post.commentCount>0?post.commentCount:'评论'}}</text>
				</view>
				<!-- 收藏 -->
				<view class="myIcon animated cuIcon-forward faster" hover-class="rubberBand font-color-change">
						<text class="iconfont icon-dahongdenglong icon"></text>
						<text class="iconText">{{post.collectCount}}</text>
				</view>
			</view>
		</view>
	</view>
		<CutBar :text="cutBarText" :commentCount="commentCount"></CutBar>
		<view class="content myComment">
			<review :reviewMsg="reviewMsg" :childData="childData" :clickComment="clickComment"
			@childReview="childReview" @comment="commentForChildren"></review>
		</view>
<!--		<ChatBar></ChatBar>-->
		<view class="box chatBar">
			<view class="cu-bar input">
				<view class="action">
					<view class="cuIcon-roundadd" :class="this.commentPic.length!==0?'text-red':'text-grey'" @click="ChooseImage">
					</view>
				</view>
				<input @focus="InputFocus" @blur="InputBlur"
					   type="text" confirm-type="send"
					   :value="content"
					   @confirm="sendComment"
					   @input="contentInput"
					   :placeholder="placeHolder"
					   placeholder-class="placeholder-c"
					   :adjust-position="true" class="solid-bottom"
					   :focus="isFocus" maxlength="1000" cursor-spacing="10"></input>
				<view class="action">
					<text class="cuIcon-emoji text-grey"></text>
				</view>
				<button class="cu-btn bg-main shadow-blur animated" hover-class="jello" @click="sendComment">发送</button>
			</view>
		</view>
		<HMmessages ref="HMmessages" @complete="HMmessages = $refs.HMmessages" @clickMessage="clickMessage"></HMmessages>

	</view>
</template>


<script>
	import common from "../../common/common.js"
	import CutBar from "../../components/colorui/components/cutbar";
	import review from "../../components/dl-review/review";
	import ChatBar from "../../components/colorui/components/chatbar";
	import HMmessages from "../../components/HM-messages/HMmessages";
	// import ChatBar from "../../components/user-chat/user-chat-bottom";
	var serverUrl = common.serverUrl;
	export default{
		name:"PostDetail",
		props:{

		},
		components:{
			CutBar,
			review,
			ChatBar,
			HMmessages
		},
		data() {
				return {
				postId:"",
				isFollow:false,
				cutBarText:"最新评论",
				commentCount: 0,
				// 列表详情数据
				childData: [],
				// 评论列表
				reviewMsg: [],
				userId:"",
				userInfo:{},
				token:'',
				type:'',
				post:{},
				clickComment:{},
				comments:[],
				InputBottom: 0,
				placeHolder:"理一下ta好不好",
				content:'',
				commentPic:[],
				parentId:"",
				isFocus:false,
				commentObj:{}
				}

			},
			onLoad(paramsObj) {
				var userInfo = uni.getStorageSync("globalUser")
				if(userInfo!=null&&userInfo!=""&&userInfo!=undefined){
					this.userInfo=userInfo;
					this.token="Bearer "+this.userInfo.token;
					this.type=this.userInfo.tokenType
					this.userId=this.userInfo.userId
				}else{
					this.isFollow=false
				}
				
				var postStr = paramsObj.postStr
				var post=JSON.parse(postStr)
				this.post = post
				this.postId=post.postId
				this.isFollow=post.isFollow
				this.commentCount=post.commentCount
				// uni.request({
				// 	url:serverUrl+'/posts/'+this.postId,
				// 	method:'GET',
				// 	header:{
				// 		"Authorization":this.token,
				// 		"type":this.type
				// 	},
				// 	success: (res) => {
				// 		if(res.data.code===0){
				// 			var post =res.data.data
				// 			this.post= post
				// 			this.commentCount=post.commentCount
				// 			uni.request({
				// 				header:{
				// 					"Authorization":this.token,
				// 					"type":this.type
				// 				},
				// 				url:serverUrl+'/follows/'+post.userId+'?userId='+this.userId,
				// 				method:'GET',
				// 				success: (res) => {
				// 					if(res.data.code===0){
				// 						this.isFollow=res.data.data

				// 					}
				// 					if(this.post.userId===this.userId&&this.userId!==""){
				// 						this.isFollow=true
				// 					}

				// 				},
				// 				fail: () => {

				// 				},
				// 				complete: () => {

				// 				}
				// 			});
				// 		}
				// 	},
				// 	fail: () => {

				// 	},
				// 	complete: () => {

				// 	}
				// });

				uni.request({
					url:serverUrl+'/comments/'+this.postId,
					method:'GET',
					header:{
						"Authorization":this.token,
						"type":this.type
					},
					success: res => {
						if(res.data.code===0){
							this.comments=res.data.data
						}
					},
					fail: () => {

					},
					complete: () => {

					}
				});
				uni.request({
					url:serverUrl+'/comments/?apiRootId='+this.postId,
					method:'GET',
					success: (res) => {
						if(res.data.code===0){
							this.reviewMsg=res.data.data.reviewMsg
						}
					}
				})


			},
		methods:{
			sendComment(){
				var content = this.content
				if (content===""&&this.commentPic.length!==1){
					this.warning("不能说悄悄话哦")
					return
				}
				var comment=this.commentObj
				if(comment.cenId!==null&&comment.cenId!==undefined){
					var parentId=comment.cenId
					var apiRootId=comment.apiRootId
					if(comment.parentId==="0"){
						apiRootId=comment.cenId
					}
				}else{
					var apiRootId = this.post.postId
					var parentId = "0"
				}
				uni.request({
					header:{
						"Authorization":this.token,
						"type":this.type
					},
					url:serverUrl+'/comments/',
					method:'POST',
					data:{
						"userId":this.userId,
						"content":content,
						"type":3,
						"parentId":parentId,
						"apiRootId":apiRootId
					},
					success: (res) => {
						if(res.data.code===0){
							var commentId = res.data.data
							if (this.commentPic.length===1){
								uni.uploadFile({
									header:{
										"Authorization":this.token,
										"type":this.type
									},
									url:serverUrl+'/oss/3?parentId='+commentId,
									filePath:this.commentPic[0],
									name:"file",
									method:'POST',
									success: (re) => {
										var da = JSON.parse(re.data)
										if (da.code === 0) {
											this.commentPic=this.commentPic.splice(0,1)
											this.content="";
											this.placeHolder="理一下ta好不好"
											uni.request({
												header:{
													"Authorization":this.token,
													"type":this.type
												},
												url:serverUrl+"/comments/?apiRootId="+this.postId,
												method:'GET',
												success: (r) => {
													if(r.data.code===0){
														this.reviewMsg=r.data.data.reviewMsg
													}
												}
											});

											uni.request({
												header:{
													"Authorization":this.token,
													"type":this.type
												},
												url:serverUrl+"/comments/"+apiRootId,
												method:'GET',
												success: (r) => {
													if(r.data.code===0){
														this.childData=r.data.data
													}
												}
											})
										}
									},
									fail:(e)=>{
									console.log(e)
								}
								})
							}
							this.content=""
							this.placeHolder="理一下ta好不好"
							uni.request({
								header:{
									"Authorization":this.token,
									"type":this.type
								},
								url:serverUrl+"/comments/?apiRootId="+this.postId,
								method:'GET',
								success: (res) => {
									if(res.data.code===0){
										console.log(res.data.data.reviewMsg)
										this.reviewMsg=res.data.data.reviewMsg
									}
								}
							});
							uni.request({
								header:{
									"Authorization":this.token,
									"type":this.type
								},
								url:serverUrl+"/comments/"+apiRootId,
								method:'GET',
								success: (res) => {
									if(res.data.code===0){
										this.childData=res.data.data
									}
								}
							})
						}else if(res.data.code===30002){
							uni.showToast({
								title:'亲，要登陆哟',
								duration:2000
							})
						}
					}

				});

			},
			contentInput(e){
				var value= e.detail.value
				this.content=value
			},
			
			commentForChildren(data){
				this.placeHolder='@'+data.userName
				this.isFocus=!this.isFocus
				this.commentObj=data
			},
			childReview(data) {
				this.clickComment=data
				uni.request({
					url:serverUrl+"/comments/"+data.cenId,
					method:'GET',
					success: (res) => {
						if(res.data.code===0){
							this.childData=res.data.data
						}
					}
				})
			},
			follow(){
				var idolId=this.post.userId
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
							this.isFollow=true
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
			love(type){
				this.$emit("love",{
					type,
					index:this.index
					})
			},
			goToPostDetail(){
				uni.navigateTo({
					url:"./PostDetail"
				})

			},
			// follow(index){
			// 	// 点击后触发一个事件给父组件
			// 	this.$emit('follow',this.post.userId)
			// },
			openSpace(){
				uni.navigateTo({
					url:"../userCenter/userCenter"
				})
			},
			warning(msg) {
				this.HMmessages.show(msg, {iconColor: '#ffffff', fontColor: '#ffffff', background: "#ffd655"})
			},
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			},
			ChooseImage() {
			    uni.chooseImage({
			        count: 1,
			        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			        sourceType: ['album'], //从相册选择
			        success: (res) => {
			            var imgUrl=res.tempFilePaths[0]
							var array = [];
							array[0]=imgUrl
							this.commentPic=array
			        }
			    });

			}



		}

	}

</script>

<style>
	@import url("./PostDetail.css");
	.box {
		margin: 20upx 0 0 0;
	}

	.box view.cu-bar {
		margin-top: 40upx;
	}

	.myComment{
		padding-bottom: 83upx;
	}

	.chatBar{
		width: 100%;
		bottom: 0;
		font-size: 40upx;
		line-height: 100upx;
		position: fixed;
		z-index: 999;
		border-radius: 20rpx;
	}

/* 	.cu-tag1.badge1 {
		border-radius: 200upx;
		top: -10upx;
		right: -10upx;
		font-size: 20upx;
		padding: 0upx 10upx;
		height: 28upx;
		color: #ffffff;
	} */







</style>
