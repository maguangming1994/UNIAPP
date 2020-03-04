<style>
    .is-flex .iconfont{
        font-size:23px;
    }
    .bra-step{
        min-width:30px;
        border:solid 1px #f3f3f3;
        text-align:center;
        line-height:32px;
        margin:0 15px;
    }
</style>
<template>
    <view class="is-flex">
        <i class="iconfont icon-tubiaozhizuomoban1" @click="dec()"></i>
        <span class="bra-step" :class="input_class">{{value}}</span>
        <view class=" column is-narrow faded" style="padding-left: 30upx" v-if="unit">{{unit}}</view>
        <i class="iconfont icon-zhaoshangxiaochengxu-jiahao" @click="inc()"></i>
    </view>
</template>

<script>

    export default {
        props: {
            default_value: {
                default: 1
            }
            ,
            unit: {
                type: String,
                default: ''
            },
            input_class: {
                type: String,
                default: ''
            },
            field_name: {
                type: String,
                default: ''
            } ,
            max : {
                default : 10000
            } ,
            min : {
                default : 1
            } ,
            step : {
                default : 1
            } ,
        },
        data: function () {
            return {
                extra_txt: '',
                value: ''
            }
        },

        methods: {
            inc : function(){
                if(this.value+ this.step <=  this.max  ){
                    this.value += this.step ;
                }
            },
            dec : function(){
                if(this.value - this.step >= this.min){
                    this.value -= this.step;
                }

            },
            out_put: function (arr) {
                console.log('mhcms out:', arr);
                this.$emit('updated', arr)
            },
        },

        created: function () {
            this.value = this.default_value;

            if (this.value) {
                let arr = [this.field_name, this.value];
                this.out_put(arr)
            }

        } ,
        watch : {
            value : function (new_val) {
                let arr = [this.field_name, this.value];
                this.out_put(arr)
            }
        }
    }
</script>
