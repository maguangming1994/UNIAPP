<template>
    <div class="full_screen" style="overflow:hidden;height:auto;background:#fff">


        <div class="weui-form__control-area">
            <div class="weui-cells__group weui-cells__group_form">
                <div class="weui-cells weui-cells_form">
                    <div class="weui-cell">
                        <div class="weui-cell__hd"><label class="weui-label">手机号</label></div>
                        <div class="weui-cell__bd">
                            <input class="weui-input" v-model="mobile_number" type="number" pattern="[0-9]*" placeholder="请输入手机号" value="12345678907">
                        </div>
                        <div class="weui-cell__ft">
                            <i class="weui-btn_reset weui-btn_icon">
                                <i id="showIOSDialog1" class="weui-icon-info-circle"></i>
                            </i>
                        </div>
                    </div>
                    <div class="weui-cell weui-cell_vcode">
                        <div class="weui-cell__hd"><label class="weui-label">验证码</label></div>
                        <div class="weui-cell__bd">
                            <input v-model="code" class="weui-input" type="number" pattern="[0-9]*" id="js_input" placeholder="输入验证码" maxlength="6">
                        </div>
                        <div class="weui-cell__ft">
                            <span  @click="send_verify_code" class="weui-btn weui-btn_default weui-vcode-btn">{{btn_txt}}</span>
                        </div>
                    </div>
                    <div class="weui-cell">
                        <div class="weui-cell__hd"><label class="weui-label">推荐人</label></div>
                        <div class="weui-cell__bd">
                            <input class="weui-input" v-model="mobile_refer" type="number" pattern="[0-9]*" placeholder="请输入推荐人手机号" value="12345678907">
                        </div>
                        <div class="weui-cell__ft f16">
                            选填
                        </div>
                    </div>
                    <div class="weui-cell" for="s11">
                        <div class="weui-cell__hd" style="color:#4cd964">
                            <span class="weui-icon-checked has-text-centered" style="border-radius:50%">
							<i class="iconfont icon-wanchengzhijiao has-text-white"></i>
						</span>
                        </div>
                        <div class="weui-cell__bd">
                            <p>同意用户协议</p>
                        </div>
                        <div class="weui-cell__ft f18" @click="onNav" :data-url="'/pages/bra/common/reg_term'">
                            点击阅读
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="weui-form__opr-area" style="margin-bottom:120px">
            <a @click="verify_code()" class="weui-btn weui-btn_primary " href="javascript:" id="showTooltips">确定</a>
        </div>



        <div class="weui-form__tips-area">
            <p class="weui-form__tips">  已有账号? <span class="has-text-link padded-h" @click="onNav" :data-url="'/pages/user/login'">点击此处登陆</span>
            </p>
        </div>


        <div class="page__bd">

            <div class="weui-loadmore weui-loadmore_line">
                <span class="weui-loadmore__tips">其他方式登录</span>
            </div>

        </div>
        <view  v-if="show_weixin" style="width:65%;margin:auto">

            <div class="is-mobile columns is-marginless" >

                <div class="column is-4">
                    <a class="bra-btn round normal"  @click="wx_login">
                        <i style="display:inline-block;" class="iconfont icon-wechat" ></i>
                    </a>
                </div>

            </div>


        </view>

    </div>
</template>

<script>
    const app = getApp();

    export default {
        data() {
            return {
                count: 60,
                mobile_number: '',
                mobile_refer: '',
                token: '',
                btn_txt: '获取验证码',
                show_weixin: true ,
                code : ''
            };
        },
        onLoad() {

            uni.setStorageSync('wexin_connect', false);
        },
        onShow() {
            let wexin_connect = uni.getStorageSync('wexin_connect');
            if (wexin_connect.openid) {
                //   this.show_weixin = false;
            }
        },


        methods: {
            wx_login: function () {
                uni.login({
                    provider: 'weixin',
                    success: (loginRes) => {
                        console.log(JSON.stringify(loginRes));
                        wx.setStorageSync('wexin_connect', loginRes.authResult);
                        let $params = loginRes.authResult;
                        let action = this.bra_service('bra_app', 'connect_weixin_user');
                        let promise = this.fetch(action, $params);
                        promise.then((data) => {
                            console.log(data)
                            this.log_user_in(data.user, data => {
                                return this.onNav({
                                    url: '/pages/hotel/index/index', type: 'switch'
                                });
                            })
                        }, err => {
                            console.log(err)
                            this.show_toast('您还没有绑定注册账号 请先注册账号!');
                            //this.show_weixin = false;
                        })
                    }
                });
            },

            recount: function () {
                var that = this;
                if (that.count > 0) {
                    setTimeout(function () {
                        that.count--;
                        that.recount()
                    }, 1000);
                    this.btn_txt = that.count;
                } else {
                    that.count = 60;
                    this.btn_txt = "获取验证码";
                }
            },
            send_sms: function (mobile) {
                let action = this.bra_service('bra', 'send_reg_verify_code');
                var that = this;
                let params = {mobile: that.mobile_number};
                params.is_mixed = 2;
                let promise = this.fetch(action, params , 'post');
                promise.then((data) => {
                    uni.showToast({
                        icon: "none",
                        title: '已经发送',
                        duration: 2000
                    });
                    this.recount();
                }, error => {
                    setTimeout(function () {
                        uni.showToast({
                            icon: "none",
                            title: error.msg,
                            duration: 2000
                        });
                    } , 100);

                })
            },
            send_verify_code() {
                this.send_sms(this.mobile_number);
            } ,

            verify_code() {
                if(this.code.length < 4){
                    return uni.showToast({
                        icon : "none",
                        title:  '请输入正确的验证码',
                        duration: 2000
                    });
                }
                let action = this.bra_service('bra', 'verify_login_code');
                var that = this;
                let promise = this.fetch(action, {mobile: that.mobile_number , code : this.code , mobile_refer : this.mobile_refer});
                promise.then(res => {
                    let data = res.data;
                    if(data.user){
                        this.log_user_in(data.user , () =>{
                            console.log(data);

                            this.$store.commit('change_login', true);
                            this.onNav({
                                url : '/pages/hotel/index/index', type : 'switch'
                            });
                        });
                    }else{
                        uni.showToast({
                            icon : "none",
                            title:  data.msg || '系统错误',
                            duration: 2000
                        });
                    }

                    console.log(data);
                } , error => {
                    uni.showToast({
                        icon : "none",
                        title:  error.msg || '系统错误',
                        duration: 2000
                    });
                })
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
