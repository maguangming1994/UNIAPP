<template>
    <view >
        <img v-if="img!=''" :src="img" :style="{width:width , height:height}"  />
    </view>

</template>
<style>
    img{
        min-height: 100upx;
        min-width: 100upx;
    }

</style>

<script>

    import QR from "./qrcode2.js" // 二维码组件

    export default {
        components: {
        },
        props: {
            content: {
                default : ''
            } ,
            size : {
                default : 100
            } ,
            width : {
                default : '100px'
            } ,
            height : {
                default : '100px'
            }
        },
        data : function(){
            return {
                img : ''
            }
        },
        methods: {
        },
        created : function () {
            this.img = QR.createQrCodeImg(this.content, {
                size: parseInt(this.size)//二维码大小
            })
        }
    };


</script>