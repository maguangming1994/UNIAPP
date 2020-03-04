<template>
    <view style="position: relative;width: 100%">
        <div v-if="item.mobile" @click="onNav" class="item-comp" wx:key="test2"  :data-url="url">
            <div class=" uni-bg-red columns is-mobile is-marginless">
                <div class="column avatar is-narrow">
                    <img class="avatar-img" v-if="item.user.avatar" :src="item.user.avatar" alt="">
                    <img class="avatar-img" v-if="!item.user.avatar" :src="default_avatar" alt="">


                </div>

                <div class="column">
                    <div class="item-esf-title f32 fb">{{item.person_name  || ''}}
                        <span style="padding-left: 28upx" ><rate_star :point="item.point"></rate_star></span>
                    </div>
                    <div class="address faded">
                        <text v-if="item.shop_id">{{item.shop_id}}</text> |  <text v-if="item.level_id">{{item.level_id}}</text>
                    </div>

                    <div class="rec_agents f26 faded">
                        {{item.description || 'Ta很懒，什么都没留下！'}}
                    </div>
                </div>
            </div>
        </div>

        <view @click="onCall" class="phone" :data-mobile="item.mobile"><span class="iconfont icon-phone"></span></view>
    </view>
</template>


<script>

    import rate_star from '@/bra/common/rate_star.vue';

    export default {
        components: {
            rate_star
        },
        props: {
            item: {} ,
            prop_url : ""
        },
        data : function(){
            return {
                default_avatar : 'http://fc.kxcode.cn/upload_file/1/20190912/PXDk92i2lShQxzDgDzVjreMgvYHqtKDZ.png' ,
                url : ''
            }
        },
        methods: {

        } ,
        created : function () {
            let oncnfig = uni.getStorageSync('config');
            this.default_avatar = oncnfig.module_config.default_avatar;
            if(!this.prop_url || this.prop_url == ''){
                this.url = '/pages/hotel/hotel_detail?id=' + this.item.id;
            }else{
                this.url = this.prop_url;
            }
        }
    };
</script>


<style>

    .phone{
        position: absolute;
        right: 33upx;
        top:30%;
        background: #7ed321;
        color: #fff;
        width: 65upx;
        height: 65upx;
        border-radius: 50%;
        text-align: center;
    }
    .phone .iconfont{
        font-size: 38upx;
    }

    .item-comp .address{
        font-size: 26upx;
        overflow: hidden;
        font-weight: 300;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 100%;

        line-height: 58upx;
    }
    .item-comp  .is-narrow{
        margin-right: 20upx;
    }
    .item-comp img{
        width: 300upx;
        height: 221upx;
        border-radius: 5px;
    }
    .item-comp .avatar{
        width: 150upx;
        height: 150upx;
        border-radius: 50%;
        box-shadow: 0 0 5px #ccc;
    }
    .item-comp{
        margin-top: 30upx;
        padding-bottom: 30upx;
    }
    .item-comp img{
        width: 150upx;
        height: 150upx;
        border-radius: 50%;
    }
    .rec_agents img{
        width: 45upx;
        height: 45upx;
        border-radius: 50%;
        margin-right: 15upx;
        margin-top: 16upx;
    }
    .cert-btn{
        background: #7ed321;
        color: #fff;
        font-size: 20upx;
        line-height: 40upx;
        display: inline-block;
        padding: 0 15upx;
        margin-left: 24upx;
        border-radius: 6upx;
        font-weight: 300;
    }
    /** esf end */

</style>