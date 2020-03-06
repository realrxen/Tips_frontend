<template>
    <view class="UpLoadWrapper">
        <view class="TextWrapper">
            <view class="myText" style="text-align:right">
                {{warningText}}{{edit?imgs.length:imgList.length}}/{{limitLength}}
            </view>
        </view>
        <view class="cu-form-group bg-white">
            <view class="grid col-3 grid-square flex-sub">
                <template v-if="edit">
                    <view class="bg-img" v-for="(img,index) in imgs" :key="index" @tap="ViewImage" :data-url="imgList[index]">
                        <image :src="img.imgUrl" :data-imgId="img.imgId" mode="aspectFill" class="myImages"></image>
                        <view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
                            <text class='cuIcon-close'></text>
                        </view>
                    </view>
                </template>
                <template v-else>
                    <view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
                        <image :src="imgList[index]" mode="aspectFill"></image>
                        <view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
                            <text class='cuIcon-close'></text>
                        </view>
                    </view>
                </template>
                <view class="solids" @tap="ChooseImage" v-if="imgs.length<limitLength">
                    <text class='cuIcon-add' style="border:#3c3c3c"></text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    import common from "../../../common/common.js"
    var serverUrl = common.serverUrl
    export default {
        props:{
            isPost:{
                  type: Boolean,
                  default:true
                },
            imgs:Array,
            edit:{
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                imgList: [],
                selectedImgList:[],
                warningText:this.isPost?"点击预览图片":"选择封面",
                newImgList: []

            };
        },
        computed:{
            limitLength(){
                if (this.edit) {
                    return 9;
                }
                else {
                    return this.isPost?9:1
                }
            }
        },
        methods: {
            ChooseImage() {
                uni.chooseImage({
                    count: this.isPost?9:1,
                    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album'], //从相册选择
                    success: (res) => {
                        if (this.edit) {
                            if (this.imgs.length !== 0) {
                                    var img = {imgId:"", imgUrl:""};
                                    img.imgUrl=res.tempFilePaths[0]
                                    this.imgs.push(img)
                                this.$emit('editImgsChange',this.imgs)
                            } else {
                                var img = {imgId:"", imgUrl:""};
                                img.imgUrl=res.tempFilePaths[0]
                                this.imgs[0]=img
								this.$emit('editImgsChange',this.imgs)
                            }
                        }else {
                            if (this.imgList.length !== 0) {
                                this.imgList = this.imgList.concat(res.tempFilePaths);
                                this.$emit('getImgList',this.imgList);
                            } else {
                                this.imgList = res.tempFilePaths;
                                this.$emit('getImgList',this.imgList);
                            }
                        }

                    }
                });

            },
            // ViewImage(e) {
            //     uni.previewImage({
            //         urls: this.imgList,
            //         current: e.currentTarget.dataset.url
            //     });
            // },
            DelImg(e) {
                if (this.edit) {
                    uni.showModal({
                        title: 'Tips',
                        content: '亲，老照片删除了要重新上传哟',
                        cancelText: '我想想',
                        confirmText: '删除',
                        success: res => {
                            if (res.confirm) {
                                var ossId = this.imgs[e.currentTarget.dataset.index].imgId
                                if (ossId!=="") {
                                    uni.request({
                                        url:serverUrl+'/oss/imgs/'+ossId,
                                        method:'DELETE',
                                        success: (res) => {
                                            if(res.data.code===0){
                                                this.imgs.splice(e.currentTarget.dataset.index, 1);
                                                uni.showToast({title:res.data.data,duration:1500})
                                            }

                                        },
                                        fail: () => {

                                        },
                                        complete: () => {

                                        }
                                    });
                                }else {
                                    this.imgs.splice(e.currentTarget.dataset.index, 1);
                                }
                                this.$emit('editImgsChange',this.imgs);
                            }
                        }
                    });
                } else {
                    uni.showModal({
                        title: 'Tips',
                        content: '确定要删除这张图片吗？',
                        cancelText: '再看看',
                        confirmText: '删除',
                        success: res => {
                            if (res.confirm) {
                                this.imgList.splice(e.currentTarget.dataset.index, 1);
                                this.$emit('getImgList',this.imgList)
                            }
                        }
                    });
                }

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
