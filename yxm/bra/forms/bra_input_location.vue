<template>
    <view :class="'mhcms-form-item overflow_x_hidden'">
        <view class="mhcms-form-item" >
            <input :placeholder="placeholder" :type="mini_type" :value="default_loc_value"
                   @input="inputs_change($event)" class="weui-input"
                   style="margin-right:30upx;overflow: hidden">
            <view @click="open_location" class="map-picker">
                <i class="faded iconfont icon-map"></i>
            </view>
            <view class="extra_txt" v-if="show_extra">
                {{extra_txt}}
            </view>
        </view>
    </view>
</template>
<script>
    export default {
        props: {
            field_name: {
                type: '',
                default() {
                    return [];
                }
            },
            default_value: {
                default: ''
            }
            ,
            options: {
                type: '',
                default() {
                    return [];
                }
            },
            level: {
                default: 0
            }
            ,
            name_key: {
                default: 'name'
            }
            ,
            single_column: {
                type: '',
                default() {
                    return [];
                }
            },
            group: {
                type: String,
                default: ''
            },
            unit: {
                type: String,
                default: ''
            },
            mini_type_prop: {
                type: String,
                default: ''
            },
            prop_placeholder: {
                type: String,
                default: ''
            },

            max_amount: {
                type: Number,
                default: 0
            },
            show_extra: {
                default: false

            }
        },
        data: function () {
            return {
                form_type: false,
                default_loc_value: '',
                mini_type: '',
                placeholder: ''
                , extra_txt: ''
            }
        },

        methods: {
            open_location: function () {
                uni.chooseLocation({
                    success: (res) => {
                        //this.toast('位置名称：' + JSON.stringify(res));
                        //console.log('详细地址：' + res.address);
                        //console.log('纬度：' + res.latitude);
                        //console.log('经度：' + res.longitude);
                        this.default_loc_value = res.address;
                        let arr = [this.field_name, this.default_loc_value];
                        this.out_put(arr);
                        arr = [this.lat, res.latitude];
                        this.out_put(arr);
                        arr = [this.lng, res.longitude];
                        this.out_put(arr);

                        this.extra_txt = "坐标:" + res.longitude + "," + res.latitude;
                    }
                });
            },
            out_put: function (arr) {
                console.log('bra out:', arr);
                this.$emit('updated', arr)
            },
            inputs_change: function (e) {
                let arr = [this.field_name, e.detail.value];
                this.out_put(arr)
            },
        },
        created: function () {
            this.placeholder = this.prop_placeholder;
            this.default_loc_value = this.default_value;
        }
    }
</script>

<style>
    .map-picker{
        position: absolute;
        right: -5upx;
        padding: 0 15upx;
        z-index: 9999;
        height: 80upx;
        top:15upx;
    }
    .map-picker .iconfont{
        font-size: 40upx;
        line-height: 80upx;
    }
    .extra_txt{
        position: absolute;
        right: 0;
        font-size: 12px;
        color: #aaa;
    }
</style>