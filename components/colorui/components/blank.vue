<template>

</template>

<script>
    export default {
        name: "blank"
    }

    if(imgs.length>0){
        for (let i = 0; i < imgs.length; i++) {
            uni.uploadFile({
                header:{
                    "Authorization":this.token,
                    "type":this.type
                },
                url:serverUrl+'/oss/insert?parentId='+currentPostId,
                filePath:imgs[i],
                name:"file",
                method:'POST',
                success: (res) => {

                },
            })
        }}else{
        uni.showToast({title:"发布成功!",duration:1200})
        uni.navigateBack({delta:1})
    }
</script>

<style scoped>

</style>
