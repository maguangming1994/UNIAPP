<style>
.picked .item-inner{padding-left:33px;border-left:solid 2px #007aff}
</style>
<template>
    <div>
        <div class="bra-list-item weui-cells" style="margin-top:0">
            <div @click="pick_item(item)" :class="{'picked' : item.picked}" class="bra-list weui-cell braui-cell "
                 v-for="(item , idx) in
            column_items">

                <div class="item-inner ">
                    {{item.title}}
                </div>
            </div>
            <div v-show="is_muti" class="bra-btns columns is-mobile is-marginless">
                <div class="btn column">确定</div>
                <div class="btn column">取消</div>
            </div>
        </div>

    </div>
</template>
<script>

    export default {
        components: {},
        props: {
            items: {},
            is_muti: false ,
            field_name : ''
        },
        data:function () {
            return {
                picked_items: [],
                column_items: []
            }
        },
        methods: {
            unbind: function (id) {

            },
            pick_item: function (item) {

                if(this.is_muti){
                    for (let key in this.column_items) {
                        if (this.column_items[key].id == item.id) {
                            console.log(this.column_items)
                            this.column_items[key].picked = !this.column_items[key].picked;
                        }

                    }
                    this.column_items = Object.assign({}, this.column_items);
                }else{
                    for (let key in this.column_items) {
                        if (this.column_items[key].id == item.id) {
                            this.column_items[key].picked = !this.column_items[key].picked;
                        }else{

                            this.column_items[key].picked = false;
                        }
                    }
                    this.column_items = Object.assign({}, this.column_items);
                    this.out_put();
                }


            },
            confirm: function () {

            } ,

            out_put: function () {

                let pick_ids;

                if(this.is_muti){
                     pick_ids = [];
                    for (let key in this.column_items) {
                        if(this.column_items[key].picked){
                            pick_ids.push(this.column_items[key].id);
                        }
                    }
                }else{
                    for (let key in this.column_items) {
                        if(this.column_items[key].picked){
                            pick_ids = this.column_items[key].id;
                            break;
                        }
                    }
                }
                let arr = [this.field_name, pick_ids];
                console.log(arr)
                this.$emit('updated', arr)
            },
        },
        created: function () {
            for (let key in this.items) {
                this.items[key].picked = false;
                this.column_items.push(this.items[key]);
            }
        },
    };
</script>