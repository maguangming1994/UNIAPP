<template>
    <view class="full_screen" style="height:auto">
        <block v-if="is_page_loaded">

            <!--  swiper  -->
            <view class="uni-padding-wrap" style="background-size: 100% auto">

                <swiper :autoplay="autoplay" :duration="duration" :indicator-dots="indicatorDots" :interval="interval"
                        class="swiper" style="width: 750upx;margin: 0 auto;height: 350upx">
                    <swiper-item :data-url="'/pages/house/news/news_detail?id='+item.id" @click="onNav"
                                 v-for="(item , index) in page_data.ads" wx:key="test">
                        <image :src="item.image[0].url" style="width: 750upx;margin: 0 auto;height: 350upx"></image>
                    </swiper-item>

                </swiper>
            </view>

            <!--  searcher  -->
            <view class="bra-tab bra-index-block has-background-white zindex_200 is-relative " style="border-radius:15upx;margin-top: -29px;">
                <view class="bra-tabs bra-tab-header columns has-text-centered is-mobile is-marginless is-gapless" style="padding-bottom:15px">
                    <view :class="{active : room_type == 1 }" @click="room_type=1" class="bra-tab column bra-active item-tab">全日房</view>
                    <view :class="{active : room_type == 2 }" @click="room_type=2" class="bra-tab column item-tab">钟点房</view>
                </view>

                <view class="bra-cell-row">
                    <div class="weui-cells">
                        <div class="weui-cell weui-cell_access" href="javascript:;">
                            <div class="weui-cell__bd" @click="onNav" data-url="/pages/bra/common/change_area">
                                <p>
                                    <text v-if="area.id">{{area.title}}</text>
                                    <text v-if="!area.id">定位中</text>
                                </p>
                            </div>
                            <div @click="locate_area" class=" has-text-centered">
                                <i class="iconfont icon-map-dingwei f28"></i>
                                <div class="f12">重新定位</div>

                            </div>
                        </div>
                        <div v-if="room_type==1" @click="show_picker = true" class="weui-cell weui-cell_access">
                            <div class="columns is-mobile is-marginless " style="width:100%" v-if="picked.startDate">

                                <div class="column weui-cell__bd f18 has-text-left">
                                    <p>{{picked.startDate.month}}月{{picked.startDate.day}}日</p>
                                    <p class="f12">周{{picked.startDate.week}}入驻</p>
                                </div>
                                <div class="f14 column is-narrow" style="line-height: 2.2rem;color: #215ce0;">共 {{picked
                                    .countDays}} 晚
                                </div>
                                <div class=" column weui-cell__bd f18 has-text-right">
                                    <p>{{picked.endDate.month}}月{{picked.endDate.day}}日</p>
                                    <p class="f12">周{{picked.endDate.week}}离开</p>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div class="bk10"></div>
                    <div class="weui-form__opr-a rea">
                        <div class="bra-btn bulla normal bra-radius-2 v-centered centered f20" style=""
                           @click="goto_hotel">确定
                        </div>
                    </div>
                </view>

            </view>


            <div class="announce-wrap columns is-mobile is-marginless bb10">
                <div class="column is-narrow announce-title">
                    <span class="iconfont icon-laba"></span> 公告
                </div>
                <div class="column announce-items">
                    <swiper class="swiper_container announce_list" vertical="true" autoplay="true" circular="true" interval="2000">

                                <swiper-item  v-for="item in page_data.anns">
                                    <div class="weui-media-box__bd swiper_item" @click="onNav" :data-url="'/pages/bra/common/ann_detail?id=' + item.id">
                                        <div class="weui-media-box__title f16">{{item.title}}</div>
                                    </div>
                                </swiper-item>

                    </swiper>
                </div>
            </div>

            <!--  naves  -->
            <view class="padded-v has-text-centered has-background-white bb10">

                <div class="columns is-mobile is-marginless bra-radius-5 f16">
                    <view @click="onNav" :data-url="item.mini_path" class="column is-one-fifth nav_s" v-for="item in page_data.nav_s">
                       <span class="nav-icon f24 has-text-info" v-html="item.image"></span>
                        <view class="f12">{{item.title}}</view>
                    </view>
                </div>

            </view>
            <div class="has-background-white" style="padding:10px">
                <div class="margined-v f14 fb">最新攻略</div>

                <view class="columns is-mobile is-gapless is-marginless is-multiline " >

                    <div class="column is-half " @click="onNav" :data-url="'/pages/hotel/news/detail?id=' + item.id" v-for="item in page_data.helps">

                        <view style="margin:5px">

                        <image v-if="item.annex[0]"  class="bra-radius-5" style="width:100%;display:block;height:320upx;"  :src="item.annex[0].url" mode="aspectFill" ></image>

                        <div class="f16 fb">  {{item.title}} </div>
                            <view style="width:100%;margin:5px 0 20px 0">
                        <div class="columns is-mobile is-marginless f12 is-marginless" >
                            <div class="column is-narrow">
                                <span class="has-text-grey">{{item.cate_id}}</span></div>
                            <div class="column"></div>
                            <div class="column is-narrow">
                                <span ><i class="icon-meiqitianranqi iconfont is-inline-block f12"></i>{{item.hits.base + item.hits.views}}</span>
                            </div>
                        </div>
                            </view>
                        </view>
                    </div>
                </view>

            </div>


            <!-- date picker for q  -->
            <view class="is-fixed zindex_1100 animated fadeInUp faster" style="position:fixed;bottom:0upx;height:58vh;"
                  v-show="show_picker &&
            is_page_loaded">
                <div @click="show_picker=false" class="bra_mask animated fadeIn" style="top:-58vh"></div>
                <bra_date_period :endDate="page_data.stop_date" :startDate="page_data.start_date" @callback="getDate"/>
            </view>
            <!-- date picker for z  -->
        </block>
    </view>
</template>

<script>
    const app = getApp();

    import item_hotel from '@/bra/hotel/item_hotel.vue';
    import uniList from "@/components/uni-list/uni-list.vue"
    import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
    import bra_date_period from '@/bra/forms/bra_date_period.vue'
    import bra_tts from '@/bra/utils/bra_tts.js';

    export default {
        components: {
            item_hotel, uniList, uniListItem, bra_date_period
        },
        data() {
            return {
                city_id: 0,
                area: {},
                page_name: 'hotel_index_index',
                module: 'hotel',
                indicatorDots: true,
                autoplay: true,
                interval: 3000,
                duration: 500,
                elements: [],
                page_data: {},
                is_page_loaded: false,
                room_type: 1,
                show_picker: false,
                picked_date: {},
                today_date: '',
                tomorrow_date: '',
                picked: {}  ,
                helps : []
            };
        },
        onLoad() {

        },
        onShow() {
            let area = uni.getStorageSync('area');

            if (this.is_page_loaded) {
                if (area.id != this.city_id) {
                    this.area = area;
                    this.city_id = area.id;
                    this.onMhcmsPull();
                }
            } else {
                this.onMhcmsPull();
            }
        },
        onPullDownRefresh() {
            this.onMhcmsPull();
            uni.stopPullDownRefresh();
        },
        methods: {
            locate_area: function (callback) {
                let area = uni.getStorageSync('area');
                console.log(this.city_id ,  area.id)
                if(this.city_id ==  area.id){
                    return '';
                }
                let that = this;
                uni.getLocation({
                    type: 'wgs84',
                    success: (res) => {
                        let action = that.bra_service("bra", 'lng_lat_area');
                        let promise = that.fetch(action, {
                            lat: res.latitude,
                            lng: res.longitude,
                            coordtype: "wgs84ll"
                        });
                        promise.then((data) => {
                            that.area = data.data;
                            this.city_id = that.area.id;
                            uni.setStorageSync('area', data.data);
                            typeof callback === "function" && callback(true);
                        })
                    },
                    fail: () => {
                        that.show_toast('位置信息获取失败');
                    },
                    complete: () => {
                    },
                });

            },
            getDate(date) {
                this.show_picker = false;
                date.room_type = this.room_type;
                this.picked = date;
            },
            onMhcmsPull() {
                let params = {};
                params.limit = 10;
                if (this.city_id > 0) {
                    params.area_id = this.city_id;
                }
                this.bra_common_page(this.module, this.page_name, params, false, (data) => {
                    this.page_data = this.elements.page_data;
                    this.is_page_loaded = true;
                    this.locate_area();
                    uni.stopPullDownRefresh();
                });
            },
            goto_hotel: function (e) {
                console.log(this.picked);
                this.set_cache('picked_date' , this.picked);
                let nav = {
                    url: '/pages/hotel/index/hotel',
                    type: 'navi'
                };
                this.onNav(nav);
            },
            changeIndicatorDots(e) {
                this.indicatorDots = !this.indicatorDots
            },
            changeAutoplay(e) {
                this.autoplay = !this.autoplay
            },
            intervalChange(e) {
                this.interval = e.target.value
            },
            durationChange(e) {
                this.duration = e.target.value
            },

        },
        created: function () {
            console.log();
        },
        watch: {
            show_picker: function (status) {
                if (status) {
                    this.set_pulldown(false);
                    uni.hideTabBar({});
                } else {
                    this.set_pulldown(true);
                    uni.showTabBar({});
                }
            }
        }
    };
</script>

<style lang="scss">
    .content{
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
    }
    .logo{
        height:200 rpx;
        width:200 rpx;
        margin-top:200 rpx;
        margin-left:auto;
        margin-right:auto;
        margin-bottom:50 rpx;
    }
    .text-area{
        display:flex;
        justify-content:center;
    }
    .title{
        font-size:36 rpx;
        color:#8f8f94;
    }



    /***************announce-wrap*****************/

    .announce-wrap{

        background: #f3eaec;
        padding:0 15px;

        .swiper_container {
            height: 80rpx;
        }
        .announce-title{
            line-height:80rpx;
            color: #ee544a;
            font-weight: bold;
            font-size:14px;
        }
        .announce_list .weui-media-box__title{
            padding:0 15px;
            line-height:80rpx;
            font-weight: 400;
            color: #f34a61;

        }

        .weui-panel__hd .is-pulled-right{
            color: #ff4500;
        }
    }

</style>
