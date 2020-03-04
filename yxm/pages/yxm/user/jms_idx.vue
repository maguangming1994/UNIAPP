<template>
    <view class="full_screen">

        <view v-if="page_data.jms">
            <div class="weui-cells">
                <div class="weui-cell">

                    <div class="weui-cell__bd">
                        <p>{{page_data.jms.title}}</p>
                        <p style="font-size: 13px;color: #888888;">{{page_data.jms.type}} - {{page_data.jms.area_id}}
                            - {{page_data.jms.status}}</p>
                    </div>
                </div>

                <div class="weui-cell">
                    <div class="weui-cell__bd">
                        <span style="vertical-align: middle">仓库库存</span> <span class="weui-badge"
                                                                               style="margin-left: 5px;">{{page_data.jms.yj_amount}}</span>
                    </div>
                    <div class="weui-cell__ft">您的剩余的库存</div>
                </div>

                <div class="weui-cell">
                    <div class="weui-cell__bd">
                        <span style="vertical-align: middle">区域内管理员总数</span>
                    </div>
                    <div class="weui-cell__ft">

                        {{page_data.lyy_amount}}
                    </div>
                </div>

                <div class="weui-cell">
                    <div class="weui-cell__bd">
                        <span style="vertical-align: middle">区域内小幂总数</span>
                    </div>
                    <div class="weui-cell__ft">
                        {{page_data.yj_amount}}
                    </div>
                </div>


                <div class="weui-cell">
                    <div class="weui-cell__bd">
                        <span style="vertical-align: middle">昨日区域内新增管理员</span>
                    </div>
                    <div class="weui-cell__ft">
                        {{page_data.yesterday_lyy_amount}}
                    </div>
                </div>

                <div class="weui-cell">
                    <div class="weui-cell__bd">
                        <span style="vertical-align: middle">昨日管理员拿货</span>
                    </div>
                    <div class="weui-cell__ft">
                        {{page_data.yesterday_yj_amount}}

                    </div>
                </div>


                <div v-if="page_data.jms.old_data.status == 99" @click="onNav" class="weui-cell weui-cell_access braui-cell" data-url="/pages/yxm/user/jms_buy">
                    <div class="weui-cell__hd"><i class="icon-zhuanqian iconfont"></i></div>
                    <div class="weui-cell__bd">
                        <p>立刻进货</p>
                    </div>
                    <div class="weui-cell__ft"></div>
                </div>
            </div>
            <div class="weui-cells__title">您的库存记录</div>
            <!-- 酒店面板 -->
            <div class="weui-cells braui-cells bb10">
                <!-- all -->
                <div class="weui-cell weui-cell_access braui-cell" href="/house/cp_agent/index" style="padding:10px"
                     v-for="item in items">
                    <div class="weui-cell__hd">
                        <i class="iconfont icon-yijia"></i>
                    </div>
                    <div class="weui-cell__bd">
                        <p>{{item.operation}} <span v-if="item.amount > 0" class="has-text-success"
                                                    style="padding:0 15px">{{item.amount}} </span>
                            <span v-if="item.amount < 0" class="has-text-danger"
                                  style="padding:0 15px">{{item.amount}} </span>
                            个</p>
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
                page_name: 'yxm_jms_idx',
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
                let pagina_url = this.load_page(this.module, this.page_name, params, true, (data) => {
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
                let action = this.bra_service(this.module, 'list_jms_log', true);

                let $params = $this.params;
                $params.page = $this.loader.page;

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

        }
    }
</script>

<style>

</style>
