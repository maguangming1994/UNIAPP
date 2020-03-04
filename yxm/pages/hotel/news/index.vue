<template>
    <view class="full_screen" v-if="is_page_loaded">
        <scroll-view class="bra-scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="120" :scroll-into-view="current_id">
            <view :id=" 'scroll_all'" @click="change_cate(false)" :class="{active : current_id=='scroll_all'}" class="bra-scroll-view-item_H uni-bg-red" >全部</view>

            <view :id=" 'scroll' + item.id" @click="change_cate(item)" :class="{active : current_id=='scroll' + item.id }" class="bra-scroll-view-item_H uni-bg-red" v-for="item in page_data.cate_ids">{{item.title}}</view>
        </scroll-view>

        <div class="weui-panel__bd has-background-white">

            <view class="columns is-mobile is-gapless is-marginless is-multiline " >

                <div class="column is-half " @click="onNav" :data-url="'/pages/hotel/news/detail?id=' + item.id" v-for="item in items">

                    <view style="margin:5px">

                        <image v-if="item.annex[0]"  class="bra-radius-5" style="width:100%;display:block;height:320upx;"  :src="item.annex[0].url" mode="aspectFill" ></image>

                        <div class="f16 fb">  {{item.title}} </div>
                        <view style="width:100%;margin:5px 0 20px 0">
                            <div class="columns is-mobile is-marginless f12 is-marginless" >
                                <div class="column is-narrow">
                                    <span class="has-text-grey">{{item.cate_id}}</span></div>
                                <div class="column"></div>
                                <div class="column is-narrow">
                                    <span ><i class="icon-meiqitianranqi iconfont is-inline-block f12"></i> {{item.hits.base + item.hits.views}}</span>
                                </div>
                            </div>
                        </view>
                    </view>
                </div>
            </view>
        </div>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                page_name: 'bra_index_help',
                module: 'bra',
                is_page_loaded: false,
                opt: {},
                page_data: {},
                elements: {},
                scrollTop: 0,
                old: {
                    scrollTop: 0
                } ,
                current_id : 'scroll_all' ,
                cate_id : '',
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
            onMhcmsPull() {
                let params = {};
                this.bra_common_page(this.module, this.page_name, params, false, (data) => {
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


                let $params = $this.params;
                $params.page = $this.loader.page;
                $params.cate_id = this.cate_id;
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
            scroll: function(e) {
                this.old.scrollTop = e.detail.scrollTop
            },
            change_cate : function (item) {
                if(!item){
                    this.current_id = 'scroll_all';
                    this.cate_id = false;
                }else{
                    this.current_id = 'scroll' + item.id;
                    this.cate_id = item.id;
                }

            }
        } ,
        watch : {
            cate_id : function (new_cate_id) {
                this.onMhcmsPull();
            }
        }
    }
</script>

<style>

    .bra-scroll-view_H{
        white-space: nowrap;
        display: inline-block;
        background: #fff;
        height: 80upx;
    }
    .bra-scroll-view_H .bra-scroll-view-item_H{
        display: inline-block;
        overflow: hidden;
        font-size: 32upx;
        padding: 5upx 20upx;
        line-height: 80upx;
    }

    .bra-scroll-view_H .bra-scroll-view-item_H.active{
        color: #ff7852;
        border-bottom: solid 2px #ff7852;
        margin-top: -2px;
        font-weight:bold;
        font-size:20px;
    }
</style>
