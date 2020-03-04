<template>
    <view class="full_screen is-clipped">

        <div v-if="page_data.user" class="weui-form__control-area has-background-white has-shadow"
             style="padding-bottom: 15px;margin:15px">

            <div class=" bra-for-header is-flex weui-cell weui-cell_disabled" style="background-color:#f5f5f5">

                <div class="weui-cells__title">到银行卡</div>

                <div class="weui-cells__title" v-if="selected_card.id" @click="show_action_sheet = true">
                    {{selected_card.real_name}} {{selected_card.bank_id}}
                </div>
            </div>

            <div class="weui-cells__group weui-cells__group_form">

                <div class="weui-cells__title">输入提现金额</div>
                <div class="weui-cells weui-cells_form">

                    <div class="weui-cell weui-cell_disabled">
                        <div class="weui-cell__hd"><label class="weui-label" style="width:auto">￥</label></div>
                        <div class="weui-cell__bd">

                            <bra_input :field_name="'amount'" :mini_type_prop="'number'" :placeholder="'请输入提现金额'"
                                       @updated="on_bra_form_val" ref="amount"></bra_input>
                        </div>
                    </div>

                </div>
            </div>

            <div class="weui-cells__title" style="font-size:12px">当前钱包余额{{page_data.user.balance}}元, <span
                    class="has-text-grey-dark" style="padding-left:15px" @click="$refs.amount.value=page_data.user.balance">全部提现 , 本次提现提现服务费费率 {{page_data.wallet.drawfee}}
                <span v-if="page_data.wallet.drawfee_way==1">%</span>
                <span v-if="page_data.wallet.drawfee_way==2">元</span>
            </span>
            </div>
            <div class="weui-form__opr-area" style="margin:30px 15px 10px">
                <a @click="do_withdraw" class="weui-btn weui-btn_primary" :class="{'weui-btn_disabled' : amount <=0 ||
                amount == ''}"
                >确定
                </a>
            </div>



            <div class="bra-action-sheet" v-if="show_action_sheet">
                <div class="weui-mask" id="iosMask" style="opacity: 1;"></div>
                <div class="weui-actionsheet weui-actionsheet_toggle" id="iosActionsheet">
                    <div class="weui-actionsheet__title">
                        <p class="weui-actionsheet__title-text">请选择银行卡</p>
                    </div>
                    <div class="weui-actionsheet__menu">
                        <div class="weui-actionsheet__cell"  v-for="card in page_data.cards"
                             @click="selected_card =  card , show_action_sheet = false">
                            {{card.real_name}} {{card.bank_id}}
                        </div>
                    </div>
                    <div class="weui-actionsheet__action">
                        <div class="weui-actionsheet__cell" @click="show_action_sheet = false">取消</div>
                    </div>
                </div>
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
                page_name: 'bra_wallet_draw',
                module: 'bra',
                is_page_loaded: false,
                page_data: {},
                fucking_params: {},
                params: {} ,
                show_action_sheet : false ,
                selected_card : {} ,
                amount : '',
                drawfee : 0
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
                    if(page_data.code == 1){
                        this.show_toast(page_data.msg);
                        this.onBack();

                    }else{
                        this.show_toast(page_data.msg)
                    }
                } , 'post' , false , true) ;
            },
            onMhcmsPull() {
                this.bra_common_page(this.module, this.page_name, {}, true, (data) => {
                    this.page_data = this.elements.page_data;
                    if(this.page_data.cards.length <= 0){
                        uni.showModal({
                            title: '提示',
                            cancelText : '取消绑定' ,
                            confirmText : '立刻绑定' ,
                            content: '您好 你还没有绑定银行卡!',
                            success:  (res) => {
                                if (res.confirm) {
                                    this.onNav({
                                        url : '/pages/wallet/wallet_card_add'
                                    });
                                } else if (res.cancel) {
                                    this.onNav({
                                        url : '/pages/hotel/user/index' , type : 'switch'
                                    });
                                }
                            }
                        });
                    }else{
                        for (let card of this.page_data.cards){
                            if(card.old_data.is_default == 1){
                                this.selected_card =card ;
                                break;
                            }

                        }
                        this.is_page_loaded = true;
                    }
                    uni.stopPullDownRefresh();
                });
            },
        },
        watch : {
            amount : function (new_val) {
                if(new_val > this.page_data.user.balance){
                    this.amount = '';
                }

                if(this.page_data.wallet.drawfee_way == 1){
                    this.drawfee = this.amount * parseFloat(this.page_data.wallet.drawfee) / 100;
                }else{
                    this.drawfee = this.page_data.wallet.drawfee;
                }
            }
        }
    }
</script>

<style>
    .weui-cells__group_form .weui-cells:before, .weui-cells__group_form .weui-cell:before{
        top:10000px
    }
</style>
