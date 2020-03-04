<style>
    .padded{padding:10px;position:relative}
    .bra-list-item{background:#fafafa;padding:10px}
    .bra-list-item.picked{background:#fff;}
    .picked .item-inner{padding-left:33px;border-left:solid 2px #007aff}
    .area .bra-list{
        height:50vh;overflow:scroll;
    }
</style>
<template>
    <div class="area columns is-mobile is-marginless is-gapless has-background-white">
        <div class="column bra-list ">

            <div :class="{'picked' : picked.id == item.id}" @click="change_parent(item)"
                 class="bra-list-item weui-cell braui-cell f14 "
                 v-for="(item ,
                    idx) in items">
                <div class="item-inner">{{item.title}}</div>
            </div>
        </div>

        <div class="column bra-list  braui-cell f14">

            <div :class="{'picked' : picked_child.id == item.id}" @click="change_child(item)"
                 class="bra-list-item weui-cell braui-cell f14 "
                 v-for="(item , idx) in
                picked.children">
                <div class="item-inner">{{item.title}}</div>
            </div>
        </div>

    </div>
</template>
<script>

    export default {
        components: {},
        props: {
            items: {} ,
            field_name : '',
        },
        data: function () {
            return {
                picked: {},
                picked_child: {},

            }
        },
        methods: {
            change_parent: function (picked) {
                if (this.picked.id != picked.id) {
                    this.picked = picked;
                    this.picked_child = {};
                    if (!this.picked.children || this.picked.children.length == 0) {
                        this.out_put(picked);
                    }
                }
            },
            change_child: function (picked) {
                if (this.picked_child.id != picked.id) {
                    this.picked_child = picked;
                    if (!this.picked_child.children || this.picked_child.children.length == 0) {
                        this.out_put(picked);
                    }
                }
            },

            out_put: function (picked) {

                let pick_ids;

                if (this.is_muti) {
                    pick_ids = [];
                    for (let key in this.column_items) {
                        if (this.column_items[key].picked) {
                            pick_ids.push(this.column_items[key].id);
                        }
                    }
                } else {
                    pick_ids = picked.id;
                }
                let arr = [this.field_name, pick_ids];
                console.log(arr);
                this.$emit('updated', arr)
            },
        },
        created: function () {

        }
    };
</script>