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
            padding-top: 90upx;
            line-height: 45upx;
        }
        .income-desc{
            line-height: 45upx;
            font-size: 24upx;
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

    .card-item{
        background: #f5a623;
        color: #fff;
        border-radius: 8upx;
    }
</style>
<template>
    <view  class="is-fake-nav full_screen">

        <view class="menus tuandui-list" >

            <view v-for="item in page_data.cards" class="card-item">
            <item_card :item="item" @onPull="onMhcmsPull"></item_card>
            </view>

            <div class="item-card has-background-white padded bra-radius-5" @click="onNav" data-url="/pages/wallet/wallet_card_add">
                <div class=" uni-bg-red columns is-mobile is-marginless">

                    <div class="column">
                        <div class="item-esf-title f14 fb padded">  <i class="icon-tianjiajiahaowubiankuang iconfont padded-r"></i>添加银行卡</div>
                    </div>
                </div>

            </div>
        </view>


    </view>


</template>


<script>

    import item_card  from '@/bra/common/item_card.vue';
    const app = getApp();
    export default {
        components: {
             item_card
        },
        data() {
            return {
                page_name: 'bra_user_wallet_cards',
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
                keyword: '',

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

        },

        methods: {
            onMhcmsPull: function () {
                let params = this.params;
                let pagina_url = this.bra_common_page(this.module, this.page_name, params, true, (data) => {
                    this.page_data = this.elements.page_data;
                    this.is_page_loaded = true;
                    uni.stopPullDownRefresh();
                });
            }
        } ,
        watch : {

        }
    }
</script>

