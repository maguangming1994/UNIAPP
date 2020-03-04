<template>
    <view class="full_screen has-background-white" v-if="is_page_loaded">

        <div class="page__hd padded bb1" style="padding:20px">
            <div class="page__title f18 fb">用户协议</div>
        </div>

        <view v-html="page_data.member.reg_term" class="f16"  style="padding:20px"></view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                page_name: 'bra_index_reg_term',
                module: 'bra',
                is_page_loaded: false,
                opt: {},
                page_data: {},
                elements: {},
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
                params.id = this.opt.id;
                this.bra_common_page(this.module, this.page_name, params, false, (data) => {
                    this.page_data = this.elements.page_data;
                    this.is_page_loaded = true;

                    uni.stopPullDownRefresh();
                });
            },
        }
    }
</script>

<style>

</style>
