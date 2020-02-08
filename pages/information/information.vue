<template>
    <view class="page page-fill">
        <view class="BarWrapper">
            <view class="buttonWrapper">
                <view class="button" v-for="(tabBar,order) in tabBars" :key="order"
                      :class="tabIndex===order?'font-color-change3':''"
                      @click="changeTabIndex(order)">
                    {{tabBar.name}}
                </view>
            </view>
        </view>
        <block v-for="(post,index) in posts" :key=index>
            <UserPost :post='post' :index='index'
                      @follow='follow' @love='love'></UserPost>
            <Divider></Divider>
        </block>
        <view class="publish animated fadeInUp">
            <image src="../../static/tab/fab.png" mode="widthFix" @click="write"></image>
        </view>
    </view>
</template>

<script>
    import UserPost from "./components/UserPost.vue"
	export default {
		name: "information",
        components:{
		    UserPost
        },
        data(){
		    return{
                scrollH:300,
                scrollInto:'',
                tabIndex:0,
                tabBars:[{
                    name:'关注',
                    id:0
                },
                    {
                        name:'推荐',
                        id:1
                    },
                ],
                posts:[
                    {
                        username:"Seeumt",
                        faceIcon:'http://seeumt.oss-cn-hangzhou.aliyuncs.com/870c6addbb7b48988799af07b0a6d5c2.png',
                        createTime:'2000-10-07',
                        isFollow:false,
                        title:'LoveLOVELLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLDASDSAD看附件打开附件打开啦基督教考虑到房价快递君框架的克里夫健康的即可饥渴',
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
                ]
            }

        },
        methods:{likeHateUpDown(posts,e){
                let post = posts[e.index]
                if(post.love.type===''){
                    posts[e.index].love[e.type+'Count']+=1
                    posts[e.index].love.type=e.type
                    return
                }else if(post.love.type===e.type){
                    posts[e.index].love[post.love.type+'Count']--
                    posts[e.index].love.type=''
                }else if(post.love.type!==e.type){
                    posts[e.index].love[post.love.type+'Count']--
                    posts[e.index].love.type=e.type
                    posts[e.index].love[e.type+'Count']+=1
                }
            },
            follow(index){
                this.posts[index].isFollow=true
                uni.showToast({title:"关注成功!",duration:1000})
            }
            ,
            love(e){
                this.likeHateUpDown(this.posts,e)
            },
            likeHateUpDown(posts,e){
                let post = posts[e.index]
                if(post.love.type===''){
                    posts[e.index].love[e.type+'Count']+=1
                    posts[e.index].love.type=e.type
                    return
                }else if(post.love.type===e.type){
                    posts[e.index].love[post.love.type+'Count']--
                    posts[e.index].love.type=''
                }else if(post.love.type!==e.type){
                    posts[e.index].love[post.love.type+'Count']--
                    posts[e.index].love.type=e.type
                    posts[e.index].love[e.type+'Count']+=1
                }
            },
            followNew(index){
                this.posts[index].isFollow=true
                uni.showToast({title:"关注成功!",duration:1000})
            }
            ,

            /* 监听滑动事件 */
            changeScreen(e){
                this.tabIndex=e.detail.current
                console.log(this.tabIndex)
            },
            changeTabIndex(order){
                this.tabIndex=order
                this.scrollInto='tab'+order
            },
		    write(){
		        console.log("hello")
            }
        }
	}
</script>

<style scoped>
@import url("information.css");
</style>
