<template>
    <view class="full_screen has-background-white" v-if="is_page_loaded && page_data.detail">

            <div class="page__hd padded bb1" style="padding:20px">
                <div class="page__title f18 fb">{{page_data.detail.title}}</div>
                <div class="columns is-mobile f14 margined-v has-text-grey">
                    <div class="column is-narrow">
                        <div class="has-background-light has-text-grey-light bra-radius-3" style="padding:0 5px">{{page_data.detail.cate_id}}</div>
                    </div>
                    <div class="column"></div>
                    <div class="column is-narrow"><i class="icon-meiqitianranqi iconfont is-inline-block f12 padded-h"> </i> {{page_data.detail.hits.base + page_data.detail.hits.views}}</div>

                </div>
            </div>

            <view v-html="page_data.detail.old_data.content" class="f16"  style="padding:20px"></view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                page_name: 'bra_index_help_detail',
                module: 'bra',
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
                this.bra_common_page(this.module, this.page_name, params, false, (data) => {
                    this.page_data = this.elements.page_data;
                    this.is_page_loaded = true;
                    uni.stopPullDownRefresh();
                });
            },
            show_share: function (e) {
                const dataset = e.currentTarget.dataset, status = dataset.status;
                this.show_share = status;
            },
        }
    }
</script>

<style>
img,image{
    max-width:100%;
}
</style>
