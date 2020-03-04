<style>
    .weui-cell {
        padding: 30upx;
    }

    .weui-label{
        width:80px;
    }
    .send_btn {
        background: #e9edf2;
        border-radius: 10upx;
        padding: 16upx 36upx;
        text-align: center;
        font-size: 28upx;
    }
</style>
<template>
    <view v-if="is_page_loaded">
        <view class=" bb10"></view>
        <div class="weui-cells weui-cells_form bb10" v-if="page_data.user.id">
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">手机号码</label></div>
                <div class="weui-cell__bd">
                    {{page_data.user.mobile[0]}}{{page_data.user.mobile[1]}}{{page_data.user.mobile[2]}}****{{page_data.user.mobile[8]}}{{page_data.user.mobile[9]}}{{page_data.user.mobile[10]}}
                </div>
            </div>
        </div>

        <div class="weui-cells weui-cells_form bb10">
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">验证码</label></div>
                <div class="weui-cell__bd">

                    <input placeholder="请输入验证码" v-model="code"></input>
                </div>
                <div class="weui-cell__bd">
                    <view class="send_btn" @click="send_verify_code">{{btn_txt}}</view>
                </div>

            </div>
        </div>
        <div class="weui-cells weui-cells_form bb10">
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">新密码</label></div>
                <div class="weui-cell__bd">
                    <input v-model="pass" type="password" placeholder="请输入新密码"></input>
                </div>
            </div>
        </div>
        <div class="weui-btn-area">
            <div @click="update_field" class="bra-btn orange is-block normal bra-radius-5 f18" id="showTooltips">保存</div>
        </div>

    </view>
</template>


<script>

    const app = getApp();
    export default {
        components: {
        },
        data() {
            return {
                count: 60,
                mobile_number: '',
                token: '',
                btn_txt: '获取验证码',
                show_weixin: true ,
                code : '' ,
                module : 'bra' ,
                page_name : 'bra_user_chang_password' ,
                is_page_loaded : false ,
                page_data : {} ,
                pass : ''
            };
        },
        onLoad() {
        },
        onShow() {
            this.onMhcmsPull();
        },

        methods: {
            onMhcmsPull: function () {
                let params = {};
                this.bra_common_page(this.module, this.page_name, params, true, (data) => {
                    console.log(data);
                    this.page_data = this.elements.page_data;
                    if(this.page_data && this.page_data.user){
                        this.is_page_loaded = true;
                        this.mobile_number = this.page_data.user.mobile;
                    }
                    uni.stopPullDownRefresh();
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
                let action = this.bra_service('bra', 'send_login_verify_code');
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
            update_field : function () {
                if(this.code.length < 4){
                    return uni.showToast({
                        icon : "none",
                        title:  '请输入正确的验证码',
                        duration: 2000
                    });
                }

                let params = {};
                params.pass = this.pass;
                params.code = this.code;
                this.bra_common_page(this.module, this.page_name, params, true, (data) => {
                    console.log(data);
                    var page_data = data.data.page_data;
                    this.show_toast(page_data.msg);
                    if(page_data.code == 1){
                        this.$store.commit('change_login', false);
                        this.onNav({
                            url : '/pages/hotel/user/index' ,
                            type: 'switch'
                        });
                    }

                    uni.stopPullDownRefresh();
                } , 'post' , false);
            }
        }
    }
</script>