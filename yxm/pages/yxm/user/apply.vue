<template>
    <view class="full_screen" v-if="is_page_loaded">
        <div class="page__hd bb10 has-background-white" style="padding: 58px;">
            <h1 class="page__title" style="text-align: left;
    font-size: 20px;
    font-weight: 400;">总价格：￥ {{page_data.config.ly_1price}} 元 </h1>
            <p class="page__desc" style="margin-top: 4px;
    color: rgba(0,0,0,.5);
    text-align: left;
    font-size: 14px;">领养共享干衣架 1 个 , 您当前的余额 {{page_data.user.balance}} 元 ,本次支付优先使用账户余额!</p>
        </div>
        <div class="weui-form__control-area" v-if="page_data.user">
            <div class="weui-cells__group weui-cells__group_form">

                <div class="weui-cells__title">输入信息 每项必填</div>
                <div class="weui-cells weui-cells_form">

                    <div class="weui-cell weui-cell_disabled">
                        <div class="weui-cell__hd"><label class="weui-label">所在地区</label></div>
                        <div class="weui-cell__bd">
                            <bra_level_picker :default_value="[0,0,0]" :field_name="'area_id'" :level="2"
                                              :options="page_data.options"
                                              @updated="on_bra_form_val"></bra_level_picker>

                        </div>
                    </div>

                    <div class="weui-cell" id="js_cell">
                        <div class="weui-cell__hd"><label class="weui-label">您的姓名</label></div>
                        <div class="weui-cell__bd">
                            <bra_input :field_name="'title'" :placeholder="'请输入姓名'"
                                       @updated="on_bra_form_val"></bra_input>
                        </div>
                    </div>
                    <div class="weui-cell weui-cell_disabled">
                        <div class="weui-cell__hd"><label class="weui-label">手机号码</label></div>
                        <div class="weui-cell__bd">
                            <bra_input :field_name="'mobile'" :mini_type="'number'" :placeholder="'请输入手机号码'"
                                       @updated="on_bra_form_val" :default_value="page_data.user.mobile"></bra_input>
                        </div>
                    </div>

                    <div class="weui-cell" for="s11">
                        <div class="weui-cell__hd" style="color:#4cd964">
                            <span class="weui-icon-checked has-text-centered" style="border-radius:50%">
							<i class="iconfont icon-wanchengzhijiao has-text-white"></i>
						</span>
                        </div>
                        <div class="weui-cell__bd">
                            <p>购买即表示同意用户协议</p>
                        </div>
                        <div class="weui-cell__ft f18" @click="onNav" :data-url="'/pages/bra/common/reg_term'">
                            点击阅读
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <div class="weui-form__opr-area">
            <button @click="do_apply()" class="weui-btn weui-btn_primary" id="showTooltips"> 立刻领养</button>
        </div>
    </view>
</template>

<script>
    import {_} from 'vue-underscore';
    import bra_level_picker from '@/bra/forms/bra_level_picker.vue';
    import bra_input from '@/bra/forms/bra_input.vue';

    export default {
        components: {
            bra_level_picker, bra_input
        },
        data() {
            return {
                page_name: 'yxm_lyy_apply',
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

                let params = {};
                if (this.city_id > 0) {
                    params.area_id = this.city_id;
                }
                this.show_loading('Loading');
                this.bra_common_page(this.module, this.page_name, params, true, (data) => {
                    this.page_data = this.elements.page_data;
                    this.is_page_loaded = true;
                    uni.stopPullDownRefresh();
                    uni.hideLoading();
                });
            },

            do_apply: function () {

                if (!this.fucking_params.area_id) {
                    return this.show_toast('对不起 , 请选择您所在地区!');
                }

                let values = _.extend({}, this.fucking_params);
                uni.showLoading({
                    title: '请稍后' ,
                    mask : true
                });
                return this.bra_common_page(this.module, this.page_name, values, true, (ret) => {
                    let page_data = ret.data.page_data;
                    uni.hideLoading();

                    if (page_data.code == 6) {
                        return this.get_app_pay_params(page_data.data.data.id, 'micropay', (orderInfo) => {
                            console.log(orderInfo);
                            uni.requestPayment({
                                provider: 'wxpay',
                                orderInfo: JSON.stringify(orderInfo),
                                success: (res) => {
                                    this.show_toast('支付完成');
                                    this.do_apply();
                                    console.log('success:' + JSON.stringify(res));
                                },
                                fail: (err) => {
                                    console.log('fail:' + JSON.stringify(err));

                                    this.show_toast('支付失败！');
                                }
                            });

                        })

                    }

                    if (page_data.code == 1) {
                        this.show_toast(page_data.msg);
                        this.$store.commit('change_lyy', true);
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
