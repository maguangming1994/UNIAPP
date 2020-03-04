<template>
    <view v-if="is_page_loaded" @click1="capture" class="full_screen">

        <view class="content">
            <image :src="page_data.cover" class="share-image" mode="aspectFit" style="width:750rpx;height:750rpx"></image>
            <canvasdrawer :painting="painting" class="canvasdrawer" @getImage="eventGetImage"/>
        </view>

        <div  class="nav is-fixed-bottom columns is-mobile is-marginless has-text-centered padded">

            <div class="column" @click="eventDraw">生成海报</div>              <div class="column" @click="eventSave">后保存本地</div>
        </div>
    </view>
</template>
<script>
    import item_qrcode2 from '@/bra/common/item_qrcode2.vue';
    import canvasdrawer from '@/bra/common/canvasdrawer.vue';
    import QR from '@/bra/common/qrcode2.js';
    import { pathToBase64, base64ToPath } from '@/bra/common/image.js';
    export default {
        components: {
            item_qrcode2 , canvasdrawer
        },
        data() {
            return {
                page_name: 'yxm_user_my_poster',
                module: 'yxm',
                is_page_loaded: false,
                page_data: {},
                ifShow: true,
                val: '', // 要生成的二维码值
                size: 350, // 二维码大小
                unit: 'upx', // 单位
                background: '#b4e9e2', // 背景色
                foreground: '#309286', // 前景色
                pdground: '#32dbc6', // 角标色
                icon: '', // 二维码图标
                onval: false, // val值变化时自动重新生成二维码
                painting: {},
                shareImage: '' ,
                img : ''
            }
        },
        onLoad : function(){

        },
        onShow() {

            if (!this.is_page_loaded) {
                this.onMhcmsPull();
            }
        },

        methods: {

            onMhcmsPull() {
                this.bra_common_page(this.module, this.page_name, {}, true, (data) => {

                    this.page_data = this.elements.page_data;
                    this.val = this.bra_web('bra_app', 'index', 'share_install', {
                        refer: this.page_data.user.id,
                        appid: this.site_info.bra_app_id
                    });


                    this.img = QR.createQrCodeImg(this.val, {
                        size: parseInt(this.size)//二维码大小
                    });

                    base64ToPath(QR.createQrCodeImg(this.val, {
                        size: parseInt(this.size)//二维码大小
                    }))
                        .then(path => {
                            this.val = path;
                            console.log(path)
                        })
                        .catch(error => {
                            console.error(error)
                        });

                    console.log(this.val);
                    this.is_page_loaded = true;
                    uni.stopPullDownRefresh();
                });
            },

            capture() {
                var pages = getCurrentPages();
                var page = pages[pages.length - 1];
                console.log(pages);
                var bitmap = null;
                var currentWebview = page.$getAppWebview();
                bitmap = new plus.nativeObj.Bitmap('amway_img');
                // 将webview内容绘制到Bitmap对象中
                currentWebview.draw(bitmap, function() {
                    console.log('截屏绘制图片成功');
                    bitmap.save("_doc/" + Math.random() + 'a.jpg', {}, function(i) {
                        console.log('保存图片成功：' + JSON.stringify(i));
                        uni.saveImageToPhotosAlbum({
                            filePath: i.target,
                            success: function() {
                                bitmap.clear(); //销毁Bitmap图片
                                uni.showToast({
                                    title: '保存图片成功',
                                    mask: false,
                                    duration: 1500
                                });
                            }
                        });
                    }, function(e) {
                        console.log('保存图片失败：' + JSON.stringify(e));
                    });
                }, function(e) {
                    console.log('截屏绘制图片失败：' + JSON.stringify(e));
                });
            } ,
            eventDraw () {
                uni.showLoading({
                    title: '绘制分享图片中',
                    mask: true
                })

                this.painting = {
                    width: 375,
                    height: 555,
                    clear: true,
                    views: [

                        {
                            type: 'image',
                            url: this.page_data.cover,
                            top: 0,
                            left: 0,
                            width: 375,
                            height: 555
                        },
                        {
                            type: 'image',
                            url:  this.val,
                            top: 400,
                            left: 136,
                            width: 100,
                            height: 100
                        },

                        {
                            type: 'text',
                            content: '推荐人:' + this.page_data.user.nickname,
                            fontSize: 16,
                            color: '#402D16',
                            textAlign: 'left',
                            top: 360,
                            left: 96,
                            bolder: true
                        },
                        {
                            type: 'text',
                            content: '手机号码:' + this.page_data.user.mobile[0] + this.page_data.user.mobile[1] + this.page_data.user.mobile[2] + "*******" + this.page_data.user.mobile[9] + this.page_data.user.mobile[10],
                            fontSize: 15,
                            color: '#563D20',
                            textAlign: 'left',
                            top: 380,
                            left: 96
                        }, /**
                         *
                        {
                            type: 'text',
                            content: '正品MAC魅可口红礼盒生日唇膏小辣椒Chili西柚情人',
                            fontSize: 16,
                            lineHeight: 21,
                            color: '#383549',
                            textAlign: 'left',
                            top: 336,
                            left: 44,
                            width: 287,
                            MaxLineNumber: 2,
                            breakWord: true,
                            bolder: true
                        },
                        {
                            type: 'text',
                            content: '￥0.00',
                            fontSize: 19,
                            color: '#E62004',
                            textAlign: 'left',
                            top: 387,
                            left: 44.5,
                            bolder: true
                        },
                        {
                            type: 'text',
                            content: '原价:￥138.00',
                            fontSize: 13,
                            color: '#7E7E8B',
                            textAlign: 'left',
                            top: 391,
                            left: 110,
                            textDecoration: 'line-through'
                        },
                        {
                            type: 'text',
                            content: '长按识别图中二维码帮我砍个价呗~',
                            fontSize: 14,
                            color: '#383549',
                            textAlign: 'left',
                            top: 460,
                            left: 165.5,
                            lineHeight: 20,
                            MaxLineNumber: 2,
                            breakWord: true,
                            width: 125
                        }
                         */
                    ]
                }
            },
            eventSave () {
                if(!this.shareImage){
                    return this.show_toast('请先生成海报');
                }
                uni.saveImageToPhotosAlbum({
                    filePath: this.shareImage,
                    success (res) {
                        uni.showToast({
                            title: '保存图片成功',
                            icon: 'success',
                            duration: 2000
                        })
                    }
                })
            },
            eventGetImage(event) {
                uni.hideLoading()
                const tempFilePath = event.tempFilePath
                const errMsg = event.errMsg
                if (errMsg === 'canvasdrawer:ok') {
                    this.page_data.cover = this.shareImage = tempFilePath
                    this.painting = {}
                }
            }
        }
    }
</script>

<style>

</style>
