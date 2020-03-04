<template>
    <view class="full_screen" v-if="is_page_loaded">
        <div class="page__hd bb10 has-background-white" style="padding: 58px;">
            <h1 class="page__title" style="text-align: left;
    font-size: 20px;
    font-weight: 400;">总价格：￥ {{page_data.config.ly_2price}} 元 </h1>
            <p class="page__desc" style="margin-top: 4px;
    color: rgba(0,0,0,.5);
    text-align: left;
    font-size: 14px;">领养共享干衣架 1 台 , 您当前的余额 {{page_data.user.balance}} 元 , 本次支付优先使用账户余额!</p>
        </div>

        <div class="weui-form__opr-area" style="margin-top:50px">
            <a @click="do_buy()" class="weui-btn weui-btn_primary" id="showTooltips"> 立刻领养</a>
        </div>
    </view>
</template>

<script>

    import bra_level_picker from '@/bra/forms/bra_level_picker.vue';
    import bra_input from '@/bra/forms/bra_input.vue';

    export default {
        components: {
            bra_level_picker, bra_input
        },
        data() {
            return {
                page_name: 'yxm_lyy_buy',
                module: 'yxm',
                is_page_loaded: false,
                page_data: {},
                fucking_params: {},
                params: {}
            }
        },
        onShow() {

            this.checkLogin((data) => {
                if (data) {
                    if (!this.is_page_loaded) {

                        this.onMhcmsPull();
                    }
                }
            }, !this.is_page_loaded, true)


        },
        onPullDownRefresh() {
            this.onMhcmsPull();
            uni.stopPullDownRefresh();
        },
        methods: {

            on_bra_form_val: function (value) {
                this.on_form_val(value);
            },
            onMhcmsPull() {
                this.bra_common_page(this.module, this.page_name, {}, true, (data) => {
                    this.page_data = this.elements.page_data;
                    this.is_page_loaded = true;
                    uni.stopPullDownRefresh();
                });
            },


            do_buy: function () {
                uni.showLoading({
                    title: '请稍后',
                    mask : true
                });
                return this.bra_common_page(this.module, this.page_name, {}, true, (ret) => {
                    uni.hideLoading();
                    let page_data = ret.data.page_data;

                    if (page_data.code == 6) {
                        return this.get_app_pay_params(page_data.data.data.id, 'micropay', (orderInfo) => {
                            console.log(JSON.stringify(orderInfo));
                            uni.requestPayment({
                                provider: 'wxpay',
                                orderInfo: JSON.stringify(orderInfo),
                                success: (res) => {
                                    this.show_toast('支付成功');
                                    this.do_buy();
                                },
                                fail: (err) => {
                                    console.log('fail:' + JSON.stringify(err));
                                    this.show_toast('支付失败');
                                }
                            });
                        })
                    }

                    if (page_data.code == 1) {

                        this.show_toast(page_data.msg);
                        this.onNav({
                            url: '/pages/yxm/user/index', type: 'redirect'
                        });
                    } else {
                        this.show_toast(page_data.msg);
                    }

                }, 'post', false);

            },
        }
    }
</script>

<style>

</style>
