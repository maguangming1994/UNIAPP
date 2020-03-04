<template>
    <view class="is-flex">

        <input :class="input_class" :placeholder="placeholder" :type="mini_type" @blur="hide_clear"
               @focus="show_clear = true" @input="inputs_change($event)" autofocus="" v-model="value">

        <view class=" column is-narrow faded" style="padding-left: 30upx" v-if="unit">{{unit}}</view>

        <span @click="clear_val()" class="weui-btn_reset weui-btn_icon" v-show="show_clear && value.length >
         0">
            <i class="weui-icon-clear"></i>
        </span>

    </view>
</template>

<script>

    export default {
        props: {
            default_value: {
                default: ''
            }
            ,
            unit: {
                type: String,
                default: ''
            },
            mini_type_prop: {
                type: String,
                default: 'text'
            },
            placeholder: {
                type: String,
                default: ''
            },
            show_extra: {
                default: false
            },
            input_class: {
                type: String,
                default: 'weui-input'
            },
            field_name: {
                type: String,
                default: ''
            }
        },
        data: function () {
            return {
                mini_type: '',
                extra_txt: '',
                value: '',
                show_clear: false
            }
        },

        methods: {
            out_put: function (arr) {
                console.log('mhcms out:', arr);
                this.$emit('updated', arr)
            },
            inputs_change: function (e) {
                let arr = [this.field_name, e.target.value];
                this.out_put(arr)
            },
            hide_clear: function () {
                setTimeout(() => {
                    this.show_clear = false
                }, 100);

            } ,
            clear_val : function () {
                this.value='';
                let arr = [this.field_name,this.value];
                this.out_put(arr)
            }
        },

        created: function () {
            this.mini_type = this.mini_type_prop;
            this.value = this.default_value;



            if(this.value){
                let arr = [this.field_name, this.value];
                this.out_put(arr)
            }

        }
    }
</script>
