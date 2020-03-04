<template>
    <view>
        <view  @click="onNav" class="item-b" :data-url="'/pages/core/bienes_detail?id=' + item.id">
            <view class="avatar">
                <image mode='aspectFit' class="avatar-img" :src="item.thumb[0].url" ></image>
            </view>

            <view class="b-title">{{item.title}}</view>
            <view class="b-point columns is-mobile is-marginless">
                <view class=" is-pulled-left f32">{{item.point}}</view>
                <view class="is-pulled-right  f26 is-narrow">积分</view>
            </view>
        </view>
    </view>
</template>


<script>

    export default {
        props: {
            item: {}
        },
        methods: {}
    };
</script>


<style>
.b-title{
    font-size: 28upx;
    font-weight: 700;
    color: #333333;
}
    .b-point{
        color: #ff5274;
        line-height: 70upx;
    }

    .avatar{
        width: 350upx;
        height: 220upx;
    }
    .avatar-img{
        clear: both;
        width:  350upx;
        height: 220upx;
    }
</style>