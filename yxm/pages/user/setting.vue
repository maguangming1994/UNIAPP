<template>
    <view id="setting">
        <div class="weui-cells bb10">
            <a class="weui-cell weui-cell_access" @click="onNav" data-url="/pages/user/info">
                <div class="weui-cell__bd">
                    <p>个人信息</p>
                </div>
                <div class="weui-cell__ft">
                </div>
            </a>
            <a class="weui-cell weui-cell_access" @click="onNav" data-url="/pages/user/change_password">
                <div class="weui-cell__bd">
                    <p>修改密码 </p>
                </div>
                <div class="weui-cell__ft">
                </div>
            </a>

            <a class="weui-cell ">
            <div class="weui-cell__bd">
                <p>版本号 {{version}}</p>
            </div>
            <div class="weui-cell__ft">
            </div>
        </a>
        </div>



        <div class="weui-cells bb10 is-hidden">
            <a class="weui-cell weui-cell_access" @click="onNav" data-url="/pages/user/set_mobile">
                <div class="weui-cell__bd">
                    <p>手机号</p>
                </div>
                <div class="weui-cell__ft">

                    <p class="padding-h">{{user.mobile}}</p>
                </div>
            </a>
        </div>

        <div class="weui-cells bb10 is-hidden">
            <a class="weui-cell weui-cell_access" @click="onNav" data-url="/pages/core/system">
                <div class="weui-cell__bd">
                    <p>系统设置</p>
                </div>
                <div class="weui-cell__ft">
                </div>
            </a>
        </div>
        <div class="weui-cells bb10 is-hidden" @click="clear_storge()">
            <a class="weui-cell weui-cell_access" href="javascript:">
                <div class="weui-cell__bd">
                    <p>清理缓存 </p>
                </div>
                <div class="weui-cell__ft">
                </div>
            </a>
        </div>

    </view>
</template>

<script>

    export default {
        data() {
            return {
                pagina_nombre: 'house_user_index',
                modulo: 'house',
                elements: {},
                upload: {},
                preview: {},
                file_ids: {},
                pickers: {},
                picker_params: {},
                input_params: {},
                pictures: {},
                isUploading: false,
                user: {} ,
                version : ''
            };
        },
        onLoad() {
        },
        onShow() {
            this.onMhcmsPull();
        },
        onPullDownRefresh() {
            this.onMhcmsPull();
        },
        methods: {
            clear_storge : function(){
                uni.removeStorage({
                    key: 'area',
                    success:   (res) => {
                        this.show_toast('success');
                    }
                });
            },
            onMhcmsPull : function(){
                this.show_version();
            } ,
            show_version: function () {
                this.version =  plus.runtime.version;
            },
        }
    }
</script>
<style>
    .is-bg-orange{
        margin: 33upx;
        text-align: center;
        line-height: 90upx;
        border-radius: 8upx;
    }
</style>
