<template>
    <view>
<!--         <textarea placeholder="把你的想法说给大家听听吧"-->
<!--		 v-model="content"-->
<!--		 class="textarea"/>-->
        <view class="cu-form-group margin-top">
            <textarea maxlength="-1" :disabled="modalName!=null" foucus @input="textareaBInput" placeholder="把你的想法说给大家听听吧"></textarea>
        </view>
    </view>
</template>

<script>
	export default {
		name:"MyTextArea",
	    data() {
	        return {
				content:"Tips!",
                textareaValue:""
			}
	    },
	    methods: {
            textareaBInput(e) {
                this.textareaValue = e.detail.value
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
</style>
