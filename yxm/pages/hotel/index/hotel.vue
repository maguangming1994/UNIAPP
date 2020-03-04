<style>
    .column.bra-active{color:#007aff}
</style>
<template>
    <view class="full_screen ">
        <view class="is-fixed zindex_1100" style="top:0;left:0;right:0">
        <!-- header -->
        <div class="bra-header f14 padded is-relative zindex_300" style="background-color:#7dc2ff;padding-top:58upx">
            <div class="columns is-mobile is-marginless is-gapless" style="align-items: center;">
                <div class="bra-back column is-narrow" @click="onBack">
                    <i class="iconfont weui-icon-back" style="color:#f3f3f3"></i>
                </div>
                <div class="bra-back column">
                    <div class="columns is-mobile" style="    background: aliceblue;
    border-radius: 15px;
    padding: 0 15px;
    margin: 0 15px;">
                        <div class="column is-narrow">
                            <p>{{picked_date.startDate.month}}-{{picked_date.startDate.day}}</p>
                            <p>{{picked_date.endDate.month}}-{{picked_date.endDate.day}}</p>
                        </div>
                        <div class="column">
                            <input class="bra-input" placeholder="酒店/地名/关键词" style="padding-left:30px;margin:10px 0"
                                   type="text">
                        </div>
                    </div>

                </div>
                <div class="bra-back column is-narrow" @click="onNav" data-url="/pages/bra/common/change_area">
                    {{area.title}}
                </div>
            </div>
        </div>

        <!-- bra-filter -->
        <div class="bra-filter f12">

            <div
                    class="bra-tabs columns is-marginless zindex_300 is-relative is-mobile has-text-centered has-background-white has-shadow"
                    style="line-height:2.5rem">
                <div :class="{'bra-active' : params.area_id}" @click="show_filter('area_id')" class="column">区域</div>
                <div :class="{'bra-active' : params.distance}" @click="show_filter('distance')" class="column">距离</div>
                <div :class="{'bra-active' : params.price}" @click="show_filter('price')" class="column">价格</div>
                <div :class="{'bra-active' : params.star}" @click="show_filter('star')" class="column">星级</div>
                <div :class="{'bra-active' : params.order}" @click="show_filter('order')" class="column">排序</div>
            </div>

            <div class="filter_body" style="padding-top:1px">
                <div @click="hide_filter()" class="bra_mask animated fadeIn zindex_200" v-show="show_mask"></div>

                <div
                     class="hide-content area_id animated  fadeIn  faster zindex_500 is-relative"
                     v-show="this.filters['area_id']">
                    <filter_area :field_name="'area_id'" @updated="change_opt"
                                   :items="page_data.area_id_opts"></filter_area>

                </div>
                <!-- dis -->

                <div  class="hide-content distance animated fadeIn faster zindex_500 is-relative"
                     v-show="this.filters['distance']">
                    <filter_single :field_name="'distance'" @updated="change_opt" :items="distance_opts" :is_muti="false"></filter_single>

                </div>
                <!-- price -->

                <div
                     class="hide-content price animated fadeIn faster zindex_500 is-relative"
                     v-show="this.filters['price']">
                    <filter_single :field_name="'price'"  @updated="change_opt" :items="price_opts"></filter_single>
                </div>

                <!-- star -->

                <div
                     class="hide-content star animated fadeIn faster zindex_500 is-relative" v-if="page_data.star_opts"
                     v-show="this.filters['star']">
                    <filter_single :field_name="'star'" @updated="change_opt" :items="page_data.star_opts"></filter_single>
                </div>

                <!-- order -->

                <div
                     class="hide-content order animated fadeIn faster zindex_500 is-relative"
                     v-show="this.filters['order']">
                    <filter_single :field_name="'order'" @updated="change_opt" :items="order_opts"></filter_single>
                </div>
            </div>
        </div>

        </view>
        <!-- bra-hotels -->
        <view style="height:260upx"></view>

        <div class="hotels bra-pic-list is-clipped" style="background:#f2f2f2">
            <div @click="onNav" :data-url="'/pages/hotel/index/hotel_detail?id=' + item.id" v-for="item in items"
                 class="bra-radius-2 hotel bra-pic-item has-background-white margined padded">
                <div class="columns is-mobile is-gapless is-marginless">
                    <div class="column is-narrow">
                        <div class="img " style="width:120px;height:80px;margin-right:10px">
                            <image v-if="item.logo[0]" style="width:120px;height:80px" :src="item.logo[0].url" mode="aspectFill"></image>
                        </div>
                    </div>

                    <div class="column f14" style="width:0">
                        <div class="f14 fb">{{item.title}}</div>
                        <div class="f12"><rate_star :point="4"></rate_star></div>
                        <div class="f14 has-text-grey">{{item.address}}</div>
                        <div class="has-text-right">
                            <view v-if="item.min_room_type">
                                <span class="has-text-danger f24">
                                    <span
                                        class="iconfont icon-renminbi1688"></span>{{item.min_room_type
                                .price}}</span>
                                <span
                                    class="f12 padded-h">起
                            </span>
                            </view>

                        </div>
                    </div>
                </div>

            </div>
        </div>

    </view>
</template>
<script>
    const app = getApp();

    import filter_single from '@/bra/filter/single.vue';
    import filter_area from '@/bra/filter/area.vue';
    import rate_star from '@/bra/common/rate_star.vue';

    export default {
        components: {
            filter_single , filter_area , rate_star
        },
        data() {
            return {
                page_name: 'hotel_index_hotel',
                module: 'hotel',
                is_page_loaded: false,

                show_mask: false,
                filters: {
                    area_id: false,
                    star: false,
                    distance: false,
                    price: false,
                    order: false
                },
                elements: [],
                page_data: {},
                price_opts: [
                    {id: '0-100', title: '0-100元'},
                    {id: '100-150', title: '100-150元'},
                    {id: '150-200', title: '150-200元'},
                    {id: '200-250', title: '200-250元'},
                    {id: '250-300', title: '250-300'},
                    {id: '300-350', title: '300-350元'}
                ],
                order_opts: [
                    {id: 'id-desc', title: '智能排序',},
                    {id: 'distance-asc', title: '距离排序',},
                    {id: 'views-asc', title: '人气有限',},
                    {id: 'rate-asc', title: '好评优先',},
                    {id: 'price-asc', title: '低价优先',},
                    {id: 'price-desc', title: '高价优先',},
                ],
                distance_opts: [
                    {id: '0.3', title: '300米'},
                    {id: '500', title: '500米'},
                    {id: '1000', title: '1000米'},
                    {id: '1500', title: '1500米'},
                    {id: '3000', title: '3000米'},
                    {id: '5000', title: '5000米'}
                ] ,
                params : {
                    area_id : false ,
                    star :  false ,
                    price : false ,
                    distance : false ,
                    order :false
                } ,
                city_id : false ,
                picked_date : false ,
                items : [] ,
                loader: {
                    is_loading: false,
                    has_more: true,
                    page: 1
                },
            }
        },
        onLoad() {
        },
        onShow() {

            this.picked_date = this.get_cache('picked_date');
            this.area = this.get_cache('area');

            if (!this.is_page_loaded) {
                this.city_id = this.area.id;
                this.onMhcmsPull();
            }else{
                if(this.city_id && this.area.id != this.city_id){
                    this.city_id = this.area.id;
                    this.onMhcmsPull();
                }
            }

        },
        onPullDownRefresh() {
            this.onMhcmsPull();
            uni.stopPullDownRefresh();
        },
        methods: {
            onMhcmsPull() {
                let params = {
                    city_id : this.city_id
                };

                params.limit = 10;
                console.log(this.params);
                this.bra_common_page(this.module, this.page_name, params, false, (data) => {
                    this.page_data = Object.assign({}, this.elements.page_data);
                    this.is_page_loaded = true;
                    this.bra_list_res();
                    uni.stopPullDownRefresh();
                });
            },
            change_opt: function (value) {
                this.hide_filter();
                console.log(value);

                    if(value[1]){
                        this.params[value[0]] = value[1];
                    }else{
                        delete this.params[value[0]];
                    }
                this.params = Object.assign({}, this.params);

                console.log(this.params)
            },

            hide_filter: function () {
                this.filters = {
                    area_id: false,
                    star: false,
                    distance: false,
                    price: false,
                    order: false
                };
                this.show_mask = false;
            },
            show_filter: function (name) {

                for (let key in this.filters) {
                    if (key == name) {
                        this.show_mask = this.filters[name] = !this.filters[name];

                    } else {
                        this.filters[key] = false;

                    }
                }

            } ,


            bra_list_res: function (init) {

                let $this = this;
                if (init === 1) {
                    $this.items = [];
                    $this.loader.page = 1;
                    $this.loader.is_loading = false;
                    $this.loader.has_more = true;
                }

                if ($this.loader.is_loading || !$this.loader.has_more) {
                    return;
                }
                $this.loader.is_loading = true;

                let $params = {};
                for (let key in this.params){
                    if(this.params[key] || this.params[key].length > 0){
                        params[key] = this.params[key];
                    }
                }

                $params.page = $this.loader.page;
                this.bra_common_page(this.module, this.page_name, $params, false, (ret) => {

                    let data = ret.data.page_data;
                    console.log(ret);
                    this.is_page_loaded = true;

                    $this.loader.has_more = data.data.length > 0;
                    $this.loader.is_loading = false;

                    if ($this.loader.has_more) {
                        $this.loader.page++;
                    }

                    $this.items = init === 1 ? data.data : $this.items.concat(data.data);

                    uni.stopPullDownRefresh();
                }, 'post', false);

            },
        }
    }
</script>
