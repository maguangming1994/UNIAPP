<style>
    .letter{
        width:12%;
        text-align:center;
        padding:10px 0;
        font-size: 28upx;
    }

    .letter-section{
        margin-bottom:10px;overflow:hidden;background: #fff;
    }

    .letter .le{
        width:35px;height:35px;line-height:35px;text-align:center;margin:auto;
    }
    .letter.active .le{
       background: #10aeff;color: #fff;border-radius:5px;
    }
    .letter-item{
        width: 33%;float: left;
    }

    .mhcms-panel-header{
        line-height: 35px;
        padding-left: 25px;
    }

    .letter-item-city{
        text-align:center;
        border-right:solid 1px #ccc;
        margin:1px;
        line-height:35px;
        font-size:28upx;

    }

</style>
<template>
    <div class="full_screen is-clipped">
        <view class="padded f16 has-background-white">
            <view class="columns is-mobile is-marginless " @click="locate_area">
                <view class="column ">当前城市:点击重新定位</view>
                <view class="column is-narrow" v-if="area.id">{{area.title}}</view>
                <view class="column is-narrow has-text-danger"  v-if="!area.id">全国</view>
            </view>
        </view>
        <div class="mhcms-panel is-clipped">
            <div class="letter is-pulled-left" @click="select_letter" :data-letter="index" :class="{'active':
            current_letter==index}" v-for="(item , index) in page_data.areas"   wx:key="zero">
                <div class="le" v-if="index!=''"    >{{index}}</div>
                <div class="le" v-if="index==''"  >全部</div>
            </div>
            <div class="clearfix"></div>

        </div>
        <div class="bk10"></div>
        <div v-if="current_letter=='' || current_letter==index" class="letter-section mhcms-panel"
             :data-letter="index" v-for="(item , index) in page_data.areas" wx:key="one">

            <div class="mhcms-panel-header">{{index}}</div>
            <div class="letter-item "   v-for="(area , index2) in item "  wx:key="index2">
                <div class="letter-item-city" :data-area_id="area.id" @click="change_city"
                     v-if="area.letter===index">{{area.title}}</div>
            </div>
            <div class="clearfix"></div>
        </div>
    </div>
</template>

<script>
    import {
        mapState,
        mapMutations
    } from 'vuex';
    const app = getApp();
    export default {
        data() {
            return {
                page_name: 'bra_index_change_area',
                module: 'bra',
                current_letter : '' ,
                elements: [],
                page_data: {},
                is_page_loaded: false,
                areas : [] ,
                org_areas : [] ,
                area :{}
            };
        },
        onLoad() {

        },
        onShow() {
            this.area = this.get_cache('area');
            if (!this.is_page_loaded) {
                this.onMhcmsPull();
            }
        },
        onPullDownRefresh: function () {
        },
        methods: {
            onMhcmsPull() {
                let params = {};
                this.bra_common_page(this.module, this.page_name, params, false, (data) => {
                    this.page_data = this.elements.page_data;
                    if(this.page_data && this.page_data.user){
                        this.is_page_loaded = true;
                    }
                    uni.stopPullDownRefresh();
                });
            },

            locate_area : function(){
                let that = this;
                uni.getLocation({
                    type: 'wgs84',
                    success:  (res) =>   {
                        let action = that.mhcms_app_service("core", 'lng_lat_area');
                        let promise = that.fetch(action, {
                            lat: res.latitude,
                            lng: res.longitude,
                            coordtype: "wgs84ll"
                        });
                        promise.then( (data) => {
                            that.area = data.data;
                            wx.setStorageSync('area', data.data);
                        })
                    } ,
                    fail : () => {
                        that.toast('位置信息获取失败');
                    } ,
                    complete : () => {
                    } ,
                });
            },

            change_city : function(e){
                var $this = this;
                const dataset = e.currentTarget.dataset, area_id = dataset.area_id;
                this.area = $this.page_data.org_areas[area_id];
                console.log(this.area)
                this.set_cache('area' , this.area);

                this.onBack();
            },
            select_letter: function(e){

                const dataset = e.currentTarget.dataset, letter = dataset.letter;
                console.log(letter);
                if(this.current_letter === letter){
                    this.current_letter = "";
                }else{
                    this.current_letter = letter;
                }


            },
        } ,
        created :function () {

        }
    }
</script>