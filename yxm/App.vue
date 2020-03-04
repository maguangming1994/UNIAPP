<script>

    export default {
        onLaunch: function () {
            let uuid = uni.getStorageSync('bra_uuid');

            console.log('App Launch' , uuid);


            // #ifdef APP-PLUS

            plus.screen.lockOrientation('portrait-primary');            // 锁定屏幕方向

            let unipush = uni.getStorageSync('unipush');
            if (!unipush.clientid) {
                uni.getProvider({
                    service: 'push',
                    success: (res) => {
                        if (~res.provider.indexOf('unipush')) {
                            uni.subscribePush({
                                provider: 'unipush',
                                success: function (res) {
                                    console.log(res);
                                    uni.setStorageSync('bra_push', res);
                                    console.log('success:' + JSON.stringify(res));
                                }
                            });
                        }
                    }
                });
            }

            let $version = plus.runtime.version;
            console.log($version);

            let action_u = this.bra_service('bra', 'check_version');
            let promise_u = this.fetch(action_u, {version: $version});
            promise_u.then(data => {
                console.log(data);
                switch (uni.getSystemInfoSync().platform) {
                    case 'android':
                        var dtask = plus.downloader.createDownload( data.app.url, {}, function ( d, status ) {
                            // 下载完成

                            if ( status == 200 ) {
                                uni.showModal({
                                    title: '提示',
                                    content: '新版下载完成,是否立刻安装?',
                                    confirmText : '安装' ,
                                    cancelText : '取消',
                                    success:  (res) => {
                                        if (res.confirm) {

                                            plus.runtime.install(plus.io.convertLocalFileSystemURL(d.filename),{},{},function(error){
                                                uni.showToast({
                                                    title: '安装失败',
                                                    mask: false,
                                                    duration: 1500
                                                });
                                            })
                                        } else if (res.cancel) {

                                        }
                                    }
                                });

                            } else {
                                uni.showToast({
                                    title: '更新失败',
                                    mask: false,
                                    duration: 1500
                                });
                            }
                        });

                        console.log('运行Android上');
                        if(plus.networkinfo.getCurrentType()!=3){
                            uni.showToast({
                                title: '有新的版本发布，检测到您目前非Wifi连接，为节约您的流量，程序已停止自动更新，将在您连接WIFI之后重新检测更新。',
                                mask: false,
                                duration: 5000,
                                icon:"none"
                            });
                            return;
                        }else{
                            uni.showModal({
                                title: '提示',
                                content: '检测到新的版本是否立刻下载?预计消耗流量 27 Mb',
                                confirmText : '下载' ,
                                cancelText : '取消',
                                success:  (res) => {
                                    if (res.confirm) {
                                        dtask.start();
                                    }
                                }
                            });
                        }
                        /**
                         uni.showToast({
                            title: '有新的版本发布，检测到您目前为Wifi连接，程序已启动自动更新。新版本下载完成后将自动弹出安装程序。',
                            mask: false,
                            duration: 5000,
                            icon:"none"
                        });
                         * */

                        break;
                    case 'ios':
                        this.open(data.app.ios_url);
                        console.log('运行iOS上');
                        break;
                    default:
                        console.log('运行在开发者工具上');
                        break;
                }
            }, error => {
                console.log(JSON.stringify(error));
                //this.toast(error.msg);
            });


            //监听click事件，用户从消息中心点击触发的
            plus.push.addEventListener("click", function (msg) {
                console.log(JSON.stringify(msg));
                var payload = msg.payload;
                if (payload) {
                    if (typeof payload === 'string') {
                        payload = JSON.parse(payload);
                    }
                    if (typeof payload === 'object') {
                        if(payload.url){
                            setTimeout(function(res){
                                uni.navigateTo({
                                    url:payload.url
                                })
                            },1000)
                        }
                    }
                }
            }, false);

            // #endif

        },
        onShow: function () {
            console.log('App Show')
        },
        onHide: function () {
            console.log('App Hide')
        }
    }
</script>

<style lang="scss">
    @import "uni.scss";
    @import "./static/css/animate.css";
    @import "./static/css/iconfont.wxss";
    @import "./static/css/weui.wxss";
    @import "./static/css/bulma_bra.wxss";
    @import "./static/css/bra.scss";
</style>
