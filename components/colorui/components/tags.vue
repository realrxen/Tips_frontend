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
    </view>
</template>

<script>
    export default {
        name: "tags",
        props:{
            hasSelectTagList:Array
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
        methods:{
            changeTagSelect(e) {
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
                                    // console.log(this.selectedTagIds);
                                }
                            });
                        }else {
                            selectedTagIdsList.push(tagId)
                            tag.isSelected=!tag.isSelected
                            var uniqueTagIds = [...new Set(selectedTagIdsList)]
                            this.selectedTagIds=uniqueTagIds
                            // console.log(this.selectedTagIds)
                        }
                    }
                })

                this.$emit('getTagIds',this.selectedTagIds.toString())

            },


        },


    }
</script>

<style scoped>
    .tag{
        background-color: #FFFEFF;
        display: flex;
        flex-direction: column;
    }
    .myText{
        float: left;
        margin-left: 20rpx;
        margin-bottom: 10rpx;
    }
    .myTagsWrapper{
        padding: 0 20px 20px 20px;
    }
    .myTag{
        border-radius: 30rpx;
    }

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
