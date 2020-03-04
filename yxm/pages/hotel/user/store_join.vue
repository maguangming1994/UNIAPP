<template>
    <div class="full_screen is-clipped" v-if="is_page_loaded" style="height:auto">

        <i class="iconfont weui-icon-back is-absolute zindex_100" style="color:#f3f3f3;top:30px;left:30upx" @click="onBack" ></i>
        <div class=" is-clipped bra-radius-2">
            <image src="/static/img/join.jpg" mode="aspectFill" style="width:100vw;height:320upx"></image>
        </div>

        <div style="margin-top:0" class="weui-form__control-area  has-background-white is-clipped"
             v-if="page_data.user">
            <div class="weui-cells__group weui-cells__group_form">

                <div class="weui-cells__title">输入信息 每项必填</div>
                <div class="weui-cells weui-cells_form">

                    <div class="weui-cell">
                        <div class="weui-cell__hd"><label class="weui-label">酒店名称</label></div>
                        <div class="weui-cell__bd">
                            <bra_input :field_name="'title'" :placeholder="'酒店名称'"
                                       @updated="on_bra_form_val"></bra_input>
                        </div>
                    </div>
                    <div class="weui-cell">
                        <div class="weui-cell__hd"><label class="weui-label">酒店电话</label></div>
                        <div class="weui-cell__bd">
                            <bra_input :field_name="'mobile'" :placeholder="'酒店电话'"
                                       @updated="on_bra_form_val"></bra_input>
                        </div>
                    </div>

                    <div class="weui-cell weui-cell_disabled">
                        <div class="weui-cell__hd"><label class="weui-label">所在地区</label></div>
                        <div class="weui-cell__bd">
                            <bra_level_picker :default_value="[0,0,0]" :field_name="'area_id'" :level="2"
                                              :options="page_data.options"
                                              @updated="on_bra_form_val"></bra_level_picker>

                        </div>
                    </div>
                    <div class="weui-cell">
                        <div class="weui-cell__hd"><label class="weui-label">酒店地址</label></div>
                        <div class="weui-cell__bd">
                            <bra_input_location :field_name="'address'" :placeholder="'酒店地址'" @updated="on_bra_form_val"></bra_input_location>

                        </div>
                    </div>

                    <div class="weui-cell columns is-mobile is-multiline is-marginless" style="align-items:flex-start">
                        <div
                                class="weui-cell__hd column is-12"><label class="weui -label">上传营业执照与负责人身份证正反面图片</label></div>
                        <div class="weui-cell__bd" style="margin:10px 0 0px 0">
                            <view class=" has-text-centered f26">
                                <bra_upload_multi  :field_name="'images'" :max_amount="5"
                                                   @updated="on_bra_form_val"></bra_upload_multi>
                            </view>
                        </div>
                    </div>
                    <div class="weui-cell columns is-mobile is-multiline is-marginless" style="align-items:flex-start">
                        <div class="weui-cell__hd column is-12"><label class="weui- label">上传酒店图片*</label></div>
                        <div class="weui-cell__bd" style="margin:10px 0 0px 0">
                            <view class=" has-text-centered f26">
                                <bra_upload_multi  :field_name="'cert_pics'" :max_amount="5"
                                                   @updated="on_bra_form_val"></bra_upload_multi>
                            </view>
                        </div>
                    </div>


                </div>


            </div>
            <div class="weui-form__opr-area" style="margin-top:25px">
                <button @click="do_apply()" class="bra-btn normal  orange" style="width:61.8%"> 立刻申请
                </button>
            </div>
        </div>

    </div>
</template>

<script>
    import {_} from 'vue-underscore';
    import bra_level_picker from '@/bra/forms/bra_level_picker.vue';
    import bra_input from '@/bra/forms/bra_input.vue';
    import bra_upload_multi from '@/bra/forms/bra_upload_multi.vue';
    import bra_input_location from '@/bra/forms/bra_input_location.vue';

    export default {
        components: {
            bra_level_picker, bra_input , bra_upload_multi , bra_input_location
        },
        data() {
            return {
                page_name: 'hotel_user_store_join',
                module: 'hotel',
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
                            url: '/pages/hotel/user/index', type: 'switch'
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
