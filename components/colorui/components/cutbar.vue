<template>
    <view class="cu-bar bg-gray solid-bottom CommentTitlewrapper">
        <view>
            <text class="cuIcon-title"></text>
            <text class="myCutBarTitle">{{text}} <text class="myCommentCount">{{" "+commentCount}}</text>
        </view>
    </view>
</template>

<script>
    export default {
        name: "cutbar",
        props:{
            text: String,
            commentCount:{
                type: Number,
                defaultValue:0
            }
        }
    }
</script>

<style scoped>
    .myCutBarTitle {
        margin-left: 5rpx;
        font-size: 16px;
        font-weight: bold;
    }

    .myCommentCount{
        font-size: 15px;
    }
</style>
