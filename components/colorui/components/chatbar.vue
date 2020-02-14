<template>
    <view class="cu-bar input chatBar">
        <view class="cu-avatar round" :style="'background-image:url('+this.userInfo.faceIcon+')'"></view>
        <view class="action">
            <text class="cuIcon-roundaddfill text-grey"></text>
        </view>
        <input @focus="InputFocus" :placeholder="placeholder" @blur="InputBlur" :adjust-position="false" class="solid-bottom" maxlength="300" cursor-spacing="10"></input>
        <view class="action">
            <text class="cuIcon-emojifill text-gray"></text>
        </view>
        <view class="bg-main shadow-blur sendBtn animated" hover-class="jello">发送</view>
    </view>
</template>

<script>
    export default {
        name: "chatbar",
        props:{
            faceIcon:{
                type:String,
                defaultValue:"http://img4.imgtn.bdimg.com/it/u=3006607636,42691152&fm=11&gp=0.jpg"
            }
        },
        data() {
            return {
                InputBottom: 0,
                placeholder:"请文明发言"
            };
        },
        methods: {
            InputFocus(e) {
                this.InputBottom = e.detail.height
            },
            InputBlur(e) {
                this.InputBottom = 0
            }
        }
    }
</script>

<style scoped>
    .box {
        margin: 20upx 0;
    }

    .box view.cu-bar {
        margin-top: 20upx;
    }
    .chatBar{
        width: 100%;
        bottom: 0;
        font-size: 40upx;
        line-height: 100upx;
        text-align: center;
        position: fixed;
        z-index: 999;
        border-radius: 20rpx;
    }
    .sendBtn{
        width: 90rpx;
        height: 50rpx;
        border-radius: 10rpx;
    }

</style>
