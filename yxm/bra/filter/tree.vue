<style>

</style>
<template>
    <div class="columns is-mobile is-marginless is-gapless">
        <div class="column iss-narrow">
            <div class="bra-list-item weui-cells" style="margin-top:0">
                <div @click="change_parent(item)" class="bra-list weui-cell braui-cell " v-for="(item , idx) in items"
                     wx:key="test2">

                    <div class="address ">
                        {{item.title}}
                    </div>
                </div>
            </div>
        </div>

        <div class="column">

        </div>
        </div>
</template>
<script>

    export default {
        components: {},
        props: {
            items: {}
        },
        methods: {
            change_parent: function (id) {

            }
        },
        created: function () {

        }
    };
</script>