<template>
    <view>
        <scroll-view scroll-x class="bg-gray nav text-center">
            <view class="cu-item" :class="index===TabCur?'font-color-change3 cur':''" v-for="(item,index) in content" :key="index" @tap="tabSelect" :data-id="index">
                {{item}}
            </view>
        </scroll-view>
    </view>
</template>

<script>
    export default {
        name: "nav",
        data() {
            return {
                TabCur: 0,
                scrollLeft: 0,
				content:["关注","热门"]
            };
        },
        methods: {
            tabSelect(e) {
                this.TabCur = e.currentTarget.dataset.id;
                this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
            }
        }
    }
</script>

<style scoped>
    .font-color-change3{
        color: #FFD655;
        border-bottom:thick solid #FFD655;
        font-size: 35rpx;
        font-weight: bold;
    }
</style>
