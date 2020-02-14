<template>
    <view class="bg-gray UpLoadWrapper">
        <view class="TextWrapper bg-gray">
            <view class="myText" style="text-align:right">
                {{warningText}}{{imgList.length}}/{{limitLength}}
            </view>
        </view>
        <view class="cu-form-group bg-white">
            <view class="grid col-3 grid-square flex-sub">
                <view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
                    <image :src="imgList[index]" mode="aspectFill" class="myImages"></image>
                    <view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
                        <text class='cuIcon-close'></text>
                    </view>
                </view>
                <view class="solids" @tap="ChooseImage" v-if="imgList.length<limitLength">
                    <text class='cuIcon-add' style="border:#3c3c3c"></text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        props:{
            isPost:{
                  type: Boolean,
                  default:true
                }
        },
        data() {
            return {
                imgList: [],
                warningText:this.isPost?"点击预览图片":"选择封面"

            };
        },
        computed:{
            limitLength(){
                return this.isPost?9:1
            }
        },
        methods: {
            ChooseImage() {
                uni.chooseImage({
                    count: this.isPost?9:1,
                    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album'], //从相册选择
                    success: (res) => {
                        if (this.imgList.length !== 0) {
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
    .UpLoadWrapper{
        display: flex;
        flex-direction: column;
    }
    .cu-form-group .title {
        min-width: calc(4em + 15px);
    }
    .myImages{
        border-radius: 20upx;
    }
    .myText{
        float: right;
        margin-right: 30rpx;
    }
</style>
