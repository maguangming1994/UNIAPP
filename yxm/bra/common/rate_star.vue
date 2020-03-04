<template>
    <view style="display: inline-block">
        <view class="starts" style="display: inline-block">
            <view class="star">
                <block v-for="(n,index) in max_point" >
                    <view :data-no="n" :data-star="star_no" @click="set_point" class="icon-wrap">
                        <i :style="{fontSize:fontSize , color: color}" class="iconfont icon-star-full" v-if="n <=
                        star_no"></i>
                        <i :style="{fontSize:fontSize , color: no_color}" class="iconfont icon-star-full" v-if="n > star_no"></i>
                    </view>
                </block>


            </view>
        </view>
    </view>
</template>


<script>
    export default {
        props: {
            point: {
                default: 0
            },
            fontSize: {
                default: '30upx'
            },
            color: {
                default: '#ffbf52'
            },
            no_color: {
                default: '#ccc'
            },
            max_point: {
                default: 5
            },
            allow_change: {
                default: false
            } ,
            field_name : {
                default: ''
            },

        },
        data: function () {
            return {
                star_no:0
            }
        },
        methods: {
            set_point: function (e) {
                if(this.allow_change){
                    this.star_no = e.currentTarget.dataset.no + 1;
                    this.$emit('change', [this.field_name , this.star_no]);
                }

            } ,
            set_point_m: function (no) {
                this.star_no = no;
                this.$emit('change', [this.field_name , this.star_no]);
            }
        },
        created: function () {
            this.set_point_m(this.point);
        },
        computed: {
            blank_star: function () {
                return this.max_point - this.star_no;
            }
        }
         ,
        watch : {
            point : function (new_point) {
                this.set_point_m(new_point);
            }
        }

    };
</script>

<style>
    .icon-wrap {
        margin-right: 15upx;
        display: inline-block;
    }
</style>