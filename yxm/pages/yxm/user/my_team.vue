<style lang="scss">
    #user {

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
    .is-bg-orange{
        background: #ff7528;
    }

</style>
<template>
    <view class="full_screen">

        <div class="bta-tabs columns is-mobile has-text-centered is-marginless orange" style="line-height:80upx">
            <div class="bta-tab column" @click="level=1" :class="{'bra-active' : level == 1}">一级团队 ({{page_data
                .level_1count}})</div>
            <div class="bta-tab column" @click="level=2" :class="{'bra-active' : level == 2}">二级团队 ({{page_data
                .level_2count}})</div>
        </div>

        <view class="menus tuandui-list" >
            <div class="weui-panel weui-panel_access">
                <div class="weui-panel__bd">

                    <div @click="onCall" :data-mobile="item.mobile" v-for="item in items" style="padding:10px"
                         class="weui-cell weui-cell_access braui-cell"
                          href="/house/cp_agent/index">

                        <div class="weui-cell__bd">
                            <p>{{item.user_name}}
                                <span  style="padding:0 15px"></span>
                            </p>


                            <div class="f12">
                                <span v-if="item.lyy"> {{item.lyy.title}} - {{item.lyy.level_id}} (小幂 {{item.yj_amount}} 个)</span>
                                <span v-if="!item.lyy"> 未激活</span>
                            </div>
                        </div>
                        <div class="weui-cell__ft" >{{item.create_at}}</div>
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
                page_name: 'bra_user_my_team',
                module: 'yxm',
                is_page_loaded: false,
                page_data: {} ,
                params: {},
                items: [],
                loader: {
                    is_loading: false,
                    has_more: true,
                    page: 1
                },
                level : 1 ,

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
                this.bra_common_page(this.module, this.page_name, params, true, (data) => {
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
                $params.level = this.level;
                this.bra_common_page(this.module, this.page_name, $params, true, (ret) => {

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
        } ,
        watch : {
            level : function (new_status) {
                this.bra_list_res(1);
            }
        }
    }
</script>

