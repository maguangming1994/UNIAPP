<template>
    <view v-if="is_page_loaded">
        <web-view :src="page_data.site_config.kefu_link"></web-view>

    </view>
</template>

<script>
    export default {
        data() {
            return {

                page_name: 'bra_index_kefu',
                module: 'bra',
                page_data: {},
                is_page_loaded: false,
            }
        },
        onBackPress: function () {
            uni.redirectTo({
                url: '/pages/hotel/index/index'
            });

            //this.onBack();
            return false;
        },
        onNavigationBarButtonTap(e) {

            console.log("点击了自定义按钮" , e);
            this.onNav({
                url: '/pages/hotel/index/index' , type : 'switch'
            });

        },
        onLoad() {
            this.onMhcmsPull(1);
        },
        methods: {
            onMhcmsPull: function () {
                let params = this.params;
                this.bra_common_page(this.module, this.page_name, params, false, (data) => {
                    this.page_data = this.elements.page_data;
                    this.is_page_loaded = true;
                    uni.stopPullDownRefresh();
                });
            }
        }
    }
</script>

<style>

</style>
