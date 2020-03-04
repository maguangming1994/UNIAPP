<template>
    <div class="full_screen is-clipped">

        <!--  #ifdef  APP-PLUS		 -->
        <view @click="wx_login">

            <div class="weui-form__opr-area" style="margin-top:150px">
                <a class="weui-btn weui-btn_primary "> <i class="iconfont icon-wechat"
                                                          style="display:inline-block;margin-right:10px"></i> 微信登录</a>
            </div>

        </view>
        <!--  #endif -->

        <view class="page-body">

            <!--  #ifdef  MP-WEIXIN	 -->
            <button @click="bindgetuserinfo" class="btn-reset third_login has-text-centered" open-type="getUserInfo"
                    style="margin-top: 250upx;color: #fff" v-if="show_weixin">

                <i class="iconfont icon-wechat" style="font-size:90upx"></i>
                <view class="  f32">微信登录</view>
            </button>
            <!--  #endif -->

        </view>

        <div class="weui-form__tips-area">
            <p class="weui-form__tips">
                登录即表示<a href="javascript:">同意用户协议</a>
            </p>
        </div>
    </div>
</template>

<script>
    const app = getApp();

    export default {
        data() {
            return {}
        },
        onLoad() {
            uni.getProvider({
                service: 'push',
                success: (res) => {
                    if (~res.provider.indexOf('unipush')) {
                        uni.subscribePush({
                            provider: 'unipush',
                            success: function (res) {
                                console.log(res);
                                uni.setStorageSync('bra_push', res);
                                console.log('success:' + JSON.stringify(res));
                            }
                        });
                    }
                }
            });
        },
        onShow() {

            let push = uni.getStorageSync('bra_push');
            console.log(push)

        },


        methods: {
            wx_login: function () {
                var root = this;
                uni.login({
                    provider: 'weixin',
                    success: (loginRes) => {
                        uni.getUserInfo({
                            provider: 'weixin',
                            success: (infoRes) => {
                                console.log(infoRes);

                                console.log(JSON.stringify(loginRes));
                                wx.setStorageSync('wexin_connect', loginRes.authResult);
                                let $params = loginRes.authResult;

                                $params.nickname = infoRes.userInfo.nickName;
                                $params.avatar = infoRes.userInfo.avatarUrl;
                                let action = root.bra_service('bra_app', 'connect_weixin_user', true);
                                let promise = root.fetch(action, $params);
                                promise.then((resp) => {
                                    console.log(resp)
                                    this.show_toast(resp.msg);
                                    return this.onNav({
                                        url: '/pages/hotel/index/index', type: 'switch'
                                    });
                                }, err => {
                                    console.log(err)
                                    this.show_toast(err.msg);
                                })
                            }
                        });

                    }
                });
            }
        }
    }
</script>

<style lang="scss">
    .passport_page {
        color: #fff;

        .mhcms-top-nav-bar {
            font-size: 28 upx;
            padding: 0 60 upx;
        }

        .page-body {
            padding: 150 upx 60 upx 30 upx;

            .page-title-txt {

                margin-bottom: 45 upx;
            }

            .page-action {

                .uni-form-item {
                    padding: 30 upx 0;
                    border-bottom: solid 2px #fff;
                    text-align: center;
                }

            }


            .btn {
                color: #ff7853;
                height: 100 upx;
                line-height: 100 upx;
                border-radius: 4 upx;
                margin-top: 30 upx;
            }

            .form-label {
                font-size: 30 upx;
            }
        }

        .mhcms-bottom-nav-bar {
            position: absolute;
            bottom: 0;
            font-size: 26 upx;
            width: 100%;
            text-align: center;
            line-height: 80 upx;
            font-weight: 300;
            left: 0;
        }
    }

    .input-placeholder {
        color: #fafafa;
    }
</style>
