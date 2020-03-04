<template>
    <view class="full_screen" v-if="is_page_loaded">
        <view class="uni-padding-wrap is-relative">
            <view class="page-section swiper">
                <view class="page-section-spacing relative">
                    <swiper class="swiper" :autoplay="true" :interval="5000" :duration="1000"
                            style="width: 750upx;height: 409upx;margin: 0 auto">
                        <swiper-item v-for="(item,index) in page_data.store.images" wx:key="test">
                            <image @click="preview_img" :data-index="index" class="search_icon"
                                   style="width: 750upx;height: 409upx;" :src="item.url" mode="aspectFill"></image>
                        </swiper-item>

                    </swiper>

                    <view class="mhcms_swiper_num">{{current + 1}} / {{page_data.store.images.length}}</view>
                </view>
            </view>
        </view>
        <!-- 简介 -->

        <view class="uni-padding-wrap is-relative" style="top: -4px;overflow: hidden;border-radius: 4px 4px 0px 0px;">
            <div class="bb10 columns is-mobile is-marginless has-background-white">
                <div class="column">
                    <div class="f18 padded fb">{{page_data.store.title}}
                    <span class="f12 fnb padded-h">{{page_data.hotel_store.star}}</span>
                    </div>
                    <div class="f14 padded-h">
                        {{page_data.store.address}}
                    </div>
                    <div class="f12 padded has-text-grey">
                        <span class="has-text-link icon-map iconfont padded-r"></span>
                        {{page_data.store.address}}
                    </div>
                </div>
                <div class="column is-narrow"></div>
            </div>

            <!-- 全日房预定 -->

            <div class="bb10 has-background-white">

                <div @click="show_picker_q = true" class="columns weui-cell weui-cell_access is-mobile is-marginless padded">

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
                    <div class="weui-cell__ft"></div>
                </div>
                <div class="padded ">

                    <div class="padded bb1" v-for="item in page_data.room_types" v-if="item.old_data.type==
            picked_date.room_type">
                        <div class="bra-radius-2 hotel bra-pic-item has-background-white margined ">
                            <div class="columns is-mobile is-gapless is-marginless ">
                                <div class="column is-narrow">
                                    <div class="img has-shadow" style="width:100px;height:80px;margin-right:10px">
                                        <image v-if="item.thumb[0]" style="width:100px;height:80px"
                                               :src="item.thumb[0].url"
                                               mode="aspectFill"></image>
                                    </div>
                                </div>
                                <div class="column f14">
                                    <div class="f16 fb">{{item.title}}</div>
                                    <div class="has-text-right">

                                    </div>
                                </div>
                                <div class="column is-narrow f14" style="line-height:50px">
                                    <div class="bra-btn mini orange" v-if="item.amount  >0"
                                         style="width: 36px;margin:auto" @click="onNav"
                                         :data-url="'/pages/hotel/index/hotel_yuding?id='+ item.id">预定</div>

                                    <div class="bra-btn mini grey" v-else="item.amount.length == 0"
                                                                                       style="width: 36px;margin:auto">已满</div>
                                    <span class="has-text-danger f20"><span
                                            class="iconfont icon-renminbi1688"></span>{{item.price}}</span><span
                                        class="f12 padded-h">起
                            </span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <!-- 钟点房预定 -->
                <div class="padded is-hidden">
                    <div class="margined">
                        <span v-if="room_type == 1">钟点房预定</span> <span v-else>全日房预定</span>
                    </div>
                    <div class="bb1 columns is-mobile is-marginless has-text-link is-multiline">
                        <div class="column bra-header padded f16">
                            <span class="iconfont icon-shijian f16 padded-h"></span>01月1日 - 01月2日
                        </div>
                        <div class="column is-narrow padded f16">
                            <div class="icon-jiantou iconfont f16"></div>
                        </div>
                    </div>

                    <div class="padded bb1" v-for="item in page_data.room_types" v-if="item.old_data.type!=
            picked_date.room_type">
                        <div class="bra-radius-2 hotel bra-pic-item has-background-white margined ">
                            <div class="columns is-mobile is-gapless is-marginless ">
                                <div class="column is-narrow">
                                    <div class="img has-shadow" style="width:100px;height:80px;margin-right:10px">
                                        <image v-if="item.thumb[0]" style="width:100px;height:80px"
                                               :src="item.thumb[0].url"
                                               mode="aspectFill"></image>
                                    </div>
                                </div>
                                <div class="column f14">
                                    <div class="f16">{{item.title}}</div>
                                    <div class="has-text-right">

                                    </div>
                                </div>
                                <div class="column is-narrow f14" style="line-height:50px">
                                    <div class="bra-btn mini orange" v-if="item.amount >0"
                                         style="width: 36px;margin:auto">预定</div>

                                    <div class="bra-btn mini grey" v-else="item.amount.length == 0"
                                         style="width: 36px;margin:auto">已满</div>
                                    <span class="has-text-danger f20"><span
                                            class="iconfont icon-renminbi1688"></span>{{item.price}}</span><span
                                        class="f12 padded-h">起
                            </span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </view>

        <!-- 全日房日历 -->
        <view class="is-fixed zindex_1100 animated fadeInUp faster" style="position:fixed;bottom:0upx;height:58vh;"
              v-show="show_picker_q &&
            is_page_loaded">
            <div @click="show_picker_q=false" class="bra_mask animated fadeIn" style="top:-58vh"></div>
            <bra_date_period :endDate="stop_date" :startDate="start_date" @callback="getQDate"/>
        </view>

    </view>
</template>

<script>
    const app = getApp();
    import bra_date_period from '@/bra/forms/bra_date_period.vue'
    export default {
        components: {
              bra_date_period
        },
        data() {
            return {
                page_name: 'hotel_index_hotel_detail',
                module: 'hotel',
                is_page_loaded: false,
                opt: {},
                img_urls: [],
                elements: [],
                page_data: {},
                current: 0,
                picked_date: {} ,
                start_date : '' ,
                stop_date : '' ,
                show_picker_q : false,
                show_picker_z : false ,
                room_type : '' ,

            }
        },
        onLoad(opt) {
            this.opt = opt;
            console.log(opt)
        },
        onShow() {
            this.picked_date = this.get_cache('picked_date');
            this.start_date = this.picked_date.startDateStr;
            this.stop_date = this.picked_date.endDateStr;
            this.room_type = this.picked_date.room_type;
            if (!this.is_page_loaded) {
                this.onMhcmsPull();
            }
        },
        methods: {
            getQDate(date) {
                this.show_picker_q = false;
                date.room_type = this.room_type;
                this.picked_date = date;
                this.set_cache('picked_date' , this.picked_date);
                this.onMhcmsPull();
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
                    uni.stopPullDownRefresh();
                });
            },
            preview_img: function (e) {
                if (this.img_urls.length == 0) {
                    for (let key in this.page_data.store.images) {
                        let item = this.page_data.store.images[key];
                        this.img_urls.push(item.url);
                    }
                }
                let index = e.currentTarget.dataset.index;
                uni.previewImage({
                    urls: this.img_urls,
                    current: index,
                    longPressActions: {
                        itemList: ['发送给朋友', '保存图片', '收藏'],
                        success: function (res) {
                            console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
                        },
                        fail: function (res) {
                            console.log(res.errMsg);
                        }
                    }
                });
            },
        }
    }
</script>

<style>

    .mhcms_swiper_num{
        position:absolute;
        bottom:0;
        font-size:12px;
        right:0;
        padding:13px;
        color:#fff;
    }
</style>
