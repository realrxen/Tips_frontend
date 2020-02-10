<template>
	<view class="page-fill page">
		<Nav :tabsArray="tabsArray" @tabChanged="tabChanged"></Nav>
		<block v-for="(item,dataIndex) in dataList" :key="dataIndex">
			<template v-if="tabIndex===dataIndex">
				<block v-for="(post,index) in item.posts" :key=index>
					<UserPost :post='post' :index='index'
							  @follow='follow' @love='love'></UserPost>
					<Divider></Divider>
				</block>
			</template>
		</block>
		<block v-for="(post,index) in posts" :key=index>
			<UserPost :post='post' :index='index'
					  @follow='follow' @love='love'></UserPost>
			<Divider></Divider>
		</block>

		<PopUp :show="show"></PopUp>
		<Tabbar @pop="pop"></Tabbar>
	</view>
</template>

<script>
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
				posts:[
					{
						username:"Seeumt",
						faceIcon:'http://seeumt.oss-cn-hangzhou.aliyuncs.com/870c6addbb7b48988799af07b0a6d5c2.png',
						createTime:'2000-10-07',
						isFollow:false,
						title:'Lo看附件打开附件打开啦LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL基督教考虑到房价快递君框架的克里夫健康的即可饥渴',
						coverPicture:"http://seeumt.oss-cn-hangzhou.aliyuncs.com/5ebfed05dbd340a69cd288d75628986a.jpg",
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
						coverPicture:"",
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
						coverPicture:"http://seeumt.oss-cn-hangzhou.aliyuncs.com/5ebfed05dbd340a69cd288d75628986a.jpg",
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
						coverPicture:"http://seeumt.oss-cn-hangzhou.aliyuncs.com/5ebfed05dbd340a69cd288d75628986a.jpg",
						love:{
							type:'',
							likeCount:8000,
							hateCount:10
						},
						commentCount:8622000,
						collectCount:7000,
					}
				],
				dataList:[
						{posts:[
							{
								username:"Seeumt",
								faceIcon:'http://seeumt.oss-cn-hangzhou.aliyuncs.com/870c6addbb7b48988799af07b0a6d5c2.png',
								createTime:'2000-10-07',
								isFollow:false,
								title:'Love',
								coverPicture:"http://seeumt.oss-cn-hangzhou.aliyuncs.com/5ebfed05dbd340a69cd288d75628986a.jpg",
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
								coverPicture:"",
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
								coverPicture:"http://seeumt.oss-cn-hangzhou.aliyuncs.com/5ebfed05dbd340a69cd288d75628986a.jpg",
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
								coverPicture:"http://seeumt.oss-cn-hangzhou.aliyuncs.com/5ebfed05dbd340a69cd288d75628986a.jpg",
								love:{
									type:'',
									likeCount:8000,
									hateCount:10
								},
								commentCount:8622000,
								collectCount:7000,
							}
						]},
					    {posts:[
							{
								username:"Tips",
								faceIcon:'https://seeumt.oss-cn-hangzhou.aliyuncs.com/078fccb64ca0403b99df750194dee314.jpg',
								createTime:'2000-10-07',
								isFollow:false,
								title:'Love',
								coverPicture:"https://seeumt.oss-cn-hangzhou.aliyuncs.com/7749ba06df674a9d8336dc55d7b487f9.jpg",
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
								faceIcon:'https://seeumt.oss-cn-hangzhou.aliyuncs.com/078fccb64ca0403b99df750194dee314.jpg',
								createTime:'2010-10-07',
								isFollow:false,
								title:'Love',
								coverPicture:"",
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
								faceIcon:'https://seeumt.oss-cn-hangzhou.aliyuncs.com/078fccb64ca0403b99df750194dee314.jpg',
								createTime:'2010-10-07',
								isFollow:false,
								title:'Love',
								coverPicture:"https://seeumt.oss-cn-hangzhou.aliyuncs.com/7749ba06df674a9d8336dc55d7b487f9.jpg",
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
								faceIcon:'https://seeumt.oss-cn-hangzhou.aliyuncs.com/078fccb64ca0403b99df750194dee314.jpg',
								createTime:'2010-10-07',
								isFollow:false,
								title:'Love',
								coverPicture:"https://seeumt.oss-cn-hangzhou.aliyuncs.com/7749ba06df674a9d8336dc55d7b487f9.jpg",
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
				show: false,
				tabIndex:0
			}
		},
		onLoad() {},
		onShow() {
			// setTimeout(() => {
			this.show = false;
			// }, 500);
		},
		onHide() {
			this.show = false;
		},
		methods: {
			tabChanged(data){
				this.tabIndex=data
			},
			pop(data){
				this.show = data;
			}
		}
	}
</script>

<style>

</style>
