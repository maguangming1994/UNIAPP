<style>

    .yijia{
        margin:10px;
        padding:5px;
        background:#858585;
        border-radius:0.3rem;
        color:#d2d2d2;
    }
    .yijia.yijia1{
        background:#ffbc00;
        color:#fff;

    }
    .yijia.yijia99{
        background:#7ed321;
        color:#fff;

    }
    .yijia .iconfont{font-size:35px}

    .yijia-status{font-size:14px}
</style>
<template>
    <view class="full_screen">

        <view v-if="page_data.lyy">
            <div class="yijia-wrap has-text-centered columns is-mobile is-marginless is-multiline is-gapless">
                <div class="column is-3" v-for="item in items">
                    <div class="yijia yijia1" :class="'yijia'+item.old_data.status" >

                        <i class="iconfont icon-yijia"></i>

                        <div class="yijia-status">
                            {{item.status}}
                        </div>

                    </div>
                </div>
                <div class="column is-3  " @click="onNav" data-url="/pages/yxm/user/lyy_buy" v-for="i in page_data.lyy_lock">
                    <div class="yijia yijia0">

                        <i class="iconfont icon-yijia"></i>

                        <div class="yijia-status">
                            未领养
                        </div>
                    </div>
                </div>
                <div class="column is-3  " v-for="i in page_data.lyy_fix">
                    <div class="yijia yijia">

                        <i class="iconfont icon-yijia" style="opacity:0"></i>

                        <div class="yijia-status" style="opacity:0">
                            未领养
                        </div>
                    </div>
                </div>


            </div>
            <div class="weui-cells is-hidden">
                <div class="weui-cell">
                    <div class="weui-cell__hd" style="position: relative;margin-right: 10px;">
                        <div class="has-background-black" style="width: 50px;height:50px;display: block"></div>
                    </div>
                    <div class="weui-cell__bd">
                        <p>{{page_data.lyy.title}}</p>
                        <p style="font-size: 13px;color: #888888;">{{page_data.lyy.level_id}}</p>
                    </div>
                </div>

                <div class="weui-cell">
                    <div class="weui-cell__bd">
                        <span style="vertical-align: middle">您已经领养的衣架数量</span> <span class="weui-badge"
                                                                                     style="margin-left: 5px;">{{page_data.yj_amount}}</span>
                    </div>
                </div>

                <div class="weui-cell weui-cell_access braui-cell" @click="onNav" data-url="/pages/yxm/user/lyy_buy">
                    <div class="weui-cell__hd"><i class="icon-zhuanqian iconfont"></i></div>
                    <div class="weui-cell__bd">
                        <p>领养新衣架</p>
                    </div>
                    <div class="weui-cell__ft">领养新衣架</div>
                </div>
            </div>
            <div class="weui-cells__title is-hidden">您领养的衣架</div>
            <!-- 酒店面板 -->
            <div class="weui-cells braui-cells bb10 is-hidden">
                <!-- all -->
                <div class="weui-cell weui-cell_access braui-cell" href="/house/cp_agent/index" style="padding:10px"
                     v-for="item in items">
                    <div class="weui-cell__hd">
                        <img alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=" style="width:20px;height:20px;margin-right:16px;display:block">
                    </div>
                    <div class="weui-cell__bd">
                        <p>#{{item.id}} <span class="has-text-success"
                                                    style="padding:0 15px">{{item.status}} </span> </p>
                    </div>
                    <div class="weui-cell__ft">{{item.create_at}}</div>
                </div>

            </div>

            <div class="bk10"></div>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                page_name: 'yxm_lyy_idx',
                module: 'yxm',
                is_page_loaded: false,
                page_data: {},
                params: {},
                items: [],
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

            this.checkLogin((data) => {
                if (data) {
                    if (!this.is_page_loaded) {
                        this.onMhcmsPull();
                    }
                }
            }, !this.is_page_loaded, true)


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
                params.limit = 10;
                if (this.city_id > 0) {
                    params.area_id = this.city_id;
                }
                this.bra_common_page(this.module, this.page_name, params, true, (data) => {
                    console.log(this.elements);
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

        }
    }
</script>
