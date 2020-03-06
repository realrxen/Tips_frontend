<template>
    <view>
<!--         <textarea placeholder="把你的想法说给大家听听吧"-->
<!--		 v-model="content"-->
<!--		 class="textarea"/>-->
        <view class="cu-form-group margin-top">
            <textarea class="myTextArea" maxlength="-1" :value="editText" :disabled="false" foucus @input="textareaBInput" :placeholder="edit?'':'把你的想法说给大家听听吧'"></textarea>
        </view>
        <view class="warn-text">最多200字呦</view>
        <HMmessages></HMmessages>
    </view>
</template>

<script>
    import HMmessages from "../../../components/HM-messages/HMmessages";
	export default {
		name:"MyTextArea",
		props:{
			editText:String,
            edit:{
                type: Boolean,
                default: false
            }
		},
	    data() {
	        return {
                content:""
			}
	    },
        components:{
		    HMmessages
        },
		onLoad() {
			this.$emit('editContentChange',this.editText)
		},
	    methods: {
            textareaBInput(e) {
                var content = e.detail.value
				if(this.edit){
					this.$emit('editContentChange',content)
				}else{
                this.$emit('getContent',content)
				}
            },
            warning(msg) {
                this.HMmessages.show(msg, {iconColor: '#ffffff', fontColor: '#ffffff', background: "#ffd655"})
            }
	    }
	}
</script>

<style>
	.textarea{
		/* border:5px solid red; */
		width: 100%;
		padding: 20rpx 20rpx 0;

	}
	.myIcon{
		color: #FF0000;
		font-size: 100rpx;
	}
    .warn-text{
        float: right;
        margin-right: 20rpx;
        color: #c8c8c8;
    }
    .myTextArea {
        width: 100%;
        height: 240rpx;
    }

</style>
