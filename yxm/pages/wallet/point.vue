<style lang="scss">

    uni-image ,.avatar{
        width: 79px;
        border-radius: 50%;
        height: 79px;
    }
    .user-top{
        background-color: #47403e;

        padding: 50upx 0;
        .user{
            margin: 30upx;
            background-image: linear-gradient(354deg, #E5B707 0%, #FFE766 100%);

            -webkit-border-radius: 18upx;
            -moz-border-radius: 18upx;
            border-radius: 18upx;
            .right-cot{
                padding-left: 30upx;
            }
        }
    }

    .column{
        position: relative;
    }
    .tab1{

        color: #afbbca;
    }
    .on{
        color: #ff7852;
    }
    .on:after{
        content: '';
        position: absolute;
        top: 89%;
        background: #ff7852;
        width: 10%;
        right: 45%;
        height: 2px;
    }
    .weui-cell__ft .padding-h{
        font-size: 28upx;color: #ff7852;
    }
    .is-pulled-left{
        width: 280upx;
    }

    .points{
        font-size: 32upx;
        color:  #ff7852;
    }
    .weui-cell.weui-cell_access{

        padding: 38upx 25upx;
    }
    .item-col{
    }
    .item{
        padding: 15upx;
        background: #fff;
        margin: 9upx;
    }
</style>

<template>
    <view v-if="elements.user">

        <div class="user-top weui-cells bb10">
            <view class="user ">
            <view class=" weui-cell columns is-mobile is-marginless weui-cell_access">

                <view class="avatar-box column is-narrow">
                    <img :src="elements.user.avatar ||'/static/img/avatar2.png'" class="avatar">
                </view>
                <view class="column right-cot" >
                    <view class="weui-cell__bd" style="font-size: 40upx">
                        <view class="is-pulled-left">{{elements.user.nickname}} </view>
                        <view class="is-pulled-right" >
                            <view >
                            {{elements.user.point}}
                            </view>
                            <view class="f32" style="font-size: 26upx">
                                积分
                            </view>
                        </view>
                    </view>

                </view>
            </view>

            </view>

        </div>

        <view class="columns tab1 is-mobile is-marginless has-text-centered bb10">
            <view @click="tab1 = 1" :class="{'on' : tab1 == 1}" class="column padding">
                积分任务
            </view>
            <view @click="tab1 = 2" :class="{'on' : tab1 == 2}" class="column padding">
                积分商城
            </view>
        </view>

        <div class="weui-cells bb10" v-if="tab1==1">

            <view class="columns tab1 is-mobile is-marginless has-text-centered bb10">
                <view @click="tab2 = 1" :class="{'on' : tab2 == 1}" class="column padding">
                    每日任务
                </view>
                <view @click="tab2 = 2" :class="{'on' : tab2 == 2}" class="column padding">
                    绑定任务
                </view>
            </view>


            <view v-if="tab2==1">

                <div class="weui-cells bb10">
                    <div class="weui-cell weui-cell_access" @click="onNav" data-url="/pages/house/esf/esf_index">
                        <div class="weui-cell__bd">
                            <p class="label is-pulled-left">每日分享(三次)</p>
                            <view class="points"> +4 </view>
                        </div>
                        <div class="weui-cell__ft">
                            <p class="padding-h">前往</p>
                        </div>
                    </div>
                    <div class="weui-cell weui-cell_access" @click="onNav" :data-url="'/pages/house/task/task_idx'">
                        <div class="weui-cell__bd">
                            <p class="label is-pulled-left">每日推荐 </p>
                            <view class="points"> +12 </view>
                        </div>
                        <div class="weui-cell__ft"> <p class="padding-h">前往 </p>
                        </div>
                    </div>
                </div>
            </view>

            <view v-if="tab2==2" >
                <div class="weui-cells bb10">
                    <div class="weui-cell weui-cell_access"  data-type="navi">
                        <div class="weui-cell__bd">
                            <p class="label is-pulled-left">绑定手机号</p>
                            <view class="points"> +12 </view>
                        </div>
                        <div class="weui-cell__ft">

<p v-if="user.is_mobile_verify==1" class="padding-h faded">已绑定</p>
<p v-if="user.is_mobile_verify!=1" @click="onNav" data-url="/pages/house/user/set_mobile" class="padding-h">前往</p>
                        </div>
                    </div>
                    <div class="weui-cell weui-cell_access" >
                        <div class="weui-cell__bd">
                            <p class="label is-pulled-left">绑定微信 </p>
                            <view class="points"> +12 </view>
                        </div>
                        <div class="weui-cell__ft">
                            <p @click="bind_wx" v-if="!user.wechat_unionid" class="padding-h">立刻绑定 </p>
                            <p v-if="user.wechat_unionid" class="padding-h faded">已绑定</p>
                        </div>
                    </div>
                    <div class="weui-cell weui-cell_access" >
                        <div class="weui-cell__bd">
                            <p class="label is-pulled-left">绑定银行卡 </p>
                            <view class="points"> +12 </view>
                        </div>
                        <div class="weui-cell__ft" @click="onNav" data-url="/pages/house/wallet/wallet_cards">
                            <p v-if="elements.user_cards.length == 0" class="padding-h ">绑定</p>
                            <p v-else class="padding-h faded">已绑定</p>
                        </div>
                    </div>
                </div>
            </view>


        </div>

        <view style="background: #f8f8f8" v-if="tab1==2" class="columns is-multiline is-mobile is-marginless">
            <view class="item-col column is-half" v-for="item in elements.goods">
                <view class="item"><item_bienes :item="item"></item_bienes></view>
            </view>
        </view>

    </view>
</template>

<script>
    import rate_star from '@/bra/common/rate_star.vue';
    import item_bienes from '@/bra/common/item_bienes.vue';

    export default {
        components: {
            rate_star  , item_bienes
        },
        data() {
            return {
                pagina_nombre: 'bienes_idx',
                modulo: 'core',
                elements: {},
                upload: {},
                preview: {},
                file_ids: {},
                pickers: {},
                picker_params: {},
                input_params: {},
                pictures: {},
                isUploading: false,
                user: {} ,
                tab1 : 1 ,
                tab2 : 1
            };
        },
        onLoad() {

        },
        onShow() {
            this.onMhcmsPull();
        },
        onPullDownRefresh() {
            this.onMhcmsPull();
        },
        methods: {
            bind_wx : function(){
                uni.login({
                    provider: 'weixin',
                    success:  (loginRes) => {
                        console.log(JSON.stringify(loginRes.authResult));
                        let $params = loginRes.authResult;
                        let action = this.mhcms_app_service('core' , 'connect_weixin_user' , true);
                        let promise = this.fetch(action , $params);
                        promise.then(()=>{
                            this.toast('绑定成功');
                        } , err=>{
                            this.toast('绑定失败' + err.msg);
                        })
                    }
                });
            },
            onMhcmsPull: function () {
                let params = {};
                params.limit_loupan = 35;
                let pagina_url = this.cargar_app_pagina(this.modulo, this.pagina_nombre, params, true, (data) => {
                    this.user = this.elements.user;
                    uni.stopPullDownRefresh();
                });
            },
            onAvatar: function (e) {
                this.onOpenPictureTap(e, function () {
                    console.log('upload complete');
                });
            },
            choose() {

                uni.chooseImage({
                    count: 1,
                    success: (res) => {
                        let promise = this.upload_one(res.tempFilePaths[0]);
                        promise.then(data => {
                            console.log(data);
                            uni.showToast({
                                icon : "none",
                                title:  data.msg || '系统错误',
                                duration: 2000
                            });
                        }, err => {
                            console.log(err);
                            uni.showToast({
                                icon : "none",
                                title:  err.msg || '系统错误',
                                duration: 2000
                            });
                        })
                    },
                    fail: (err) => {
                        console.log(err)
                    }
                })

            },
            upload_one(path) {
                return new Promise((resolve, reject) => {
                    uni.showLoading({
                        title: '上传中'
                    });
                    let user = uni.getStorageSync('user') || false;
                    uni.uploadFile({
                        url: this.mhcms_app_service('attachment', 'avatar_upload', true), //仅为示例，非真实的接口地址
                        filePath: path,
                        name: 'avatar',

                        formData: {
                            Authorization: user.auth_str,
                            site_id: this.sitio_id
                        },
                        success: (uploadFileRes) => {
                            console.log(uploadFileRes);
                            if ("string" === typeof uploadFileRes.data) {
                                resolve(JSON.parse(uploadFileRes.data))
                            } else {
                                resolve(uploadFileRes.data.data)
                            }

                        },
                        complete() {
                            uni.hideLoading()
                        }
                    });
                })
            }
        }
    };
</script>
