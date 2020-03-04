<template>
    <view v-if="is_page_loaded">

        <div class="weui-cells bb10">
            <div class="weui-cell weui-cell_access">
                <div class="weui-cell__bd">
                    <p>上传头像</p>
                </div>
                <div @click="choose" class="avatar-box" data-max_amount="1">
                    <img :src="page_data.user.avatar ||'/static/img/avatar2.png'" class="avatar">
                </div>
            </div>
            <div class="weui-cell weui-cell_access" @click="onNav" :data-url="'/pages/user/field_update?m=users&f=nickname'+'&v='+page_data.user.nickname">
                <div class="weui-cell__bd">
                    <p>昵称 </p>
                </div>
                <div class="weui-cell__ft">
                    {{page_data.user.nickname || '未设置'}}
                </div>
            </div>
        </div>

    </view>
</template>

<script>

    import site_info from '@/bra/site_info'
    export default {
        data() {
            return {
                page_name: 'bra_user_info',
                module: 'bra',
                elements: {},
                page_data: {
                    user : {}
                } ,
                is_page_loaded : false
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
            onMhcmsPull: function () {
                let params = {};
                this.bra_common_page(this.module, this.page_name, params, true, (data) => {
                    this.page_data = this.elements.page_data;
                    if(this.page_data && this.page_data.user){
                        this.is_page_loaded = true;
                    }
                    uni.stopPullDownRefresh();
                });
            },
            choose() {
                uni.chooseImage({
                    count: 1,
                    success: (res) => {
                        let promise = this.upload_one(res.tempFilePaths[0]);
                        promise.then(data => {
                            console.log(data);
                            uni.showToast({
                                icon : "none",
                                title:  data.msg || '系统错误',
                                duration: 2000
                            });
                            this.onMhcmsPull();
                        }, err => {
                            console.log(err);
                            uni.showToast({
                                icon : "none",
                                title:  err.msg || '系统错误',
                                duration: 2000
                            });
                        })
                    },
                    fail: (err) => {
                        console.log(err)
                    }
                })

            },
            upload_one(path) {

                let params = site_info;
                params.bra_action = 'post';

                //__bra_token
                let user = uni.getStorageSync('user') || false;
                if (user) {
                    params.__bra_token = user.auth_str;
                }
                params.bra_uuid  =  this.get_uuid();
                this.params = params;

                return new Promise((resolve, reject) => {
                    uni.showLoading({
                        title: '上传中'
                    });
                    let user = uni.getStorageSync('user') || false;
                    uni.uploadFile({
                        url: this.bra_service('bra', 'upload_avatar', true),
                        filePath: path,
                        name: 'file',
                        header: {
                            'Accept': 'application/json, text/javascript, */*; q=0.01'
                        },
                        formData: params,
                        success: (uploadFileRes) => {
                            console.log(uploadFileRes);
                            if ("string" === typeof uploadFileRes.data) {
                                resolve(JSON.parse(uploadFileRes.data))
                            } else {
                                resolve(uploadFileRes.data.data)
                            }

                        },
                        complete : () => {
                            uni.hideLoading()
                        }
                    });
                })
            }
        }
    };
</script>
<style>

    uni-image ,.avatar{
        width: 79px;
        border-radius: 50%;
        height: 79px;
    }

</style>