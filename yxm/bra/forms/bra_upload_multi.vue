<template>
    <view :class="'mhcms-form-item overflow_x_hidden'">

        <!--  upload_layui_mutil_upload -->

        <view class="columns is-marginless is-mobile is-multiline">

            <div class="weui-uploader__bd">
                <div class="weui-uploader__files" id="uploaderFiles">
                    <div :data-index="index" @click="onPreviewTap" @longtap="onDeleteImgTap"
                         class="weui-uploader__file" data-group="thumb" v-for="(item ,index) in upload"
                         v-if="upload.length > 0" wx:key="*this">
                        <image v-if="item.filePath" :src="item.filePath" class='img' mode="aspecFill" style="width: 79px;height: 79px"/>
                        <image v-if="!item.filePath" :src="item.url" class='img' mode="aspecFill" style="width: 79px;height: 79px"/>
                    </div>


                    <div class="weui-uploader__input-box">
                        <div :data-group="field_name" :data-max_amount="max_amount"
                             @click="onOpenPictureTap" class="weui-uploader__input"
                             id="uploaderInput"></div>
                    </div>
                </div>


            </div>

        </view>


    </view>
</template>

<script>

    import site_info from '@/bra/site_info'
    import {_} from 'vue-underscore';

    export default {
        props: {
            field_name: {
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
                default: 1
            },
            show_extra: {
                default: false

            }
        },
        data: function () {
            return {
                upload: [],
                file_ids: [],
                form_type: false,
                placeholder: '' ,
                params : {},
            }
        },

        methods: {
            out_put: function (arr) {
                console.log('mhcms out:', arr);
                this.$emit('updated', arr)
            },
            onOpenPictureTap: function (e) {
                let that = this;
                const dataset = e.currentTarget.dataset, group = dataset.group, max_amount = dataset.max_amount;
                uni.chooseImage({
                    count: parseInt(max_amount),
                    success: (res) => {
                        if (this.upload.length >= max_amount) {
                            return this.show_toast('对不起,最多上传' + max_amount + "张图片或文件!");
                        } else {
                            _.each(res.tempFilePaths, file => {
                                this.upload.push({
                                    filePath: file, status: 0
                                });
                            });
                            that.$set(this, 'upload', this.upload);
                            this.uploadImage(() => {
                                console.log(group + 'all files is uploaded');
                                let arr = [
                                    group, this.file_ids
                                ];
                                this.out_put(arr);
                            });
                        }

                    }
                });
            },
            upload_file: function (url, filepath, name, data, callback, page) {


                uni.showToast({title: '上传中...', icon: 'loading', duration: 10000});
                const options = _.extend( {} ,{
                    url: url, filePath: filepath, name: name, formData: this.params,
                    header: {
                        'Accept': 'application/json, text/javascript, */*; q=0.01'
                    },
                    success: (res) => {
                        console.log(res);
                        res = JSON.parse(res.data);
                        options.isLoginInvalid = false;
                        if (res.code == 1) {
                            callback.apply(page, [res.data, res]);
                        } else {
                            uni.showModal({content: res.msg, showCancel: false});
                        }
                    },
                    fail: (res) => {
                        console.error(res);
                        uni.showModal({content: res.msg, showCancel: false});
                    },
                    complete: (res) => {
                        if (options.isLoginInvalid) {
                        } else {
                            uni.hideToast();
                        }
                    }
                });

                options.requestId = _.uniqueId("RQ");//生成全局唯一ID "RQ" + new Date().getTime();
                console.log(options);
                uni.uploadFile(options);
                return options.requestId;
            },
            onDeleteImgTap: function (e) {
                this.isDeleteAction = true;
                const dataset = e.currentTarget.dataset, index = dataset.index, group = dataset.group;
                uni.showActionSheet({
                    itemList: ['删除'],
                    success: (res) => {
                        if (res.tapIndex === 0) {

                            this.upload.splice(index, 1);
                            this.file_ids.splice(index, 1);
                            let arr = [
                                group, this.file_ids
                            ];
                            this.out_put(arr);
                        }
                    }, complete: () => {
                        this.isDeleteAction = false;
                    }
                })
            },
            onPreviewTap: function (e) {
                if (this.isDeleteAction) return;
                const dataset = e.currentTarget.dataset, index = dataset.index;

                let filePath = '';
                if(this.upload[index].filePath){
                    filePath = this.upload[index].filePath;
                }else{
                    filePath = this.upload[index].url;
                }

                console.log(index);
                console.log(this.upload);
                console.log(this.upload[index]);
                uni.previewImage({
                    current: filePath,
                    urls: [filePath],
                });
            },
            upload_handle: function (index, callback) {
                const uploadFile = this.upload[index], status = this.upload[index].status;
                console.log(index , this.upload[index]);
                if(status == 99){
                    index++;
                    return this.upload_handle(index, function () {
                        typeof callback == "function" && callback()
                    });
                }
                this.isUploading = true;
                this.upload_file(this.bra_service('bra', 'upload', true), uploadFile.filePath, "file", {

                }, (res) => {
                    console.log(res);
                    this.upload[index].status = 99;
                    this.upload[index].url = res;
                    this.upload[index].id = res.id;
                    this.file_ids.push(res.id);
                    this.isUploading = false;
                    index++;
                    if (index < this.upload.length) {
                        this.upload_handle(index);
                    } else {
                        typeof callback == "function" && callback()
                    }
                });
            },
            uploadImage: function (callback) {
                const isUploading = this.isUploading;
                if (isUploading) {
                    console.log('file is still uploading  ');
                    return false;
                } else {
                    console.log('file is still uploading ');
                    this.isUploading = true;
                }

                this.upload_handle(0, function () {
                    typeof callback == "function" && callback()
                });
            },
        },
        created: function () {

            this.placeholder = this.prop_placeholder;

            if(this.default_value.length > 0){

                for (let key in this.default_value){
                    this.default_value[key].status = 99;
                    this.upload.push(this.default_value[key]);
                    this.file_ids.push(this.default_value[key].id);
                }

            }
            let params = site_info;
            params.bra_action = 'post';

            params.bra_uuid = uni.getStorageSync('bra_uuid');
            //__bra_token
            let user = uni.getStorageSync('user') || false;
            if (user) {
                params.__bra_token = user.auth_str;
            }
            this.params = params;
            console.log(this.params)
        }
    }
</script>

<style>
    .map-picker .iconfont{
        font-size:40upx;
        line-height:80upx;
    }
</style>