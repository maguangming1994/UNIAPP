<template>
    <view class="full_screen is-clipped">

        <div v-if="page_data.user" class="weui-form__control-area has-background-white has-shadow"
             style="padding-bottom: 15px;margin:15px">

            <div class=" bra-for-header is-flex weui-cell weui-cell_disabled" style="background-color:#f5f5f5">

                <div class="weui-cells__title">充值</div>

            </div>

            <div class="weui-cells__group weui-cells__group_form">

                <div class="weui-cells__title">输入充值金额</div>
                <div class="weui-cells weui-cells_form">

                    <div class="weui-cell weui-cell_disabled">
                        <div class="weui-cell__hd"><label class="weui-label" style="width:auto">￥</label></div>
                        <div class="weui-cell__bd">

                            <bra_input :field_name="'amount'" :mini_type_prop="'number'" :placeholder="'请输入充值金额'"
                                       @updated="on_bra_form_val" ref="amount"></bra_input>
                        </div>
                    </div>

                </div>
            </div>

            <div class="weui-form__opr-area" style="margin:30px 15px 10px">
                <a @click="do_withdraw" class="weui-btn weui-btn_primary" :class="{'weui-btn_disabled' : amount <=0 ||
                amount == ''}"
                >确定
                </a>
            </div>

        </div>



    </view>
</template>

<script>

    import bra_input from '@/bra/forms/bra_input.vue';

    export default {
        components: {
            bra_input
        },
        data() {
            return {
                page_name: 'bra_wallet_deposit',
                module: 'bra',
                is_page_loaded: false,
                page_data: {},
                fucking_params: {},
                params: {} ,
                show_action_sheet : false ,
                selected_card : {} ,
                amount : '',
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
            on_bra_form_val: function (i) {
                this.amount = parseFloat(i[1]) ;
                console.log(this.amount)
            },
            do_withdraw : function(){
                let params = {};
                params.amount  =this.amount;
                params.card_id  =this.selected_card.id;
                if(!params.amount || params.amount<=0){
                    return this.show_toast('请输入正确的金额');
                }

                this.bra_common_page(this.module, this.page_name, params, true, (data) => {
                    var page_data = data.data.page_data;

                    console.log(page_data)
                    return this.get_app_pay_params(page_data.data.id, 'micropay', (orderInfo) => {
                        console.log(orderInfo);
                        uni.requestPayment({
                            provider: 'wxpay',
                            orderInfo: JSON.stringify(orderInfo),
                            success: (res) => {
                                this.show_toast('支付完成');
                                this.onBack();
                                console.log('success:' + JSON.stringify(res));
                            },
                            fail: (err) => {
                                console.log('fail:' + JSON.stringify(err));

                                this.show_toast('支付失败！');
                            }
                        });

                    });
                } , 'post' , false , true) ;
            },
            onMhcmsPull() {
                this.bra_common_page(this.module, this.page_name, {}, true, (data) => {
                    this.page_data = this.elements.page_data;
                    this.is_page_loaded = true;
                    uni.stopPullDownRefresh();
                });
            },
        }
    }
</script>

<style>
    .weui-cells__group_form .weui-cells:before, .weui-cells__group_form .weui-cell:before{
        top:10000px
    }
</style>
