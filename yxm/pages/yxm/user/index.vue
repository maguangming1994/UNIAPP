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
            height: 74upx;
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
            MIN-HEIGHT: 158PX;
            border-radius:5px;

            .avatar{
                width: 50px;display: block;height:50px;margin:auto;background:#fbc2eb;margin-bottom:10px;
            }
        }
    }
</style>

<template>
    <view class="full_screen">

        <view  v-if="!is_page_loaded" class="bra_mask zindex_1100"  style="background:transparent" @click="onNav"
               data-url="/pages/user/login"></view>

        <div class="bra-user-top bra-user-top-full" style="margin-top:0">
            <view class="fake_box">
                <i class="iconfont weui-icon-back is-absolute" style="color:#f3f3f3;top:30px;left:30upx" @click="onBack" ></i>
            </view>

            <div  class="bra-user-top-box" v-if="page_data &&page_data.user">
                <div class="has-text-centered" style="position: relative;top: -26px;">

                    <div class="avatar image  img-rounded" style="width: 50px;display: block;height:50px">
                        <img :src="page_data.user.avatar" class="img-rounded has-shadow" style="width: 50px;display: block;height:50px" >
                    </div>
                    <div class="weui-cell__bd f14" @click="onNav" data-url="/pages/user/bind_wechat">
                        <p>{{page_data.user.nickname || '获取微信昵称'}}</p>
                        <p style="font-size: 13px;color: #888888;"></p>
                    </div>
                </div>

                <div class="has-text-centered f14" style="margin-top: -10px;margin-bottom:12px">
                    <span v-if="page_data.lyy" class="bra-btn mini is-inline-block orange"
                          style="border-radius:3px">Lv{{page_data.lyy.old_data.level_id}}
                        {{page_data.lyy.area_id}} - {{page_data.lyy.level_id}}</span>
                    <span v-if="!page_data.lyy" class="bra-btn mini is-inline-block grey" style="border-radius:3px">
                        普通用户</span>
                </div>

                <div class="columns is-mobile is-marginless f12 has-text-centered">
                    <div class="column">
                        <div>{{page_data.user.balance}}</div>
                        我的资产
                    </div>
                    <div class="column"> <div>{{page_data.team_count}}</div>我的团队</div>
                    <div class="column"> <div>{{page_data.yj_amount}}</div>我的衣架</div>
                    <div class="column"> <div>{{page_data.total_profit}}</div>我的收益</div>
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

            <div @click="show_share = true" class="weui-cell weui-cell_access braui-cell"
                 data-url="/pages/user/bind_wechat">
                <div class="weui-cell__hd">
                    <i class="iconfont icon-fenxiang1 has-text-success"></i>
                </div>
                <div class="weui-cell__bd">
                    <p>推荐衣小幂</p>
                </div>
                <div class="weui-cell__ft">共享收益</div>
            </div>
            <!-- 酒店面板 -->
            <!-- 管理员面板 -->
            <div @click="onNav" class="weui-cell weui-cell_access braui-cell" data-url="/pages/yxm/user/my_team"
                 v-if="page_data.lyy">
                <div class="weui-cell__hd"><i class="icon-fenxiang iconfont has-text-info"></i></div>
                <div class="weui-cell__bd">
                    <p>我的团队</p>
                </div>
                <div class="weui-cell__ft">管理您的团队</div>
            </div>
            <!-- 申请管理员 -->
            <div @click="onNav" class="weui-cell weui-cell_access braui-cell" data-url="/pages/yxm/user/apply"
                 v-if="!page_data.lyy">
                <div class="weui-cell__hd"><i class="icon-tuijieqianyue iconfont has-text-info"></i></div>
                <div class="weui-cell__bd">
                    <p>领养小幂</p>
                </div>
                <div class="weui-cell__ft">领养后成为管理员</div>
            </div>

            <!-- 衣架管理 -->
            <div @click="onNav" class="weui-cell weui-cell_access braui-cell" data-url="/pages/yxm/user/lyy_idx"
                 v-if="page_data.lyy">
                <div class="weui-cell__hd">
                    <i class="icon-weibiaoti- iconfont has-text-success"></i>
                </div>
                <div class="weui-cell__bd">
                    <p>小幂仓库</p>
                </div>
                <div class="weui-cell__ft">领养管理衣架</div>
            </div>

            <!-- 领养衣架 -->
            <div @click="onNav" class="weui-cell weui-cell_access braui-cell" data-url="/pages/yxm/user/my_profit"
                 v-if="page_data.lyy">
                <div class="weui-cell__hd"><i class="icon-zhuanqian iconfont has-text-danger"></i></div>
                <div class="weui-cell__bd">
                    <p>小幂收益</p>
                </div>
                <div class="weui-cell__ft">查看收益</div>
            </div>


            <!-- 加盟商面板 -->

            <!-- 库存管理 -->
            <div @click="onNav" class="weui-cell weui-cell_access braui-cell" data-url="/pages/yxm/user/jms_idx"
                 v-if="page_data.jms">
                <div class="weui-cell__hd"><i class="icon-tablicai iconfont"></i></div>
                <div class="weui-cell__bd">
                    <p>合伙人中心</p>
                </div>
                <div class="weui-cell__ft">进入合伙人中心</div>
            </div>

            <!-- 库存管理 -->
            <div @click="onNav" class="weui-cell weui-cell_access braui-cell" data-url="/pages/yxm/user/jms_upgrade"
                 v-if="!page_data.jms">
                <div class="weui-cell__hd">
                    <i class="icon-renwu-tuandui iconfont"></i>
                </div>
                <div class="weui-cell__bd">
                    <p>升级合伙人</p>
                </div>
                <div class="weui-cell__ft">合伙人招募</div>
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

                <view @click="onNav" data-url="/pages/yxm/user/my_poster" class="column">
                    <img class="img img1" src="/static/img/hb.png"> 海报
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
                page_name: 'yxm_user_index',
                module: 'yxm',
                is_page_loaded: false,
                page_data: {
                    user : false
                },
                show_share: false
            }
        },
        onLoad() {
            console.log(this.site_info)
        },
        onShow() {

            let user = uni.getStorageSync("user") || false;
            console.log('show' , user , this.is_page_loaded)

            if(!user || !this.is_page_loaded){
                this.onMhcmsPull();
            }

            console.log(this.site_info)

        },
        onPullDownRefresh() {
            this.onMhcmsPull();
            uni.stopPullDownRefresh();
        },
        methods: {
            onMhcmsPull() {
                let params = {};
                params.limit = 10;
                if (this.city_id > 0) {
                    params.area_id = this.city_id;
                }
                this.bra_common_page(this.module, this.page_name, params, true, (data) => {
                    this.page_data = this.elements.page_data;
                    if(this.page_data && this.page_data.user){
                        this.is_page_loaded = true;
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
                    title: "衣小幂-您的贴身衣管家",
                    imageUrl: "http://yxm.fc5.ltd/annex/1/20200130/ceaf50dc733f32213cc3d4d9dd2e7df3.png",
                    href: this.bra_web('bra_app', 'index', 'share_install', {
                        refer: this.page_data.user.id,
                        appid: this.site_info.bra_app_id
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
                        appid: this.site_info.bra_app_id
                    }),
                    scene: "WXSceneSession",
                    title: "衣小幂-您的贴身衣管家",
                    imageUrl: "http://yxm.fc5.ltd/annex/1/20200130/ceaf50dc733f32213cc3d4d9dd2e7df3.png",
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
                uni.setStorageSync('user' , null);
                this.is_page_loaded = false;
                this.page_data.user = false;
                this.onMhcmsPull();
            }
        },
        computed: {
            ...mapState(['is_lyy' , 'is_jms'])
        },
        watch: {
            is_lyy: function () {
                this.onMhcmsPull();
            } ,
            is_jms: function () {
                this.onMhcmsPull();
            }
        }
    }
</script>