<style>

</style>
<template>
    <view class="full_screen" style="overflow:hidden;">

        <view v-if="page_data.lyy" style="display:none;">
            <picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
                <div class="weui-cells">
                    <div class="weui-cell weui-cell_access weui-cell_example">
                        <div class="weui-cell__hd">

                        </div>
                        <div class="weui-cell__bd">
                            <view class="uni-input">{{date}}</view>
                        </div>
                        <div class="weui-cell__ft">历史收益</div>
                    </div>
                </div>

            </picker>

            <div class="bk10"></div>
        </view>

        <div class="bra-panel has-background-white margined " style="border-radius:0.3rem;min-height:292px">
            <div class="bra-header columns is-mobile is-marginless padded f14" style="line-height:38px">
                <div class="column"><i class="iconfont icon-ai49" style="margin-right:5px;display:inline"></i>工作收益</div>
				<div class="column is-narrow">
			<picker mode="date" :value="date" :start="startDate" @change="bindDateChange">
					<div class="bra-btn orange bra-radius-2 " style="padding:0 5px;height:30px;line-height:30px">
						<i class="iconfont icon-gengduo" style="margin-right:5px;display:inline"></i> 历史收益
					</div>
			</picker>
				</div>

            </div>

            <div class="bra-body" v-if="page_data.user">
                <div class="columns column is-marginless is-mobile is-multiline">
                    <div class="column is-12 has-text-centered" style="margin:25px 0 30px 0">
                        <div class="f14">总资产 (元)</div>
                        <div class="f28"><b>{{page_data.user.balance}}</b></div>
                    </div>

                    <div class="column is-6 has-text-centered">
                        <div class="f12">{{page_data.date_txt}} (元)</div>
                        <div class="f16"><b>{{page_data.total_date}}</b></div>
                    </div>

                    <div class="column is-6 has-text-centered">
                        <div class="f12">历史总收益 (元)</div>
                        <div class="f16"><b>{{page_data.total}}</b></div>
                    </div>
                </div>

                <div class="columns column is-marginless">

                </div>

            </div>
        </div>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                page_name: 'yxm_user_my_profit',
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
                pick_date: false,
                startDate: '2019-10-19',
                date: '2020-01-01',
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
            //      this.bra_list_res(0);
        },
        methods: {
            bindDateChange: function (e) {
                console.log(e.target)
                this.pick_date = e.target.value


            },
            onMhcmsPull() {
                let params = {};
                params.limit = 10;
                if (this.city_id > 0) {
                    params.area_id = this.city_id;
                }
                if (this.pick_date) {
                    params.date = this.pick_date;
                }
                console.log(params)
                this.bra_common_page(this.module, this.page_name, params, true, (data) => {
                    console.log(this.elements);
                    this.page_data = this.elements.page_data;
                    this.is_page_loaded = true;
                    this.date = this.page_data.date;
                    // this.bra_list_res(1);
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

        },
        watch: {
            pick_date: function (new_date) {
                this.onMhcmsPull();
            }
        }
    }
</script>
