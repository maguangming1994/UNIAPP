<template>
    <view :class="'mhcms-form-item overflow_x_hidden' +  form_type" :type="form_type">

        <view class="columns is-marginless is-mobile is-multiline">
            <view class="column is-3" v-for="item in s_column" wx:key="m">
                <view @click="on_check_box" :class="{'active' : item.checked}" class="default" :data-id="item.id">{{item.name}}</view>
            </view>
        </view>

    </view>
</template>

<script>

    import {_} from 'vue-underscore';
    export default {
        props: {
            field: {
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
            show_extra : {
                default: false

            }
        },
        data: function () {
            return {
                pickers_columns: [],
                pick_ed: [0],
                hold_ed: [0],
                pick_init: false,
                s_pick_ed: 0,
                is_picked: false,
                tag_ids: [],
                s_column: [],
                form_type : false ,
                default_loc_value : '' ,
                mini_type : '' ,
                placeholder : ''
                ,extra_txt : ''
            }
        },

        methods: {
            out_put: function (arr) {
                console.log('mhcms out:', arr);
                this.$emit('updated', arr)
            },

            on_check_box: function (e) {
                let id = e.currentTarget.dataset.id;
                for (let key in this.s_column) {
                    if (this.s_column[key].id == id) {
                        if (this.s_column[key].checked == true) {
                            this.s_column[key].checked = false;
                            this.tag_ids = _.filter(this.tag_ids, function (val) {
                                return val != id;
                            })
                        } else {
                            this.s_column[key].checked = true;
                            this.tag_ids.push(id);
                        }
                        this.$set(this.s_column, key, this.s_column[key]);
                    }
                }
                this.out_put([this.field.field_name, this.tag_ids]);
            },
        },
        created: function () {
            this.form_type = this.field.field_type_name + '_' + this.field.node_field_mode;
            this.s_column = this.single_column;
            this.placeholder = this.prop_placeholder;
            if(this.placeholder == ''){
                this.placeholder  = this.field.slug;
            }

            this.default_value = this.default_value.split(',');
            for(let key in this.default_value){
                let id = this.default_value[key];
                for (let key in this.s_column) {
                    if (this.s_column[key].id == id) {
                        if (this.s_column[key].checked == true) {
                            this.s_column[key].checked = false;
                            this.tag_ids = _.filter(this.tag_ids, function (val) {
                                return val != id;
                            })
                        } else {
                            this.s_column[key].checked = true;
                            this.tag_ids.push(id);
                        }
                        this.$set(this.s_column, key, this.s_column[key]);
                    }
                }
            }

        }
    }
</script>

<style>
    .default{
        background:#EEEEEE;
        margin:5upx;
        padding: 11upx 0;

    }

    .default.active{
        background:#d9601d;
        color:#fff;
    }
</style>