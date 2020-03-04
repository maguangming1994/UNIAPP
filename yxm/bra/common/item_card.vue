


<style>

    .unbind{
        position: absolute;
        color: #fff;
        width: 65upx;
        height: 45upx;
        line-height: 45upx;
        border-radius: 5upx;
        text-align: center;
        border: solid 1px #fff;
        bottom: 25upx;
        right: 30upx;
    }

    .item-card{
        padding: 33upx;
        margin-top: 33upx;
        border-radius: 8upx;
    }
    .item-card .address{
        font-size: 26upx;
        overflow: hidden;
        font-weight: 300;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 100%;

        line-height:88upx;
    }
    .item-comp  .is-narrow{
        margin-right: 20upx;
    }
    .item-comp img{
        width: 300upx;
        height: 221upx;
        border-radius: 5px;
    }
    .item-comp .avatar{
        width: 150upx;
        height: 150upx;
        border-radius: 50%;
        box-shadow: 0 0 5px #ccc;
    }
    .item-comp{
        margin-top: 30upx;
        padding-bottom: 30upx;
    }
    .item-comp img{
        width: 150upx;
        height: 150upx;
        border-radius: 50%;
    }
    .rec_agents img{
        width: 45upx;
        height: 45upx;
        border-radius: 50%;
        margin-right: 15upx;
        margin-top: 16upx;
    }
    .cert-btn{
        background: #7ed321;
        color: #fff;
        font-size: 20upx;
        line-height: 40upx;
        display: inline-block;
        padding: 0 15upx;
        margin-left: 24upx;
        border-radius: 6upx;
        font-weight: 300;
    }
    /** esf end */

</style>
<template>
    <view style="position: relative">
        <div class="item-card" wx:key="test2" >
            <div class=" uni-bg-red columns is-mobile is-marginless">


                <div class="column">
                    <div class="item-esf-title f16 fb">{{item.bank_id}}
                    </div>
                    <div class="address f14">
                        {{item.real_name}} |  卡号 {{item.card_no}}
                    </div>

                </div>
            </div>


            <div class="unbind f12 faded padded-h" @click="unbind(item.id)">
                解绑
            </div>
        </div>


    </view>
</template>
<script>

    export default {
        components: {
        },
        props: {
            item: {}
        },
        methods: {
            unbind :function (id) {
                uni.showModal({
                    title: '提示' ,
                    content: '您确定要解绑吗?',
                    success: (res) => {
                        if (res.confirm) {

                            this.bra_common_page('bra', 'wallet_del_users_card' , {id :id } , true , ()=>{
                                this.$emit('onPull' , []);
                            });

                        } else if (res.cancel) {

                        }
                    }
                });
            }
        }
    };
</script>