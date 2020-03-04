<style lang="scss">
    #user {

    }
    .user-top{
        padding-top: 15upx;
        height: 320upx;

        .icons{
            position: absolute;
            top:15upx ;
            right: 15upx;
        }
        .iconfont {
            margin-right: 25upx;
            font-size: 40upx;
        }

    }

    .user-info{

        padding:0 30upx;

        .base-info{
            min-height: 150upx;

            .base-right{
                padding: 5upx 30upx;

                .mtag{
                    font-size: 24upx;
                    color: #fff;background: #76b5ff;
                    padding: 5upx 30upx;
                    border-radius: 8upx;
                    margin-left: 30upx;
                    font-weight: 300;
                }
                .summary{
                    color: #697685;
                    font-size: 26upx;
                }
            }
            .desc{
                font-size: 24upx;
                color: #697685;
            }
            .avatar-wrap{
                margin-top: -50%;

                .avatar{
                    width: 180upx;
                    height: 180upx;
                    border-radius: 50%;
                    box-shadow: 0 5upx 24upx #ac2803;
                }
            }
        }

    }

    .user-nos{
        .no{
            font-size: 36upx;
        }
        .txt{
            font-size: 24upx;
            color: #697685;
        }
        padding-bottom:37upx;
    }

    .menus{
        padding-left: 33upx;
        padding-right: 33upx;

        position: relative;
        background: #fff;
        font-size: 32upx;
        .item-menu{
            border-bottom: solid 1px #f0f5fb;
        }

        .icon-item{
            img{
                width: 50upx;
                height: 50upx;
                vertical-align: middle;
                margin-right: 24upx;
            }
        }
    }
    .user-top{

        text-align: center;
        .ref_code{
            margin-top: 105upx;
            font-size: 48upx;
        }
        .text{
            font-size: 32upx;
        }
        height: 400upx;
        overflow: hidden;
    }

    .rew_record{
        width: 400upx;
        height: 400upx;
        border-radius: 50% 50% 0 0;
        position: relative;
        margin: auto;
        bottom: -50%;
        box-shadow: 0 0 37upx #000;
        .income{
            padding-top: 60upx;
            line-height: 45upx;
            color:#fff;
        }
        .income-desc{
            line-height: 45upx;
            font-size: 24upx;
            margin:auto;
            width:45px;
            border-radius:5px;
            background:#f0ad4e;
            color:#fff;
            margin-top:15px;
        }
    }
    .is-bg-orange{
        background: #ff7528;
    }

    .rabs{

        font-size: 33upx;
        line-height: 80upx;
        color: #b23510;
    }

    .rabs .active{
        color: #fff;
    }
</style>
<template>
    <view class="full_screen">

        <span @click="onNav" data-url="/pages/wallet/wallet_cards" class="is-absolute f16 has-text-white" style="top:30px;right:30px"><i class="icon-wallet-card iconfont padded" ></i> 银行卡</span>


        <view class="user-top  is-bg-orange" style="z-index: -1" v-if="page_data.user">
            <view class="rew_record" >
                <view class="income">余额{{page_data.user.balance}}(元)</view>
                <div class="columns is-mobile is-marginless">


                    <view class="income-desc" @click="onNav" data-url="/pages/wallet/wallet_draw">提现</view>
                    <view class="income-desc" @click="onNav" data-url="/pages/wallet/wallet_deposit">充值</view>
                </div>
            </view>
        </view>


        <view class="rabs columns is-mobile is-marginless is-bg-orange has-text-centered" v-if="page_data.user">
            <div class="column" @click="unit_type=1" :class="{'active' : unit_type==1}">
                金币
            </div>
            <div class="column" @click="unit_type=2" :class="{'active' : unit_type==2}">
                积分 {{page_data.user.point}}
            </div>
        </view>
        <div class="weui-cells__title">资金变化记录</div>
        <view class="menus tuandui-list" >
            <div class="weui-panel weui-panel_access">
                <div class="weui-panel__bd">

                    <div v-for="item in items" style="padding:10px" class="weui-cell weui-cell_access braui-cell" href="/house/cp_agent/index">
                        <div class="weui-cell__hd">
                            <i v-if="unit_type==2" class="iconfont icon-jifen"></i>
                            <i v-if="unit_type==1" class="iconfont icon-yue"></i>
                        </div>
                        <div class="weui-cell__bd">
                            <p>{{item.pay_type}}
                                <span v-if="unit_type==2"
                                      :class="{'has-text-success' : item.point > 0 , 'has-text-danger' : item.point < 0}"  style="padding:0 15px">

                                {{item.point}} 个</span>

                                <span v-if="unit_type==1"
                                      :class="{'has-text-success' : item.total_fee > 0 , 'has-text-danger' : item.total_fee < 0}" style="padding:0 15px">

                                {{item.total_fee}} 元</span>

                            </p>
                            <p class="f12 has-text-grey">{{item.note}} </p>
                        </div>
                        <div class="weui-cell__ft" style="max-width:80px">{{item.create_at}}</div>
                    </div>

                </div>

            </div>
        </view>

        <view class="page-tips">
            <div class="weui-loadmore weui-loadmore_line">
                <span class="weui-loadmore__tips">暂无数据</span>
            </div>
        </view>

    </view>


</template>


<script>

    export default {
        data() {
            return {
                page_name: 'bra_wallet_index',
                module: 'bra',
                is_page_loaded: false,
                page_data: {} ,
                params: {},
                items: [],
                loader: {
                    is_loading: false,
                    has_more: true,
                    page: 1
                },
                unit_type : 1
            };
        },
        onLoad() {
            this.onMhcmsPull(1);
        },
        onShow() {
        },

        onPullDownRefresh() {
            this.onMhcmsPull();
            uni.stopPullDownRefresh();
        },
        onReachBottom: function () {

            this.bra_list_res(0);
        },

        methods: {

            onMhcmsPull() {
                let params = {};
                this.load_page(this.module, this.page_name, params, true, (data) => {
                    this.page_data = this.elements.page_data;
                    this.is_page_loaded = true;
                    this.bra_list_res(1);
                    uni.stopPullDownRefresh();
                });
            },

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
                let action = this.bra_service(this.module, 'list_wallet_log' , true);

                let $params = $this.params;
                $params.page = $this.loader.page;
                $params.unit_type = this.unit_type;

                let promise = this.fetch(action, $params);

                promise.then(ret => {
                    uni.stopPullDownRefresh();

                    $this.loader.has_more = ret.data.data.length > 0;
                    $this.loader.is_loading = false;

                    if ($this.loader.has_more) {
                        $this.loader.page++;
                    }

                    if (init === 1) {
                        $this.items = ret.data.data;
                    } else {
                        $this.items = $this.items.concat(ret.data.data);
                    }

                }, error => {
                    $this.loader.is_loading = false;
                });
            },
        } ,
        watch : {
            unit_type : function (new_status) {
                this.bra_list_res(1);
            }
        }
    }
</script>

