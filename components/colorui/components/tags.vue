<template>
    <view class="tag">
        <view class="myText bg-white" style="text-align:left">
            选择你的标签:
        </view>
        <view class='myTagsWrapper flex flex-wrap bg-white'>
            <view class="padding-xs" v-for="tag in tags" :key="tag.tagId">
                <view class="cu-tag myTag" @tap="changeTagSelect"
                      :class="tag.isSelected?'bg-main':'bg-gray'"
                      :data-tagId="tag.tagId">{{tag.name}}</view>
            </view>
        </view>
		<HMmessages ref="HMmessages" @complete="HMmessages = $refs.HMmessages" @clickMessage="clickMessage"></HMmessages>
    </view>
</template>

<script>
	import common from "../../../common/common.js"
	import HMmessages from "../../HM-messages/HMmessages.vue"
	var serverUrl = common.serverUrl
    export default {
        name: "tags",
        props:{
            hasSelectTags:Array
        },
		components:{
			HMmessages
		},
        data(){
            return{
                tags: [
                    {
                        "tagId": "1",
                        "isSelected":false,
                        "name": "周末游"
                    },
                    {
                        "tagId": "3",
                        "isSelected":false,
                        "name": "古镇"
                    },
                    {
                        "tagId": "5",
                        "isSelected":false,
                        "name": "一日游"
                    }
                ],
                selectedTagId:0,
                selectedTagIds:[],
                // isSelected:false
            }
        },
		created() {
			uni.request({
				url:serverUrl+'/tags/',
				method:'GET',
				success: (res) => {
					if(res.data.code===0){
						this.tags=res.data.data
					}
				}
			})
		},
        methods:{
            changeTagSelect(e) {
				if(this.selectedTagIds.length==2){
					this.warning("亲，你还能再选一个哦！")
				}
				if(this.selectedTagIds.length==3){
					this.warning("亲，最多选四个哟！")
				}
				if(this.selectedTagIds.length==4){
					this.warning("亲，不能再选了哦！")
					return
				}
                var tagId = e.currentTarget.dataset.tagid
                var tagList = this.tags
                var selectedTagIdsList= this.selectedTagIds
                tagList.forEach(tag=>{
                    if (tag.tagId === tagId) {
                        if (tag.isSelected) {
                            selectedTagIdsList.forEach((item, order) => {
                                if (item === tagId) {
                                    selectedTagIdsList.splice(order,1)
                                    tag.isSelected=!tag.isSelected
                                    var uniqueTagIds = [...new Set(selectedTagIdsList)]
                                    this.selectedTagIds=uniqueTagIds
                                }
                            });
                        }else {
                            selectedTagIdsList.push(tagId)
                            tag.isSelected=!tag.isSelected
                            var uniqueTagIds = [...new Set(selectedTagIdsList)]
                            this.selectedTagIds=uniqueTagIds
                        }
                    }
                })

                this.$emit('getTagIds',this.selectedTagIds.toString())

            },
			warning(msg) {
				this.HMmessages.show(msg, {iconColor: '#ffffff', fontColor: '#ffffff', background: "#ffd655"})
			}


        },


    }
</script>

<style scoped>
    /* .tag{
        background-color: #FFFEFF;
        display: flex;
        flex-direction: column;
    } */
    /* .myText{
        float: left;
        margin-left: 20rpx;
        margin-bottom: 10rpx;
    } */
  /*  .myTagsWrapper{
		display: flex;
		flex-wrap: wrap;
        padding: 0 20px 20px 20px;
    } */
 /*   .myTag{
		display:block;
        border-radius: 30rpx;
		white-space:nowrap;
    } */

/*.myTagsWrapper{*/
/*    display: flex;*/
/*    align-items: center;*/
/*    justify-content: flex-start;*/
/*    padding: 0 30rpx;*/
/*    margin-top: 10rpx;*/
/*}*/

/*.myTag {*/
/*    display: inline-block;*/
/*    width: auto;*/
/*    height: auto;*/
/*    border-radius: 18rpx;*/
/*    margin-right: 20rpx;*/
/*}*/
</style>
