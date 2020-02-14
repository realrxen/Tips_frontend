<template>
	<view>
		<rich-text :nodes="richText"></rich-text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				richText: '',
			}
		},
		onLoad(options) {
			this.richText = decodeURIComponent(options.rich);
			console.log(this.richText)
		},
		methods: {
		}
	}
</script>

<style>

</style>
