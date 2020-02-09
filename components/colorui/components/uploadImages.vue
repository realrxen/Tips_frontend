<template>
    <view>
        <view class="cu-bar bg-gray margin-top">
            <view class="action" style="text-align: right">
                亲，不超过9张哟！
            </view>
        </view>
        <view class="cu-form-group">
            <view class="grid col-3 grid-square flex-sub">
                <view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
                    <image :src="imgList[index]" mode="aspectFill" class="myImages"></image>
                    <view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
                        <text class='cuIcon-close'></text>
                    </view>
                </view>
                <view class="solids" @tap="ChooseImage" v-if="imgList.length<9">
                    <text class='cuIcon-cameraadd' style="border:#3c3c3c"></text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                imgList: [],
            };
        },
        methods: {
            ChooseImage() {
                uni.chooseImage({
                    count: 9, //默认9
                    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album'], //从相册选择
                    success: (res) => {
                        if (this.imgList.length != 0) {
                            this.imgList = this.imgList.concat(res.tempFilePaths)
                        } else {
                            this.imgList = res.tempFilePaths
                        }
                    }
                });
            },
            ViewImage(e) {
                uni.previewImage({
                    urls: this.imgList,
                    current: e.currentTarget.dataset.url
                });
            },
            DelImg(e) {
                uni.showModal({
                    title: 'Tips',
                    content: '确定要删除这张图片吗？',
                    cancelText: '再看看',
                    confirmText: '删除',
                    success: res => {
                        if (res.confirm) {
                            this.imgList.splice(e.currentTarget.dataset.index, 1)
                        }
                    }
                })
            },
            textareaAInput(e) {
                this.textareaAValue = e.detail.value
            },
            textareaBInput(e) {
                this.textareaBValue = e.detail.value
            }
        }
    }
</script>

<style>
    .cu-form-group .title {
        min-width: calc(4em + 15px);
    }
    .myImages{
        border-radius: 20upx;
    }
</style>
