<style>
    .style-three {
        background-color: #378AE8;
        border: none;
        color: #fff;
    }
    .info-box{
        padding:15px 15px 15px 1.6rem;
    }
    .info-box:before {
        content: "";
        position: absolute;
        left: -.66rem;
        width: 2rem;
        height: 2rem;
        top: 50%;
        -webkit-transform: translate(-30%,-50%);
        transform: translate(-30%,-50%);
        -webkit-box-shadow: 3px 0 0 #aeadad;
        box-shadow: 3px 0 0 #aeadad;
        -webkit-border-radius: 80%;
        border-radius: 80%;
        background-color: #f5f5f5;
    }
    .coupon-item .nick {
        padding: .66% 0;
        color: #fff;
    }
    .coupon-item .coupon-money {
        width: 100%;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        align-items: center;
    }
    .coupon-item .coupon-money .lay:last-child {
        flex: 1;
        padding: 0 3%;
        line-height: 1rem;
    }
    .style-three .get-btn {
        background-color: #fff;
    }

    .style-one:after, .style-three .get-btn:after {
        content: "";
        width: 1.2rem;
        position: absolute;
        top: 0;
        bottom: 0;
        display: block;
        z-index: 9;
        background-color: #fff;
        background-position: 100% 35%;
        background-size: 2rem .66rem;
        background-image: linear-gradient(-45deg,#e5004f 25%,transparent 25%,transparent),linear-gradient(-135deg,#e5004f 25%,transparent 25%,transparent),linear-gradient(-45deg,transparent 75%,#e5004f 75%),linear-gradient(-135deg,transparent 75%,#e5004f 75%);
    }

    .style-three .get-btn:after {
        left: -30px;
        width:30px;
        background-image: linear-gradient(-45deg,#ffffff 25%,#378ae8 25%,#378ae8);
    }
</style>

<template>
    <view class="full_screen is-clipped" style="height:auto">
        <view class="padded">

        <view v-for="item in items">

            <div class="coupon-item f14">
                <div class="style-three columns is-mobile is-relative is-marginless bra-radius-5">
                    <div class="column is-relative info-box">
                        <p class="nick">{{item.title}}</p>
                        <div class="coupon-money">
                            <div class="lay of" style="font-size:30px;font-style:normal">￥<span>{{item.discount}}</span></div>
                            <div class="lay">
                                <p class="tit">优惠?</p>
                                <p class="demand">满{{item.min_amount}}元可用</p>
                            </div>
                        </div>
                    </div>
                    <div class="column is-narrow is-relative get-btn has-text-centered" style="padding: 10px 20px">
                        <image style="width:120upx;height:120upx;margin:auto;display:block" class="margined" src="http://yxm.jxgxnxs.cn/annex/1/20200130/ceaf50dc733f32213cc3d4d9dd2e7df3.png"></image>
                        <div><span class="bra-btn orange mini bra-radius-2" @click="get_coupon(item)">点击领取</span></div>
                    </div>
                </div>
            </div>
        </view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                page_name: 'hotel_index_coupon',
                module: 'hotel',
                page_data: {},
                is_page_loaded: false,

                params: {},
                items: [],
                loader: {
                    is_loading: false,
                    has_more: true,
                    page: 1
                },
            }
        },
        onShow() {
            if (!this.is_page_loaded) {
                this.onMhcmsPull();
            }

        },
        methods: {
            onMhcmsPull: function () {
                return this.bra_list_res(1);
            } ,
            get_coupon: function (item) {
                let params = {};
                params.id = item.id;
                params.act = 'get_coupon';

                this.bra_common_page(this.module, this.page_name, params, true, (ret) => {
                    let data = ret.data.page_data;
                    this.show_toast(data.msg);
                } , 'post' , false);
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


                let params = $this.params;
                params.page = $this.loader.page;
                params.status = this.status;
                this.bra_common_page(this.module, this.page_name, params, false, (ret) => {

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

