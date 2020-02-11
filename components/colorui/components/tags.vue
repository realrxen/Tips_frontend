<template>
    <view class='myTagsWrapper flex flex-wrap'>
        <view class="padding-xs" v-for="(item,index) in tags" :key="index" v-if="item.name!='gray'">
            <view class="cu-tag bg-main myTag">{{item}}</view>
        </view>
        <view class="padding-xs" v-for="(item,index) in tags" :key="index" v-if="item.name!='gray' && item.name!='black' && item.name!='white'">
            <view class="cu-tag light bg-main myTag">{{item}}</view>
        </view>
    </view>
</template>

<script>
    export default {
        name: "tags",
        data(){
            return{
                tags:["周末","情侣","自驾游","自然","古镇"]
            }
        }
    }
</script>

<style scoped>
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
