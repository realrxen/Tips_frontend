<template>
    <view class="content" :class="{'active':show}">
        <view class="tabbar-box-wrap">
            <view class="tabbar-box">
                <view class="tabbar-box-item" style="border-bottom: 1px  solid #c8c8c8">
                    <view class="cuIcon-discover myIcon"></view>
                    <view class="myContent">发动态</view>
                </view>
                <view class="tabbar-box-item" @click="goToPage('../travels/travels')">
                        <view class="cuIcon-edit myIcon"></view>
                        <view class="myContent">写游记</view>
                </view>
            </view>

        </view>
    </view>
</template>

<script>
    export default {
        props:{
            show:Boolean
        },
        data() {
            return {
            };
        },
        methods: {
            goToPage(url) {
                if (!url) return;
                uni.navigateTo({
                    url
                });
            }
        }
    };
</script>

<style lang="scss" scoped>

    .content {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        /* #ifdef H5 */
        height: calc(100vh - var(--window-bottom) - var(--window-top));
        /* #endif */
        /* #ifndef H5 */
        height: 100vh;
        /* #endif */
        transition: opacity 0.3s;
        background: #f1f1f1;
        opacity: 0;
        &.active {
            opacity: 1;
        }
        .logo {
            position: relative;
            margin-top: -400upx;
            width: 200upx;
            height: 200upx;
            // z-index: -1;
            opacity: 0;
            transition: opacity 0.3s;
            &.active {
                opacity: 1;
            }
        }
    }
    .tabbar-box-wrap {
        position: fixed;
        bottom: 88px;
        left: 0;
        right: 0;
        z-index: 999;
        /*position: absolute;*/
        width: 360rpx;
        padding: 50upx;
        box-sizing: border-box;
        margin:-25px 108px;
        .tabbar-box {
            position: relative;
            display: flex;
            width: 100%;
            flex-direction: column;
            background: #fff;
            border-radius: 20upx;
            padding: 15upx 20upx;
            box-sizing: border-box;
            z-index: 2;
            box-shadow: 0px 2px 5px 2px rgba(0, 0, 0, 0.1);
            &:after {
                content: '';
                position: absolute;
                bottom: -16upx;
                left: 0;
                right: 0;
                margin: auto;
                width: 50upx;
                height: 50upx;
                transform: rotate(45deg);
                background: #fff;
                z-index: 1;
                box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.1);
                border-radius: 2px;
            }
            opacity: 0.9;
            &:before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 150rpx;
                height: 150rpx;
                background: #ffffff;
                border-radius: 20upx;
                z-index: 2;
            }
            .tabbar-box-item {
                display: flex;
                align-items: center;
                justify-content: center;
                // position: relative;
                width: 100%;
                z-index: 3;
                margin: 10upx;
                .myIcon{
                    font-size: 22px;
                    color: #ffd655;
                    margin-right: 10px;
                }
                .myContent{
                    font-size: 16px;
                    margin-right: 7px;
                }
            }

        }
    }
</style>
