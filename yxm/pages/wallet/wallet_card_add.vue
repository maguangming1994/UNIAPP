<style lang="scss">
    #user {

    }

    .is-bg-orange {
        background: #ff7528;
    }

    .rabs {

        font-size: 33 upx;
        line-height: 80 upx;
        color: #b23510;
    }

    .rabs .active {
        color: #fff;
    }
</style>
<template>
    <view class="full_screen">
        <div class="bk10"></div>

        <view class="menus tuandui-list" v-if="is_page_loaded">
                <div class="weui-cells__group weui-cells__group_form">

                    <div class="weui-cells__title">
                        <div class="bk10"></div>请绑定持卡人本人的银行卡</div>
                    <div class="weui-cells weui-cells_form f14">
                        <div class="weui-cell">
                            <div class="weui-cell__hd"><label class="weui-label">持卡人</label></div>
                            <div class="weui-cell__bd">
                                <bra_input :field_name="'real_name'" :placeholder="'请输入姓名'"
                                           @updated="update_val"></bra_input>
                            </div>
                        </div>
                        <div class="weui-cell">
                            <div class="weui-cell__hd"><label class="weui-label">卡号/账号</label></div>
                            <div class="weui-cell__bd">
                                <bra_input :field_name="'card_no'" :placeholder="'请输入卡号/账号'"
                                           @updated="update_val"></bra_input>
                            </div>
                        </div>
                        <div class="weui-cell">
                            <div class="weui-cell__hd"><label class="weui-label">所属银行</label></div>
                            <div class="weui-cell__bd">
                                <bra_level_picker :default_value="[0]" :field_name="'bank_id'" :level="0"
                                                  :options="page_data.bank_id_opts"
                                                  @updated="update_val"></bra_level_picker>
                            </div>
                        </div>
                        <div class="weui-cell" v-if="!hide_fen">
                            <div class="weui-cell__hd"><label class="weui-label">开户行</label></div>
                            <div class="weui-cell__bd">
                                <bra_input :field_name="'bank_address'" :placeholder="'请输入开户行地址'"
                                           @updated="update_val"></bra_input>
                            </div>
                        </div>
                    </div>

                </div>

        </view>
        <view @click="onSubmit" class="weui-btn-area">
            <view class="weui-btn is-bg-orange" id="showTooltips">添加银行卡</view>
        </view>
    </view>

</template>

<script>

    const app = getApp();

    import bra_level_picker from '@/bra/forms/bra_level_picker.vue';
    import bra_input from '@/bra/forms/bra_input.vue';

    export default {
        components: {
            bra_level_picker, bra_input
        },
        data() {
            return {
                page_name: 'bra_wallet_card_add',
                module: 'bra',
                items: [],
                loader: {
                    is_loading: false,
                    has_more: true,
                    page: 1
                },
                keyword: '',
                params: {},
                elements: {},
                ref_code: '',
                is_page_loaded: false,
                status: 99,
                cards: [],
                page_data: [],
                fucking_params: {},
                hide_fen: false
            };
        },
        onLoad() {
        },
        onShow() {

            let user = uni.getStorageSync("user") || false;
            console.log('show', user, this.is_page_loaded)

            if (!user || !this.is_page_loaded) {
                this.onMhcmsPull();
            }

        },

        onPullDownRefresh() {
            this.onMhcmsPull();
            uni.stopPullDownRefresh();
        },
        onReachBottom: function () {

        },

        methods: {
            update_val: function (n) {
                this.on_form_val(n);
                console.log(n);

                if (n[0] == 'bank_id') {
                    if (n[1] == 1 || n[1] == 2) {
                        this.hide_fen = true;
                    } else {
                        this.hide_fen = false;

                    }
                }

            },

            onMhcmsPull: function () {
                let params = this.params;
                this.bra_common_page(this.module, this.page_name, params, true, (data) => {
                    this.page_data = this.elements.page_data;
                    this.is_page_loaded = true;
                    uni.stopPullDownRefresh();
                });
            },
            onSubmit: function () {
                let params = this.fucking_params;
                this.bra_common_page(this.module, this.page_name, params, true, (ret) => {
                    var page_data = ret.data.page_data;
                    if(page_data.code != 1){
                        this.show_toast(page_data.msg)
                    }else{
                        this.onNav({
                            url : '/pages/wallet/wallet_idx'
                        });
                    }
                } ,'post' , false);

            }
        },
        watch: {}
    }
</script>

