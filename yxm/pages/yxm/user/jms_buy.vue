<template>
    <view class="full_screen" v-if="is_page_loaded">
        <div class="page__hd bb10 has-background-white" style="padding: 58px;">
            <h1 class="page__title" style="text-align: left;
    font-size: 20px;
    font-weight: 400;">总价格：￥ {{total_price}} 元 </h1>
            <p class="page__desc" style="margin-top: 4px;
    color: rgba(0,0,0,.5);
    text-align: left;
    font-size: 14px;">补货衣架 {{page_data.amount}} 个 , 价格 {{page_data.price}} / 个 , 您当前的余额 {{page_data.user.balance}} 元 ,本次支付优先使用账户余额!</p>
        </div>
        <div class="weui-cells__group weui-cells__group_form" v-if="page_data.user" >

            <div class="weui-cells weui-cells_form margined bra-radius-2 has-shadow">

                <div class="weui-cell weui-cell_disabled">

                    <div class="weui-cell__hd"><label class="weui-label">输入数量</label></div>
                    <div class="weui-cell__bd">
                        <bra_steper @updated="on_bra_form_val" :field_name="'amount'"></bra_steper>
                    </div>
                </div>
            </div>
        </div>
        <div class="weui-form__opr-area" style="margin-top:50px">
            <a @click="do_buy()" class="weui-btn weui-btn_primary" id="showTooltips"> 立刻补货</a>
        </div>
    </view>
</template>

<script>

    import bra_steper from '@/bra/forms/bra_steper.vue';
    import login from "../../user/login";

    export default {
        components: {
            bra_steper
        },
        data() {
            return {
                page_name: 'yxm_jms_buy',
                module: 'yxm',
                is_page_loaded: false,
                page_data: {},
                fucking_params: {
                    amount : 1
                },
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

                var params = this.fucking_params;

                return this.bra_common_page(this.module, this.page_name, params, true, (ret) => {
                    let page_data = ret.data.page_data;
                    console.log(page_data);
                    this.is_page_loaded = true;
                    uni.stopPullDownRefresh();
                    //

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
        } ,
        computed : {
            total_price : function () {
                if(!this.fucking_params.amount){
                    console.log(this.page_data.price , this.fucking_params.amount);
                    return '';
                }
                var  totel = parseFloat(this.page_data.price) * parseInt( this.fucking_params.amount);
                return totel.toFixed(2);
            }
        }
    }
</script>

<style>

</style>
