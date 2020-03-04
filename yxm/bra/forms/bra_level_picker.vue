<style>
    .picker.has-text-right{min-width:100%}
</style>
<template>
    <view :class="'mhcms-form-item overflow_x_hidden'" style="min-width:100%">
        <!-- level picker -->
        <view class="mhcms-form-item is-block" v-if="pick_init" style="min-width:100%">
            <picker :data-level="level" :range="pickers_columns" :value="pick_ed" @change="on_select"
                    @columnchange="on_col_change" mode="multiSelector" range-key="title"
                    style="width:100%;display:block">
                <view class="picker has-text-left">
                    <view v-if="picked_text!=''" class="is-block">
                        {{picked_text}}
                    </view>
                    <view v-else class="is-block">
                        {{placeholder}}
                    </view>
                </view>
            </picker>
        </view>

    </view>
</template>

<script>

    export default {
        props: {
            field_name: {
                type: String,
                default() {
                    return '';
                }
            },
            default_value: {}
            ,
            options: {

                default() {
                    return [];
                }
            },
            level: {
                default: 0
            },
            placeholder: {
                default: '请选择'
            }
        },
        data: function () {
            return {
                pickers_columns: [],
                picked_text: '',
                pick_ed: [],
                pick_init: false,
                s_pick_ed: 0,
                pre_picked: []
            }
        },

        methods: {
            out_put: function (arr) {
                console.log('mhcms out:', arr);
                this.$emit('updated', arr)
            },
            init_level_picker: function (level) {
                var parent_selected = false;
                //创造列
                for (let i = 0; i <= level; i++) {
                    this.pickers_columns[i] = [];

                    this.pick_ed[i] = this.pre_picked[i]; // 预先选择
                    //遍历所有节点
                    for (let key in this.options) {
                        let opt = this.options[key]; // 当前节点

                        if (i === 0) {
                            if (!parent_selected) {
                                parent_selected = opt;
                            }
                            this.pickers_columns[i].push(opt); // 第一列
                        } else {
                            if (!parent_selected) {
                                parent_selected = this.pickers_columns[i-1][this.pre_picked[i]];
                                console.log(parent_selected)
                            }
                            this.pickers_columns[i] = parent_selected.children; //
                        }
                    }
                    console.log(i ,this.pickers_columns[i] , parent_selected);
                    parent_selected = false;
                    this.$set(this.pickers_columns, i, this.pickers_columns[i]);
                }
                this.pick_init = true;
            },
            on_col_change: function (e) {
                let data_set = e.currentTarget.dataset;
                let $column_index = e.detail.column;
                let $column_new_val = e.detail.value;
                let current_opt = this.pickers_columns[$column_index][$column_new_val];
                this.$set(this.pre_picked, $column_index, $column_new_val);//pick

                if ($column_index < this.level) {
                    for (let i = $column_index + 1; i <= this.level; i++) {
                        console.log(i , this.level , current_opt);
                        this.$set(this.pickers_columns, i, current_opt.children);
                        current_opt = current_opt.children[0];
                        this.$set(this.pre_picked, i, 0);//pick
                    }
                }
            },
            on_select: function (e) {
                let rmited = false, picked_text = [];
                for (let i = this.level; i >= 0; i--) {
                    if (!rmited) {
                        this.out_put([this.field_name, this.pickers_columns[i][this.pre_picked[i]].id]);
                        rmited = true
                    }
                    picked_text.unshift(this.pickers_columns[i][this.pre_picked[i]].title);
                }

                this.pick_ed = this.pre_picked; //pick
                this.picked_text = picked_text.join('-');
            },
        },
        created: function () {
            this.pick_ed = this.pre_picked = this.default_value;
            this.init_level_picker(this.level);
        }
    }
</script>