<template>
    <view>

        <view id="input_text" v-if="page_data.field">
            <div class="weui-cells weui-cells_form" v-if="page_data.field.slug">
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label class="weui-label" style="width:80px">{{page_data.field.slug}}</label></div>
                    <div class="weui-cell__bd has-text-grey">
                        <bra_input :default_value="value" :field="field" @updated="update_val"></bra_input>
                    </div>
                </div>
            </div>
        </view>

        <div class="weui-btn-area">
            <a @click="update_field" class="bra-btn orange normal is-block">保存</a>
        </div>

    </view>
</template>

<script>
    const app = getApp();


    import bra_level_picker from '@/bra/forms/bra_level_picker.vue';
    import bra_input from '@/bra/forms/bra_input.vue';

    export default {
        components: {
            bra_input
        },
        data() {
            return {
                page_name: 'bra_user_field_update',
                module: 'bra',
                elements: {},page_data : {},
                field_name: '',
                model_id: '',
                value: '',
                field: {},
                is_page_loaded : false
            };
        },
        onLoad(options) {
            this.model_id = options.m;
            this.field_name = options.f;
            this.value = options.v;
        },
        onShow : function(){
          if(!this.is_page_loaded){

              this.onMhcmsPull();
          }
        },
        methods: {
            onMhcmsPull: function () {
                let params = {};
                params.model_id = this.model_id;
                params.field_name = this.field_name;
                this.bra_common_page(this.module, this.page_name, params, true, (data) => {
                    console.log(data);
                    this.page_data = this.elements.page_data;
                    if(this.page_data && this.page_data.user){
                        this.is_page_loaded = true;
                    }

                    uni.setNavigationBarTitle({
                        title: '设置' +  this.page_data.field.slug
                    });
                    uni.stopPullDownRefresh();
                });

            },
            activeFc: function (data) {
                console.log(data);

            },
            update_val: function (n) {
                console.log(n);
                this.value = n[1];
            },
            update_field: function () {
                if (!this.value || this.value.length <= 0) {
                    uni.showToast({
                        icon: "none",
                        title: '必须填写',
                        duration: 2000
                    });
                } else {
                    let params = {};
                    params.model_id = this.model_id;
                    params.field_name = this.field_name;
                    params.value = this.value;
                    this.bra_common_page(this.module, this.page_name, params, true, (data) => {
                        console.log(data);

                        this.onBack();
                        uni.stopPullDownRefresh();
                    } , 'post' , false);
                }
            }
        }
    }
</script>