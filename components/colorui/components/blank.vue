<template>

</template>

<script>
    getOtpCode(){
        console.log(this.telephone)
        uni.request({
            url:serverUrl+'/users/otp/'+this.telephone,
            method:'GET',
            success: (res) => {
                if(res.data.code===0){
                    if(this.codeTime>0){return}
                    this.codeTime=30
                    let timer = setInterval(()=>{
                        if(this.codeTime>=1){
                            this.codeTime--
                        }else{
                            this.codeTime=0
                            clearInterval(timer)
                        }
                    },1000)
                }
            }
        })

    }
</script>

<style scoped>

</style>
