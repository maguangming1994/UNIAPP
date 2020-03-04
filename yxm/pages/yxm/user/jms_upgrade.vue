<template>
    <view class="full_screen">
        <image src="/static/img/hhr.jpg" mode="aspectFill" style="width:100vw;height:180px"></image>

        <div class="weui-cells__group weui-cells__group_form" v-if="page_data.config">
            <div class="weui-cells weui-cells_radio" style="margin:0">
                <label @click="current='sd'" class="weui-cell weui-check__label">
                    <div class="weui-cell__bd ">
                        <p class="f18">申请城市代理 {{page_data.config.sd_price}}元/个 <span class="f12 has-text-danger">
                            首次进货{{page_data.config.sd_1amount}} 个
                        </span>
                        </p>
                    </div>
                    <div class="weui-cell__ft" v-show="current === 'sd'">
                        <span class="weui-icon-checked">
							<i class="iconfont icon-wanchengzhijiao has-text-white"></i></span>
                    </div>
                </label>

                <label @click="current='qd'" class="weui-cell weui-check__label">

                    <div class="weui-cell__bd">
                        <p class="f18">申请区县代理 {{page_data.config.qd_price}}元/个<span class="f12 has-text-danger">
                            首次进货{{page_data.config.qd_1amount}} 个</span>
                        </p>
                    </div>
                    <div class="weui-cell__ft" v-show="current === 'qd'">
                        <span class="weui-icon-checked">
							<i class="iconfont icon-wanchengzhijiao has-text-white"></i>
						</span>
                    </div>
                </label>
            </div>
        </div>

        <div class="bk10"></div>

        <div class="weui-cells__group weui-cells__group_form" v-if="page_data.user" v-show="current!=''">

            <div class="weui-cells__title">输入信息 每项必填</div>
            <div class="weui-cells weui-cells_form margined bra-radius-2 has-shadow">

                <div class="weui-cell weui-cell_disabled" v-show="current=='sd'">

                    <div class="weui-cell__hd"><i class="icon-9xuexiaoshiqu iconfont"></i></div>
                    <div class="weui-cell__hd"><label class="weui-label">所在地区</label></div>
                    <div class="weui-cell__bd">
                        <bra_level_picker :default_value="[0,0]" :field_name="'area_id'" :level="1"
                                          :options="page_data.options" @updated="on_bra_form_val"></bra_level_picker>

                    </div>
                </div>

                <div class="weui-cell weui-cell_disabled" v-show="current=='qd'">

                    <div class="weui-cell__hd"><i class="icon-9xuexiaoshiqu iconfont"></i></div>
                    <div class="weui-cell__hd"><label class="weui-label">所在地区</label></div>
                    <div class="weui-cell__bd">
                        <bra_level_picker :default_value="[0,0,0]" :field_name="'area_id'" :level="2"
                                          :options="page_data.options" @updated="on_bra_form_val"></bra_level_picker>

                    </div>
                </div>

                <div class="weui-cell" id="js_cell">

                    <div class="weui-cell__hd"><i class="icon-geren iconfont"></i></div>
                    <div class="weui-cell__bd">
                        <bra_input :field_name="'title'" :placeholder="'请输入姓名'" @updated="on_bra_form_val"></bra_input>
                    </div>
                </div>
                <div class="weui-cell weui-cell_disabled">

                    <div class="weui-cell__hd"><i class="icon-icon iconfont"></i></div>
                    <div class="weui-cell__bd">
                        <bra_input :default_value="''" :field_name="'mobile'" :mini_type="'number'"
                                   :placeholder="'请输入手机号码'" @updated="on_bra_form_val"></bra_input>
                    </div>
                </div>

            </div>
        </div>

        <div class="has-text-centered has-text-danger is-hidden" style="line-height:2rem;font-size:60upx"
             v-show="total_price > 0">{{total_price}}元
        </div>

        <div class="weui-form__opr-area" style="margin-top:55px" v-show="current!=''">
            <button @click="do_upgrade_apply()" class="weui-btn weui-btn_primary round-btn" style="background:#f2a497">
                立刻申请
            </button>
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
                page_name: 'yxm_jms_upgrade',
                module: 'yxm',
                is_page_loaded: false,
                page_data: {},
                fucking_params: {},
                params: {},
                current: ''
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
        methods: {
            onMhcmsPull() {
                this.bra_common_page(this.module, this.page_name, {}, true, (data) => {
                    this.page_data = this.elements.page_data;
                    this.is_page_loaded = true;
                    uni.stopPullDownRefresh();
                });
            },

            on_bra_form_val: function (value) {
                this.on_form_val(value);
            },
            do_upgrade_apply: function () {
                let values = _.extend({type: this.current}, this.fucking_params);
                if (!values.area_id) {
                    return this.show_toast('对不起 , 请选择您所在地区!');
                }
                if (!values.title) {
                    return this.show_toast('对不起 , 请输入您的姓名!');
                }

                return this.bra_common_page(this.module, this.page_name + '_apply', values, true, (ret) => {
                    let page_data = ret.data.page_data;
                    console.log(page_data);
                    if (page_data.code == 1) {
                        this.show_toast(page_data.msg);
                        this.$store.commit('change_jms', true);
                        this.onBack();
                    } else {
                        this.show_toast(page_data.msg);
                    }
                    uni.stopPullDownRefresh();
                }, 'post', false);
            },
            do_upgrade: function () {


                let values = _.extend({type: this.current}, this.fucking_params);
                if (!values.area_id) {
                    return this.show_toast('对不起 , 请选择您所在地区!');
                }


                if (!values.title) {
                    return this.show_toast('对不起 , 请输入您的姓名!');
                }


                return this.bra_common_page(this.module, this.page_name, values, true, (ret) => {
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
                                    this.do_upgrade();
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
        },
        computed: {
            total_price: function () {
                if (this.page_data.config) {
                    if (this.current == 'sd') {
                        return this.page_data.config.sd_price * this.page_data.config.sd_1amount
                    }

                    if (this.current == 'qd') {
                        return this.page_data.config.qd_price * this.page_data.config.qd_1amount
                    }
                }


                return 0;
            }
        },
        watch: {
            current: function (new_current) {
                this.fucking_params.area_id = '';
            }
        }
    }
</script>

<style>
    .weui-icon-checked{text-align:center; background:#7ed321;border-radius:50%}
    .iconfont{font-size:20px}
</style>
