<style lang="scss">

    .share_panel {
        position: fixed;
        bottom: 0;
        width: 100%;
        z-index: 999;
        text-align: center;
        background: #e9edf2;

        .columns {
            padding: 53upx;
        }

        .img1 {
            display: block;
            height: 64upx;
            width: 74upx;
            margin: auto;
            margin-bottom: 21upx;
        }

        .img2 {
            display: block;
            height: 64upx;
            width: 64upx;
            margin: auto;
            margin-bottom: 21upx;
        }

        .cancel {
            background: #fff;
            line-height: 108upx;
        }
    }

    .bra-user-top-full{
        .fake_box{
            background: rgb(131,58,180);
            background: linear-gradient(127deg, #a18cd1 0%,#c09fda 50%, #fbc2eb 100%);
            min-height:150px;
        }


        .bra-user-top-box{
            background:#fff;
            MARGIN: -78PX 10PX 20px 10PX;
            MIN-HEIGHT: 188PX;
            border-radius:5px;

            .avatar{
                width: 50px;display: block;height:50px;margin:auto;background:#fbc2eb;margin-bottom:10px;
            }
        }
    }
    .types .iconfont{
        font-size:28px;
    }
</style>

<template>
    <view class="full_screen">


        <view  v-if="!is_page_loaded" class="bra_mask zindex_1100"  style="background:transparent" @click="onNav"
               data-url="/pages/user/login"></view>

        <div class="bra-user-top bra-user-top-full" style="margin-top:0">
            <view class="fake_box">

                <i class="column iconfont is-narrow icon-mzicon-setting is-absolute" style="top:30px;right:30px" @click="onNav" data-url="/pages/user/setting"></i>
            </view>
            <div  class="bra-user-top-box" v-if="page_data &&page_data.user">
                <div class="has-text-centered" style="position: relative;top: -26px;">

                    <div class="avatar image  img-rounded" style="width: 50px;display: block;height:50px">
                        <img :src="page_data.user.avatar" class="img-rounded has-shadow" style="width: 50px;display: block;height:50px" >
                    </div>
                    <div class="weui-cell__bd f14" @click="onNav" data-url="/pages/user/bind_wechat">
                        <p>{{page_data.user.nickname || '获取微信昵称'}} </p>
                        <p style="font-size: 13px;color: #888888;">账号:{{page_data.user.user_name}} </p>
                    </div>

                    <div v-if="page_data.parent" class="weui-cell__bd f14" @click="onNav" data-url="/pages/user/bind_wechat">
                        <p style="font-size: 13px;color: #888888;">上级:{{page_data.parent.mobile}} </p>
                    </div>
                </div>

                <div class="has-text-centered f14" style="margin-top: -10px;margin-bottom:12px">
                    <span v-if="page_data.lyy" class="bra-btn mini is-inline-block orange"
                          style="border-radius:3px">Lv{{page_data.lyy.old_data.level_id}}
                        {{page_data.lyy.area_id}} - {{page_data.lyy.level_id}}</span>
                    <span v-if="!page_data.lyy" class="bra-btn mini is-inline-block grey" style="border-radius:3px">
                        普通用户</span>
                </div>


                <div class="columns is-mobile is-marginless f12 has-text-centered" @click="onNav" data-url="/pages/hotel/user/my_coupon">
                    <div class="column"> <div>{{page_data.user.balance}}</div> 余额 </div>
                    <div class="column"> <div>{{page_data.user.point}}</div>积分</div>
                    <div class="column"> <div> {{page_data.coupon_amount}} </div>优惠卷</div>
                </div>
            </div>

            <div class="bra-user-top-box" v-if="!page_data || !page_data.user"  @click="onNav"
                 data-url="/pages/user/login">
                <div class="has-text-centered" style="position: relative;top: -26px;">
                    <div class="avatar image  img-rounded">
                        <img class="img-rounded has-shadow"  style="width: 50px;display: block;height:50px"  >
                    </div>
                    <div class="weui-cell__bd f14" >
                        <p> 点击登录 / 注册</p>
                        <p style="font-size: 13px;color: #888888;"></p>
                    </div>
                </div>

            </div>
        </div>

        <!--  swiper  -->
        <view class="margined-h is-clipped bra-radius-2">

            <swiper :autoplay="autoplay" :duration="duration" :indicator-dots="indicatorDots" :interval="interval"
                    class="swiper" style="width: 750upx;margin: 0 auto;height: 180upx">
                <swiper-item :data-url="item.link_web" @click="onNav"
                             v-for="(item , index) in page_data.ads" wx:key="test">
                    <image :src="item.image[0].url"  mode="aspectFill" style="width:100vw;height:180upx"></image>
                </swiper-item>

            </swiper>
        </view>
        <div class="has-background-white types bra-radius-2 is-clipped has-text-centered f14 padded"
             style="margin:10px">
            <div class="columns is-mobile is-marginless">
                <div class="column" @click="onNav" data-url="/pages/hotel/user/my_orders">
                    <i class="iconfont icon-danju"></i>
                    <div>全部订单</div>
                </div>
                <div class="column" @click="onNav" data-url="/pages/hotel/user/my_orders?status=1">
                    <i class="iconfont icon-daifukuandingdan"></i>
                    <div>待付款</div>
                </div>
                <div class="column" @click="onNav" data-url="/pages/hotel/user/my_orders?status=3">
                    <i class="iconfont icon-order-find"></i>
                    <div>进行中</div>
                </div>
                <div class="column" @click="onNav" data-url="/pages/hotel/user/my_orders?status=99">
                    <i class="iconfont icon-iconfontzhizuobiaozhun0261"></i>
                    <div>已完成</div>
                </div>
            </div>
        </div>
        <div class="weui-cells braui-cells bra-radius-2 is-clipped" style="margin:0 10px">
            <!-- all -->
            <div @click="onNav" class="weui-cell weui-cell_access braui-cell" data-url="/pages/wallet/wallet_idx">
                <div class="weui-cell__hd">
                    <i class="icon-yue iconfont has-text-warning"></i>
                </div>
                <div class="weui-cell__bd">
                    <p>我的资产</p>
                </div>
                <div class="weui-cell__ft">管理您的资产</div>
            </div>

            <div @click="onNav" v-if="!page_data.union" class="weui-cell weui-cell_access braui-cell"
                 data-url="/pages/user/bind_wechat">
                <div class="weui-cell__hd">
                    <i class="iconfont icon-weixin1 has-text-success"></i>
                </div>
                <div class="weui-cell__bd">
                    <p>绑定微信</p>
                </div>
                <div class="weui-cell__ft">微信登录!</div>
            </div>
            <div @click="unbindWechat" v-if="page_data.union" class="weui-cell weui-cell_access braui-cell">
                <div class="weui-cell__hd">
                    <i class="iconfont icon-weixin1 has-text-success"></i>
                </div>
                <div class="weui-cell__bd">
                    <p>解除绑定微信</p>
                </div>
                <div class="weui-cell__ft">解除微信绑定!</div>
            </div>

        <!-- 酒店面板 -->
            <!-- all -->
            <div v-if="!page_data.store" @click="onNav" class="weui-cell weui-cell_access braui-cell"
                 data-url="/pages/hotel/user/store_join">
                <div class="weui-cell__hd">
                    <i class="iconfont icon-fuhao-yuyue"></i>
                </div>
                <div class="weui-cell__bd">
                    <p>酒店入驻</p>
                </div>
                <div class="weui-cell__ft"></div>
            </div>


            <!-- 库存管理 -->
            <div @click="logout" class="weui-cell weui-cell_access braui-cell" >
                <div class="weui-cell__hd"><i class="icon-shirenrenzheng iconfont"></i></div>
                <div class="weui-cell__bd">
                    <p>注销登录</p>
                </div>
                <div class="weui-cell__ft"></div>
            </div>

        </div>
            <!-- show_share -->
        <view class="share_panel zindex100" v-show="show_share">
            <div class="bra_mask zindex100"></div>
            <div class="columns is-mobile is-marginless padding is-relative zindex200 has-background-white has-shadow ">

                <!--  #ifdef  MP-WEIXIN	 -->
                <button class="column" openType="share" style="background:none;">
                    <img src="/static/weixin.png"> 微信
                </button>
                <view @click="onShare" class="column">
                    <img src="/static/quan.png"> 朋友圈
                </view>

                <!--  #endif -->

                <!--  #ifdef  APP-PLUS		 -->
                <view @click="share_friend" class="column">
                    <img class="img img1" src="/static/img/weixin.png"> 微信
                </view>
                <view @click="onShare" class="column">
                    <img class="img img1" src="/static/img/quan.png"> 朋友圈
                </view>

                <!--  #endif -->
            </div>
            <view @click="show_share = false" class="cancel  is-relative zindex200">取消</view>
        </view>
    </view>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        data() {
            return {
                page_name: 'hotel_user_index',
                module: 'hotel',
                is_page_loaded: false,
                page_data: {
                    user : false
                },
                show_share: false
            }
        },
        onLoad() {

        },
        onShow() {

            let user = uni.getStorageSync("user") || false;
            console.log('show' , user , this.is_page_loaded);

            if(!user || !this.is_page_loaded){
                this.onMhcmsPull();
            }


        },
        onPullDownRefresh() {
            this.onMhcmsPull();
            uni.stopPullDownRefresh();
        },
        methods: {
            onMhcmsPull() {
                let params = {};
                this.bra_common_page(this.module, this.page_name, params, true, (data) => {
                    console.log(data)
                    if(data.code && data.code== 3){
                        return this.logout();
                    }
                    if(this.elements.page_data){
                        this.page_data = this.elements.page_data;
                    }

                    if(this.page_data && this.page_data.user){
                        this.is_page_loaded = true;
                    }else{
                        this.is_page_loaded = false;
                        this.logout();
                    }
                    uni.stopPullDownRefresh();
                });
            },
            onShare: function () {
                this.show_share = false;
                uni.share({
                    provider: "weixin",
                    scene: "WXSenceTimeline",
                    type: 0,
                    title: "衣小幂 - 共享衣架专家",
                    imageUrl: "http://img.c88.in/annex/1/20191014/f87d1bd3d82e7bb6a650953f3d36e085.jpg",
                    href: this.bra_web('bra_app', 'index', 'share_install', {
                        refer: this.page_data.user.id,
                        appid: this.app_id
                    }),
                    summary: "无尽商机等你来了发现, 点击加入我们!",
                    success: (res) => {
                        console.log("success:" + JSON.stringify(res));
                        this.toast('分享成功');
                        //this.add_share_trace(this.id, 'house_esf', 'house');
                    },
                    fail: (err) => {
                        console.log("fail:" + JSON.stringify(err));
                    }
                });
            },

            share_friend: function () {

                this.show_share = false;
                uni.share({
                    provider: "weixin",
                    href: this.bra_web('bra_app', 'index', 'share_install', {
                        refer: this.page_data.user.id,
                        appid: this.app_id
                    }),
                    scene: "WXSceneSession",
                    title: "衣小幂 - 共享衣架专家",
                    imageUrl: "http://img.c88.in/annex/1/20191014/f87d1bd3d82e7bb6a650953f3d36e085.jpg",
                    summary: "无尽商机等你来了发现, 点击加入我们!",
                    type: 0,
                    success: (res) => {
                        console.log("success:" + JSON.stringify(res));
                        this.show_toast('分享成功');
                        //this.add_share_trace(this.id, 'house_loupan', 'house');
                    },
                    fail: (err) => {
                        console.log("fail:" + JSON.stringify(err));
                    }
                });
            } ,
            logout : function () {
                try {
                    uni.removeStorageSync('user');
                    uni.clearStorage();
                } catch (e) {
                    // error
                }
                this.is_page_loaded = false;
                this.page_data.user = false;
                this.$store.commit('change_login', false);
            } ,

            unbindWechat : function () {
                uni.showModal({
                    title: '提示',
                    content: '您确定要解除绑定微信吗?' ,
                    success :  (res) => {
                        if (res.confirm) {
                            let params = {};
                            this.bra_common_page('bra_app', 'unbind_wechat', params, true, (data) => {
                                console.log(data)
                                this.onMhcmsPull();
                            } , 'post' , false);
                        }

                    }
                });

            }
        },
        computed: {
            ...mapState(['is_lyy' , 'is_jms' , 'is_login'])
        },
        watch: {
            is_lyy: function () {
                this.onMhcmsPull();
            } ,
            is_jms: function () {
                this.onMhcmsPull();
            },
            is_login: function () {
                this.onMhcmsPull();
            }
        }
    }
</script>