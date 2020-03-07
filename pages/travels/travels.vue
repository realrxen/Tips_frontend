<template>
	<view class="page page-fill">
			<view class="cu-form-group">
				<view class="title">标题</view>
				<input placeholder="有标题会有更多人赞~~" name="input" v-model="title"></input>
				<text class='cuIcon-title text-orange'></text>
			</view>
			<view class="travels">
				<view class="myRichText">
					<!--
					  更多api，请前往：https://developers.weixin.qq.com/miniprogram/dev/api/media/editor/EditorContext.html
					  字体图标，微信小程序官方的确没有给出名称
					-->
					<view class="toolbar" @touchend.stop="format" :style="'bottom: ' + (isIOS ? keyboardHeight : 0) + 'px'">

						<i class="iconfont icon-charutupian" @touchend.stop="insertImage"></i>
						<i :class="'iconfont icon-format-header-1 ' + (formats.header === 1 ? 'ql-active' : '')" data-name="header"
						   :data-value="1"></i>
						<i :class="'iconfont icon-format-header-2 ' + (formats.header === 2 ? 'ql-active' : '')" data-name="header"
						   :data-value="2"></i>
						<i :class="'iconfont icon-format-header-3 ' + (formats.header === 3 ? 'ql-active' : '')" data-name="header"
						   :data-value="3"></i>
						<i :class="'iconfont icon-format-header-4 ' + (formats.header === 4 ? 'ql-active' : '')" data-name="header"
						   :data-value="4"></i>
						<i :class="'iconfont icon-format-header-5 ' + (formats.header === 5 ? 'ql-active' : '')" data-name="header"
						   :data-value="5"></i>
						<i :class="'iconfont icon-format-header-6 ' + (formats.header === 6 ? 'ql-active' : '')" data-name="header"
						   :data-value="6"></i>
						<i :class="'iconfont icon-zitijiacu ' + (formats.bold ? 'ql-active' : '')" data-name="bold"></i>
						<i :class="'iconfont icon-zitishanchuxian ' + (formats.strike ? 'ql-active' : '')" data-name="strike"></i>
						<i :class="'iconfont icon-zitixieti ' + (formats.italic ? 'ql-active' : '')" data-name="italic"></i>
						<i :class="'iconfont icon-zuoduiqi ' + (formats.align === 'left' ? 'ql-active' : '')" data-name="align" data-value="left"></i>
						<i :class="'iconfont icon-juzhongduiqi ' + (formats.align === 'center' ? 'ql-active' : '')" data-name="align"
						   data-value="center"></i>
						<i :class="'iconfont icon-youduiqi ' + (formats.align === 'right' ? 'ql-active' : '')" data-name="align" data-value="right"></i>
						<i :class="'iconfont icon-zuoyouduiqi ' + (formats.align === 'justify' ? 'ql-active' : '')" data-name="align"
						   data-value="justify"></i>
						<i :class="'iconfont icon-line-height ' + (formats.lineHeight ? 'ql-active' : '')" data-name="lineHeight" data-value="2"></i>
						<i :class="'iconfont icon-Character-Spacing ' + (formats.letterSpacing ? 'ql-active' : '')" data-name="letterSpacing"
						   data-value="2em"></i>
						<i :class="'iconfont icon-722bianjiqi_duanqianju ' + (formats.marginTop ? 'ql-active' : '')" data-name="marginTop"
						   data-value="20px"></i>
						<i :class="'iconfont icon-723bianjiqi_duanhouju ' + (formats.micon-previewarginBottom ? 'ql-active' : '')" data-name="marginBottom"
						   data-value="20px"></i>
						<i class="iconfont icon-clearedformat" @tap="removeFormat"></i>
						<i :class="'iconfont icon-font ' + (formats.fontFamily ? 'ql-active' : '')" data-name="fontFamily" data-value="Pacifico"></i>
						<i :class="'iconfont icon-fontsize ' + (formats.fontSize === '24px' ? 'ql-active' : '')" data-name="fontSize"
						   data-value="24px"></i>
						<i :class="'iconfont icon-text_color ' + (formats.color === fontColor ? 'ql-active' : '')" data-name="color"
						   :data-value="fontColor" @tap="open"></i>
						<i :class="'iconfont icon-fontbgcolor ' + (formats.backgroundColor === '#ffd655' ? 'ql-active' : '')" data-name="backgroundColor"
						   data-value="#ffd655"></i>
						<!-- 引用黄河浪的color取色器 -->
						<i class="iconfont icon-date" @tap="insertDate"></i>
						<i class="iconfont icon-undo" @tap="undo"></i>
						<i class="iconfont icon-redo" @tap="redo"></i>
						<i :class="'iconfont icon-zitixiahuaxian ' + (formats.underline ? 'ql-active' : '')" data-name="underline"></i>
						<i class="iconfont icon--checklist" data-name="list" data-value="check"></i>
						<i :class="'iconfont icon-youxupailie ' + (formats.list === 'ordered' ? 'ql-active' : '')" data-name="list"
						   data-value="ordered"></i>
						<i :class="'iconfont icon-wuxupailie ' + (formats.list === 'bullet' ? 'ql-active' : '')" data-name="list" data-value="bullet"></i>
						<i class="iconfont icon-outdent" data-name="indent" data-value="-1"></i>
						<i class="iconfont icon-indent" data-name="indent" data-value="+1"></i>
						<i class="iconfont icon-fengexian" @tap="insertDivider"></i>
						<i class="iconfont icon-preview" @tap="store" id="2"></i>
						<i :class="'iconfont icon-zitixiabiao ' + (formats.script === 'sub' ? 'ql-active' : '')" data-name="script"
						   data-value="sub"></i>
						<i :class="'iconfont icon-zitishangbiao ' + (formats.script === 'super' ? 'ql-active' : '')" data-name="script"
						   data-value="super"></i>
						<!-- <i class="iconfont icon-quanping"></i> -->
						<i class="iconfont icon-shanchu" @tap="clear"></i>
						<i :class="'iconfont icon-direction-rtl ' + (formats.direction === 'rtl' ? 'ql-active' : '')" data-name="direction"
						   data-value="rtl"></i>
						<i class="iconfont icon-baocun" @tap="store" id="1"></i>
					</view>
					<view class="container">
						<editor id="editor" :adjust-position="false" show-img-size :read-only="isEdit" show-img-resize show-img-toolbar class="ql-container"
								:placeholder="placeholder" @statuschange="onStatusChange" @ready="onEditorReady">
						</editor>
					</view>
					<t-color-picker ref="colorPicker" :color="color" @confirm="confirm" @cancel="cancel"></t-color-picker>
				</view>

			</view>
		<HMmessages ref="HMmessages" @complete="HMmessages = $refs.HMmessages" @clickMessage="clickMessage"></HMmessages>
		<!--		<UploadImages :isPost="isPost"></UploadImages>-->
		<PopUp :show="show"></PopUp>
<!--		<view class="release" @click="upload">-->
<!--			<UploadImages class="myUpload" :isPost="isPost"></UploadImages>-->
<!--			<view class="myDraft">-->
<!--				<view class="cuIcon-crown"></view>-->
<!--				<view>存草稿</view>-->
<!--			</view>-->
<!--			<view class="release-text">发布</view>-->
<!--		</view>-->
		<view class="operationWrapper">
			<view class="myDraft">
					<view class="cuIcon-crown myDraftIcon"  @tap="store" id="1"></view>
					<view class="myDraftText" @tap="store" id="1">存草稿</view>
			</view>
			<view class="release-text" @click="send">发布</view>
		</view>
	</view>
</template>


<script>
	import common from "../../common/common.js"
	import HMmessages from "../../components/HM-messages/HMmessages.vue"
	import TColorPicker from "../../components/t-color-picker/t-color-picker";
	import UploadImages from "../../components/colorui/components/uploadImages";
	var serverUrl = common.serverUrl
	var keyUtil = common.keyUtil()
	var _self;
	export default {
		components:{
			HMmessages,
			TColorPicker,
			UploadImages
		},
		data() {
			return {
				isPost:false,
				imgUrl:"",
				tempFace: "",
				userInfo:{},
				token:'',
				type:'',
				imgs:[],
				color: {
					r: 255,
					g: 0,
					b: 0,
					a: 0.6
				},
				isEdit: false,
				fontColor: '#000',
				formats: {},
				readOnly: false,
				placeholder: '描述下你的出行心得,帮助更多出行的人...',
				editorHeight: 300,
				keyboardHeight: 0,
				isIOS: false,
				articleId:"",
				title:""
			};
		},
		onLoad() {
			_self = this;
			var draft =uni.getStorageSync('myDraft')
			if(draft!==null&&draft!==""&&draft!==undefined){
				this.articleId = draft.articleId
			}else{
				var articleId = this.key()
				this.articleId = articleId

			}
		},
		onShow(){

			var userInfo = uni.getStorageSync("globalUser")
			if(userInfo!==null&&userInfo!==""&&userInfo!==undefined){
				this.userInfo=userInfo
				this.token="Bearer "+this.userInfo.token
				this.type=this.userInfo.tokenType
			}

		},
		onUnload(){
		},

		methods: {
			onStatusChange(){
				this.editorCtx.getContents({
					success: function(res) {
					}
				});
			},
			key(){
				 function S4() {
				        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
				    }
				    return (S4() + S4() + "" + S4() + "" + S4() + "" + S4() + "" + S4() + S4() + S4());
			},
			upload(){

				// if(this.imgs.length===0){
				// 	this.HMmessages.show("成功",{iconColor:'#ffffff',fontColor:'#ffffff', background:"#ffd655"})
				// }
				var i = 0
				var length = this.imgs.length
				this.upLoadApi(i,length)
			},
			upLoadApi(i,length){
				var userInfo =this.getGlobalUser("globalUser")
				uni.uploadFile({
					url:serverUrl+'/oss/1?parentId='+this.articleId,
					filePath:this.imgs[i],
					name:"file",
					success: (uploadFileRes) => {
						debugger
						var response = JSON.parse(uploadFileRes.data)
						console.log(response.data)
						if(response.code===0){
							i++
							console.log(i)
						if (i < length) {
							// debugger
							this.upLoadApi(i,length);//upLoadApi undefined
						}else{
							return
						}
					}
					},
					complete(){}
					}
			)},

			// 重新选择头像
			changePendingFace(){
				uni.chooseImage({
					count:9,
					sizeType:["compressed"],
					sourceType:["album","camera"],
					success: (res) => {
						//获得临时路径
					// var tempFilePath = res.tempFilePaths[0]
					// console.log(res.tempFilePaths)
					// this.imgUrl=tempFilePath
					// console.log(this.imgUrl)

					this.imgs.push(res.tempFilePaths[0])
					console.log(this.imgs)
					}
				})
			},
			cancel() {
				this.isEdit = false;
			},
			send(){
				var articleId =this.articleId
				var userId = this.userInfo.userId
				var title = this.title
				var token = this.token
				var type = this.type
				if(this.title===""){
					this.warning("标题不能为空哟!")
					return
				}
				this.editorCtx.getContents({
					success: (res)=> {
						var htmlContent = res.html
						if(htmlContent.length<=42){
							this.warning("内容不能为空哟!")
							return
						}
						uni.showLoading({
						    title: '发布中...'
						});
						uni.request({
							header:{
								"Authorization":token,
								"type":type
							},
							url:serverUrl+'/articles/',
							data:{
								"articleId":articleId,
								"title":title,
								"htmlContent":htmlContent,
								"userId":userId,
							},
							method:'POST',
							success: (res) => {
								uni.hideLoading()
								if(res.data.code===0){
									uni.showToast({
										title:res.data.msg,
										duration:1500
									})
									uni.reLaunch({
									    url: "../search/search"
									});
								}
							},

						});
					}
				});
			},
			open() {
				this.$refs.colorPicker.open();
				this.isEdit = true;
				// uni.hideKeyboard();
			},
			hideKey() {
				uni.hideKeyboard();
			},
			async confirm(e) {
				this.isEdit = false;
				this.fontColor = await e.hex;
				this.onStatusChange({
					detail: {
						color: e.hex
					}
				});
				this.$forceUpdate();
			},
			readOnlyChange() {
				this.readOnly = !this.readOnly
			},
			onEditorReady() {
				uni.createSelectorQuery().select('#editor').context(function(res) {
					_self.editorCtx = res.context;
				}).exec();
			},
			undo() {
				this.editorCtx.undo();
			},

			redo() {
				this.editorCtx.redo();
			},

			blur() {
				this.editorCtx.blur();
			},

			format(e) {
				// this.hideKey();
				let {
					name,
					value
				} = e.target.dataset;
				if (!name) return; // console.log('format', name, value)
				this.editorCtx.format(name, value);
			},

			onStatusChange(e) {
				this.formats = e.detail;
			},

			insertDivider() {
				this.editorCtx.insertDivider({
					success: function() {
						console.log('insert divider success');
					}
				});
			},

			store(e) {
				this.editorCtx.getContents({
					success: function(res) {
						e.currentTarget.id == 1 ? console.log('保存内容:', res.html) : uni.navigateTo({
							url: `./components/preview?rich=${encodeURIComponent(res.html)}`
						});
					}
				});
			},

			clear() {
				this.editorCtx.clear({
					success: function(res) {
						console.log("clear success");
					}
				});
			},

			removeFormat() {
				this.editorCtx.removeFormat();
			},

			insertDate() {
				const date = new Date();
				const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
				this.editorCtx.insertText({
					text: formatDate
				});
			},

			insertImage() {
				// const that = this;
				var token = this.token
				var type = this.type
				var articleId = this.articleId
				uni.chooseImage({
					count: 1,
					success: function(res) {
						uni.uploadFile({
							header:{
								"Authorization":token,
								"type":type
							},
							url:serverUrl+'/oss/1?parentId='+articleId,
							filePath: res.tempFilePaths[0],
							name:"file",
							method:'POST',
							success: (re) => {
								var mydata = JSON.parse(re.data)
								_self.editorCtx.insertImage({
									src: mydata.data,
									data: {
										id: 'myImg',
										role: 'god',
										class:'img'
									},
									width: '60%',
									success: function() {
										// console.log('insert image success');
									}
								});

							},
						})

					}
				});
			},
			warning(msg) {
				this.HMmessages.show(msg, {iconColor: '#ffffff', fontColor: '#ffffff', background: "#ffd655"})
			}
			}
	}
</script>

<style>
	@import url("travel.css");
	@import url("editor.css");
</style>
