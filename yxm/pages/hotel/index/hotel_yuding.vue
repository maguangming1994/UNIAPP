<template>
    <view class="full_screen is-clipped" v-if="is_page_loaded">
        <view class="has-bg-blue is-clipped padded ">

            <view class="bra-radius-4 has-background-white is-clipped has-shadow">
            <view class=" has-background-white ">
                <div class="columns weui-cell weui-cell_access is-mobile is-marginless padded margined">

                    <div class="column weui-cell__bd f18 has-text-left">
                        <p>{{picked_date.startDate.month}}月{{picked_date.startDate.day}}日</p>
                        <p class="f12">周{{picked_date.startDate.week}}入驻</p>
                    </div>
                    <div class="f14 column is-narrow" style="line-height: 2.2rem;color: #215ce0;">共 {{picked_date
                        .countDays}} 晚
                    </div>
                    <div class=" column weui-cell__bd f18 has-text-right">
                        <p>{{picked_date.endDate.month}}月{{picked_date.endDate.day}}日</p>
                        <p class="f12">周{{picked_date.endDate.week}}离开</p>
                    </div>
                </div>
            </view>
            <view class="has-background-white padded">

                <view class="columns is-mobile is-marginless is-multiline">
                    <view class="tag fb column ">{{page_data.room_type.title}}</view>
                    <view class="f12 padded">{{page_data.room_type.zaocan}}</view>
                    <view class="f12 padded">{{page_data.room_type.type}}</view>
                    <view class="f12 padded">{{page_data.room_type.bed}}</view>

                </view>
            </view>
            </view>

        </view>

        <div class="weui-cells weui-cells_form bb10">

            <!--  room_amount -->
            <div @click="more_room = !more_room" class="weui-cell weui-cell_active">
                <div class="weui-cell__hd"><label class="weui-label">房间数量</label></div>
                <div class="weui-cell__bd weui-flex">

                    <div class="weui-btn_reset ">

                        {{room_amount}} 间

                    </div>
                </div>
                <div class="weui-cell__ft">
                    <i class="icon-icon-angle-double-bottom iconfont" v-show="more_room"></i> <i
                        class="icon-jiantou iconfont" v-show="!more_room"></i>
                </div>
            </div>

            <div class="has-background-light weui-cell weui-cell_active animated fadeIn" v-show="more_room">
                <view :class="{selected  :
                item==room_amount}" @click="room_amount = item,more_room=false" class="bra-btn room_num padded margined-h"
                      style="width:50px;"
                      v-for="item in page_data.amount">{{item }}
                </view>
            </div>

            <!--  names -->
            <div class="weui-cell weui-cell_active" v-for="item in room_amount">
                <div class="weui-cell__hd"><label class="weui-label">住客{{item}}姓名</label></div>
                <div class="weui-cell__bd weui-flex">
                    <input @input="change_room" :data-field_name="'real_name'" :data-room_idx="item" class="weui-input"
                           maxlength="16"
                           placeholder="每间填写一位住客姓名"
                           type="text">
                </div>
                <div class="weui-cell__ft">
                    <i class="icon-icon-angle-double-bottom iconfont" v-show="more_room"></i> <i
                        class="icon-jiantou iconfont" v-show="!more_room"></i>
                </div>
            </div>

            <!--  到店时间 -->
            <div @click="dialogs.show_times_modal = true" class="weui-cell weui-cell_active">
                <div class="weui-cell__hd"><label class="weui-label">到店时间</label></div>
                <div class="weui-cell__bd weui-flex">
                    <span>{{picked_hour.text + '房间将整晚保留'}}</span>

                </div>
                <div class="weui-cell__ft">
                    <i class="icon-icon-angle-double-bottom iconfont" v-show="more_room"></i> <i
                        class="icon-jiantou iconfont" v-show="!more_room"></i>
                </div>
            </div>

            <!-- not login -->
            <view v-if="!page_data.user">
                <div class="weui-cell weui-cell_active">
                    <div class="weui-cell__hd"><label class="weui-label">手机号码</label></div>
                    <div class="weui-cell__bd weui-flex">
                        <input class="weui-input" pattern="[0-9]*" placeholder="请输入手机号" type="number" value="">
                    </div>
                </div>

                <div class="weui-cell weui-cell_active weui-cell_vcode">
                    <div class="weui-cell__hd"><label class="weui-label">验证码</label></div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" maxlength="6" pattern="[0-9]*" placeholder="输入验证码" type="number"
                               v-model="code">
                    </div>
                    <div class="bra-btn">
                        <span @click="send_verify_code"
                              class="f12 is-block margined bra-btn orange bra-radius-4 padded">{{btn_txt}}</span>
                    </div>
                </div>

                <div class="weui-form__opr-area">
                    <a @click="verify_code()" class="weui-btn weui-btn_primary ">确定</a>
                </div>
            </view>

            <view v-if="page_data.user">

            </view>

        </div>
        <!--        优惠-->
        <div class="weui-cells weui-cells_form bb10">
            <view class="bra-header padded">
                <span class="fb">优惠</span>
            </view>

            <div class="weui-cell weui-cell_active">
                <div class="weui-cell__hd"><label class="weui-label">
                    <span>优惠券</span>
                </label></div>
                <div class="weui-cell__bd weui-flex">
                    暂无可用优惠卷
                </div>
                <div class="weui-cell__ft">
                    <i class="icon-icon-angle-double-bottom iconfont" v-show="more_room"></i> <i
                        class="icon-jiantou iconfont" v-show="!more_room"></i>
                </div>
            </div>
        </div>

        <!--   费用  -->
        <div class="weui-cells weui-cells_form bb10"  v-if="page_data.user">
            <view class="bra-header padded">
                <span class="fb">费用明细</span>
            </view>

            <div class="weui-cell weui-cell_active">
                <div class="weui-cell__hd"><label class="weui-label">
                    <span>房间价格</span>
                </label></div>
                <div class="weui-cell__bd weui-flex">
                    {{page_data.room_type.price}} * {{room_amount}}间 * {{picked_date.countDays}} 天 = {{room_amount * page_data.room_type.price * picked_date.countDays}} 元
                </div>
                <div class="weui-cell__ft">
                    <i class="icon-icon-angle-double-bottom iconfont" v-show="more_room"></i> <i
                        class="icon-jiantou iconfont" v-show="!more_room"></i>
                </div>
            </div>

            <div class="weui-cell weui-cell_active">
                <div class="weui-cell__hd"><label class="weui-label">
                    <span>押金</span>
                </label></div>
                <div class="weui-cell__bd weui-flex">
                    {{room_amount * page_data.room_type.margin}} 元
                </div>
                <div class="weui-cell__ft">
                    <i class="icon-icon-angle-double-bottom iconfont" v-show="more_room"></i> <i
                        class="icon-jiantou iconfont" v-show="!more_room"></i>
                </div>
            </div>
        </div>

        <!--   bottom  -->
        <view class=" is-fixed-bottom has-background-white has-shadow" v-if="page_data.user">
            <div class="columns is-mobile  is-marginless f16 ">
                <div class="column padded">价格: {{total_price}} 元</div>
                <div @click="create_hotel_order" class="column padded has-text-centered"
                     style="background:orangered;color:#fff">提交订单
                </div>
            </div>
        </view>

        <!--        到店时间-->
        <div class="bra_mask" v-show="dialogs.show_times_modal" @click="dialogs.show_times_modal = false"></div>
        <view class="bra-bottom-dialog slideInUp animated has-background-white is-fixed-bottom zindex_1100 has-shadow"
              style="min-height:38vh"
              v-show="dialogs.show_times_modal">
            <view class="bra-header padded">
                预计到店 <span class="f12 margined has-text-grey">房间整晚保留，12:00前到店可能需要等房
</span>
            </view>

            <view class="dates columns is-marginless is-mobile is-gapless is-multiline padded">
                <view class="is-4 column" v-for="hour in hours"
                      @click="picked_hour = hour,dialogs.show_times_modal=false">
                    <span :class="{'active' : picked_hour.hour == hour.hour}" class="date">{{hour.text}}</span>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    const app = getApp();

    import bra_time from '@/bra/utils/bra_time.js';

    export default {
        data() {
            return {
                page_name: 'hotel_index_yuding',
                module: 'hotel',
                is_page_loaded: false,
                opt: {},
                page_data: {
                    user: false
                },
                btn_txt: '获取验证码',
                room_amount: 1,
                more_room: false,
                mobile_number: '',
                code: '',
                show_modal: false,
                dialogs: {
                    show_times_modal: false
                },
                pre_in_at: '',
                hours: [],
                picked_hour: [],
                rooms: [],
                total_price: 0 ,
                picked_date : {}
            }
        },
        onLoad(opt) {
            this.opt = opt;
            console.log(opt)
        },
        onShow() {
            this.picked_date = this.get_cache('picked_date');
            console.log(this.picked_date )
            this.start_date = this.picked_date.startDateStr;
            this.stop_date = this.picked_date.endDateStr;
            this.room_type = this.picked_date.room_type;
            if (!this.is_page_loaded) {
                this.onMhcmsPull();
            }
        }, onPullDownRefresh() {
            this.onMhcmsPull();
            uni.stopPullDownRefresh();
        },
        created: function () {

            this.init_hours();
            this.picked_hour = this.hours[0];
        },
        watch: {
            room_amount: function (new_amount) {
                this.get_total_price();
            }
        },
        methods: {
            get_total_price: function () {
                this.total_price = this.page_data.room_type.price * this.room_amount * this.picked_date.countDays +
                    this.page_data.room_type.margin * this.room_amount;

            },
            create_hotel_order: function () {
                let params = {
                    room_amount: this.room_amount,
                    rooms: this.rooms,
                    room_type_id: this.opt.id,
                    picked_hour: this.picked_hour.hour,

                };
                if (params.rooms.length < params.room_amount) {
                    return this.show_toast('对不起,每一间房最少写一名住客');
                }

                for (let i in params.rooms) {
                    if (i <= params.room_amount && !params.rooms[i].real_name) {
                        return this.show_toast('对不起,每一间房最少写一名住客');
                    }
                }

                params.start = this.picked_date.startDateStr;
                params.end = this.picked_date.endDateStr;

                console.log(params)
                this.show_toast('正在发起支付,请稍后~');
                this.bra_common_page(this.module, 'create_hotel_order', params, false, (ret) => {
                    var page_data = ret.data.page_data;
                    console.log(page_data)

                    if (page_data.code == 6) {
                        return this.get_app_pay_params(page_data.data.id, 'micropay', (orderInfo) => {
                            console.log(JSON.stringify(orderInfo));
                            uni.requestPayment({
                                provider: 'wxpay',
                                orderInfo: JSON.stringify(orderInfo),
                                success: (res) => {
                                    this.show_toast('支付完成');
                                    this.onNav({
                                        url : '/pages/hotel/user/index',
                                        type : 'switch'
                                    });
                                    console.log('success:' + JSON.stringify(res));
                                },
                                fail: (err) => {
                                    console.log('fail:' + JSON.stringify(err));

                                    this.show_toast('支付失败！');

                                    this.onNav({
                                        url : '/pages/hotel/user/index',
                                        type : 'switch'
                                    });
                                }
                            });

                        })

                    }


                    if (page_data.code == 1) {

                        this.show_toast(page_data.msg);
                        this.onNav({
                            url : '/pages/hotel/user/index',
                            type : 'switch'
                        });
                    }else{

                        this.show_toast(page_data.msg);
                    }
                }, 'post', false);
            },
            change_room: function (e) {
                let dataset = e.target.dataset, value = e.detail.value;
                if (!this.rooms[dataset.room_idx]) {
                    this.rooms[dataset.room_idx] = {};
                }
                this.rooms[dataset.room_idx][dataset.field_name] = value;

                console.log(this.rooms, dataset);
            },
            init_hours: function () {
                this.hours = bra_time.get_house_arr(this.start_date);
            },
            onMhcmsPull() {
                let params = {};
                params.id = this.opt.id;
                params.room_type = this.picked_date.room_type;
                params.start = this.picked_date.startDateStr;
                params.end = this.picked_date.endDateStr;
                this.bra_common_page(this.module, this.page_name, params, false, (data) => {
                    this.page_data = this.elements.page_data;
                    this.is_page_loaded = true;

                    this.get_total_price();
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
                let promise = this.fetch(action, params, 'post');
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
                    }, 100);

                })
            },
            send_verify_code() {
                if (this.mobile_number.length != 11) {
                    return this.show_toast('对不起,您的手机号码不正确');
                }
                this.send_sms(this.mobile_number);
            },

            verify_code() {
                if (this.code.length < 4) {
                    return uni.showToast({
                        icon: "none",
                        title: '请输入正确的验证码',
                        duration: 2000
                    });
                }
                let action = this.bra_service('bra', 'verify_login_code');
                var that = this;
                let promise = this.fetch(action, {mobile: that.mobile_number, code: this.code});
                promise.then(res => {
                    let data = res.data;
                    if (data.user) {
                        this.log_user_in(data.user, () => {
                            this.onMhcmsPull();
                        });
                    } else {
                        uni.showToast({
                            icon: "none",
                            title: data.msg || '系统错误',
                            duration: 2000
                        });
                    }

                    console.log(data);
                }, error => {
                    uni.showToast({
                        icon: "none",
                        title: error.msg || '系统错误',
                        duration: 2000
                    });
                })
            }
        }
    }
</script>

<style>
    .weui-label{width:100px}
    .room_num{background:#fff}
    .room_num.selected{background:orangered;color:#fff}
    .bra-bottom-dialog .date{
        margin:5px 10px;background:#f2f2f2;
        display:block;
        text-align:center;
        padding:8px;
        font-size:14px;
    }
    .bra-bottom-dialog .date.active{ background:#e85f0f;
        color:#fff;}
</style>
