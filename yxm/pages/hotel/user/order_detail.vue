<template>
    <view class="full_screen" v-if="is_page_loaded">
        <div class="bra-radius-5 hotel bra-pic-item has-background-white  padded bb10" style="margin:0 15px ">
            <div class="columns is-mobile is-gapless is-marginless bb1 padded-v" @click="onNav" :data-url="'/pages/hotel/user/order_detail?id='+ page_data.item.id">
                <div class="column is-narrow">
                    <div class="img has-shadow" style="width:40px;height:40px;margin-right:10px">
                        <image v-if="page_data.store.logo[0]" style="width:40px;height:40px" :src="page_data.store.logo[0].url" mode="aspectFill"></image>
                    </div>
                </div>
                <div class="column f14" style="width:0">
                    <div class="f14 fb">{{page_data.store.title}}
                        <span class="has-text-danger f14 is-pulled-right">
								<span style="font-size:10px;color:#333;font-weight:normal">含押金</span> <span class="iconfont icon-renminbi1688"></span> {{page_data.item.money}}

							</span>
                    </div>
                    <div class="has-text-left margined-v">
                        <view>
                            {{page_data.item.rooms}} 间 , {{page_data.item.room_type_id}}

                            <span class="has-text-info f14 is-pulled-right">{{page_data.item.status}}</span>
                        </view>

                    </div>

                    <div class="has-text-left">
                        <view class="has-text-grey f12">
                            {{page_data.item.create_at}}
                        </view>

                    </div>

                </div>
            </div>
            <div class="column is-12 bra-pic-list-footer f12 padded-t has-text-right">
                <div @click="delete_order(page_data.item)" class="bra-btn margined-h mini is-inline-block orange" v-if="page_data.item.old_data.status==6 || page_data.item.old_data.status==5">删除订单</div>
                <div @click="onNav"
                     :data-url="'/pages/hotel/index/hotel_detail?id='+ page_data.store.id" class="bra-btn margined-h mini is-inline-block orange">再次预定
                </div>
                <div @click="cancel_order(page_data.item)" class="bra-btn margined-h mini is-inline-block orange" v-if="page_data.item.old_data.status==1">取消订单</div>
                <div class="bra-btn margined-h mini is-inline-block orange" v-if="page_data.item.old_data.status==1">立刻支付</div>

            </div>
        </div>

        <!-- hotel info -->
        <div class="weui-cells braui-cells bra-radius-2 is-clipped bb10" style="margin:0 10px">
            <div class="weui-cell weui-cell_access braui-cell">
                <div class="weui-cell__hd fb">
                    酒店 :
                </div>
                <div class="weui-cell__bd  has-text-grey">
                    <p> {{page_data.store.title}}</p>
                </div>
                <div class="weui-cell__ft"></div>
            </div>
            <div class="weui-cell weui-cell_access braui-cell " >
                <div class="weui-cell__hd fb">
                    地址 :
                </div>
                <div class="weui-cell__bd  has-text-grey">
                    <p> {{page_data.store.address}}</p>
                </div>
                <div class="weui-cell__ft"></div>
            </div>
        </div>
        <!-- order info -->
        <div class="weui-cells braui-cells bra-radius-2 is-clipped" style="margin:0 10px">
            <div class="weui-cell weui-cell_access braui-cell">
                <div class="weui-cell__hd fb">
房型:
                </div>
                <div class="weui-cell__bd  has-text-grey">
                    <p> {{page_data.item.room_type_id}} : {{page_data.item.rooms}} 间</p>
                </div>
                <div class="weui-cell__ft"></div>
            </div>
            <div class="weui-cell weui-cell_access braui-cell " >
                <div class="weui-cell__hd fb">
                    入住时间 :
                </div>
                <div class="weui-cell__bd  has-text-grey">
                    <p> {{page_data.item.pre_in_at}}</p>
                </div>
                <div class="weui-cell__ft"></div>
            </div>
            <div class="weui-cell weui-cell_access braui-cell " >
                <div class="weui-cell__hd fb">
                    预计离店 :
                </div>
                <div class="weui-cell__bd  has-text-grey">
                    <p> {{page_data.item.pre_out_at}}</p>
                </div>
                <div class="weui-cell__ft"></div>
            </div>
        </div>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                page_name: 'hotel_index_order_detail',
                module: 'hotel',
                is_page_loaded: false,
                opt: {},
                page_data: {},
                elements: {},
            }
        },
        onLoad(opt) {
            this.opt = opt;
            console.log(opt)
        },
        onShow() {
            if (!this.is_page_loaded) {
                this.onMhcmsPull();
            }
        },
        methods: {
            onMhcmsPull() {
                let params = {};
                params.id = this.opt.id;
                this.bra_common_page(this.module, this.page_name, params, true, (data) => {
                    this.page_data = this.elements.page_data;
                    this.is_page_loaded = true;
                    uni.stopPullDownRefresh();
                });
            },

            delete_order : function(item){
                uni.showModal({
                    title: '警告',
                    cancelText : '取消' ,
                    confirmText : '删除' ,
                    content: '您好 您确定要删除订单吗!',
                    success:  (res) => {
                        if (res.confirm) {
                            let params = {};
                            params.id = item.id;
                            this.bra_common_page(this.module, 'hotel_order_delete', params, true, (ret) => {
                                console.log(ret)

                                let data = ret.data.page_data;
                                this.show_toast(data.msg);
                                if(data.code == 1){

                                    return this.onBack();
                                }else{
                                    return this.show_toast(data.msg);
                                }

                            } , 'post' , false);
                        }
                    }
                });
            },
            cancel_order : function(item){
                uni.showModal({
                    title: '警告',
                    cancelText : '关闭' ,
                    confirmText : '取消订单' ,
                    content: '您好 您确定要取消订单吗!',
                    success:  (res) => {
                        if (res.confirm) {
                            let params = {};
                            params.id = item.id;
                            this.bra_common_page(this.module, 'hotel_order_cancel', params, true, (ret) => {
                                console.log(ret)

                                let data = ret.data.page_data;
                                this.show_toast(data.msg);
                                if(data.code == 1){

                                    return this.onMhcmsPull();
                                }else{
                                    return this.show_toast(data.msg);
                                }

                            } , 'post' , false);
                        }
                    }
                });
            },
        }
    }
</script>

<style>

</style>
