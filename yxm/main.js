import Vue from 'vue'
import App from './App'

import store from './bra/store'
import site_info from './bra/site_info'
import underscore from 'vue-underscore';

Vue.prototype.$store = store;

Vue.use(underscore);

Vue.prototype.site_info = site_info;
//配置信息
Vue.prototype.sitio_web = site_info.sitio_web;

Vue.prototype.app_id = site_info.app_id;


Vue.config.productionTip = false;


Vue.prototype.is_loading = false;


Vue.prototype.bra_web = function (modulo, controller, action, params) {
    var esc = encodeURIComponent;
    var query = Object.keys(params)
        .map(k => esc(k) + '=' + esc(params[k]))
        .join('&');
    this.api_url = this.sitio_web + modulo + "/" + controller + "/" + action + "&" + query;
    return this.api_url;
};
Vue.prototype.bra_service = function (module, action, auth = false) {
    let Controlador = 'bra_service';
    if (auth) {
        Controlador = 'bra_api';
    }
    this.api_url = this.sitio_web + module + "/" + Controlador + "/" + action;
    return this.api_url;
};

Vue.prototype.bra_diy_service = function (module, action, auth = false) {
    let Controlador = 'bra_diy_service';
    if (auth) {
        Controlador = 'bra_diy_api';
    }
    this.api_url = this.sitio_web + module + "/" + Controlador + "/" + action;
    return this.api_url;
};

Vue.prototype.set_pulldown = function(status){
    // #ifdef APP-PLUS

    const pages = getCurrentPages();
    const page = pages[pages.length - 1];
    const currentWebview = page.$getAppWebview();
    currentWebview.setStyle({
        pullToRefresh: {
            support: status,
            style: plus.os.name === 'Android' ? 'circle' : 'default'
        }
    });
    // #endif
};
Vue.prototype.checkLogin = function (cb, force = false, is_nav = false) {
    let that = this;
    const app = getApp();
    let user = uni.getStorageSync("user") || false;
    if (user && !force) {
        return typeof cb === "function" && cb(user);
    }
    let check_login_url = this.bra_service("bra", "check_login", true);
    let nav = {url: '/pages/user/login', type: 'navi'};
    let promise = that.fetch(check_login_url, {});
    promise.then((data) => {
        typeof cb === "function" && cb(user);
    }, () => {
        uni.setStorageSync("user", false);
        if (is_nav) {
            that.onNav(nav);
        } else {
            typeof cb === "function" && cb(false);
        }
    });
};

Vue.prototype.set_cache = function (key, val) {
    uni.setStorageSync(key, val);
};

Vue.prototype.get_cache = function (key) {

    return uni.getStorageSync(key);
};


Vue.prototype.get_app_pay_params = function (order_id, payment, callback) {
    let values = {
        order_id: order_id,
        payment: payment
    };
    return this.bra_common_page("bra_app", 'get_app_pay_params', values, true, (ret) => {
        console.log(JSON.stringify(ret.data.page_data));

        callback(ret.data.page_data)

    }, 'post', false);

};
Vue.prototype.onBack = function (e) {
    uni.navigateBack();
};

Vue.prototype.onNav = function (e) {
    let dataset, url, type, nav;
    if (e.currentTarget) {
        dataset = e.currentTarget.dataset;
        url = dataset.url;
        type = dataset.type;
        nav = {url: url};
    } else {
        url = e.url;
        type = e.type;
        nav = e;
    }
    if ("switch" === type) {
        return uni.switchTab(nav);
    }

    if ("relaunch" === type) {
        return uni.reLaunch(nav);
    }

    if ("redirect" === type) {
        nav.fail = function () {
            uni.switchTab({
                url: url
            });
        };
        uni.redirectTo({url: url});
    } else {
        nav.fail = function () {
            uni.switchTab({
                url: url
            });
        };
        uni.navigateTo(nav);
    }
};
Vue.prototype.log_user_in = function (user, cb) {
    uni.setStorageSync('user', user);
    typeof cb === "function" && cb(user);
};

Vue.prototype.get_uuid = function(){
    function uuidv4() {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }
    let uuid = uni.getStorageSync('bra_uuid');
    console.log(uuid)
    if(!uuid){

        //#ifdef APP-PLUS
        uuid =  plus.device.uuid;
        //#endif

        if(!uuid){
            uuid = uuidv4();
        }

        uni.setStorageSync('bra_uuid' , uuid);
    }
    return uuid;
};
Vue.prototype.fetch = function (url, options = {}, method = 'get', show_loading = true, showError = true) {
    let params =  Object.assign({} , site_info);
    params.query = options;
    params.bra_action = method;

    let refer = uni.getStorageSync('refer') || false;
    if (refer && !isNaN(refer)) {
        params.refer = refer;
    }

    //__bra_token
    let user = uni.getStorageSync('user') || false;
    if (user) {
        params.__bra_token = user.auth_str;
    }

    params.bra_uuid  =  this.get_uuid();


    if (show_loading) {
        uni.showLoading({
            title: 'LoaDing'
        });
    }

    let push = uni.getStorageSync('bra_push');
    if (push && push.clientid) {
        params._bra_cid = push.clientid;
    }
    console.log(url  , params);
    return new Promise((resolve, reject) => {
        uni.request({
            url,
            method: 'POST',
            data: params,
            header: {
                'content-type': 'application/json' // 默认值
                , 'X-Requested-With': 'XMLHttpRequest'
                , 'Accept': 'application/json, text/javascript, */*; q=0.01'
            },
            success: res => {
                if (showError) {
                    //todo error handle
                    if (res.statusCode < 200 || res.statusCode > 300) {
                        return reject(res.data || {});
                    }

                    if (typeof res.data.code !== "undefined" && res.data.code !== 1) {
                        return reject(res.data || {});
                    }
                }

                return resolve(res.data || {});
            },
            fail: (res) => {
                console.log(res);
                return reject(res || {});
            },
            complete: res => {
                if (show_loading) {
                    uni.hideLoading();
                }
            }
        });
    });
};

Vue.prototype.params_2_qs = function (params) {
    let esc = encodeURIComponent;

    if (!Object.keys) {
        Object.keys = (function () {
            var hasOwnProperty = Object.prototype.hasOwnProperty,
                hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
                dontEnums = [
                    'toString',
                    'toLocaleString',
                    'valueOf',
                    'hasOwnProperty',
                    'isPrototypeOf',
                    'propertyIsEnumerable',
                    'constructor'
                ],
                dontEnumsLength = dontEnums.length;

            return function (obj) {
                if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null) throw new TypeError('Object.keys called on non-object');

                var result = [];

                for (var prop in obj) {
                    if (hasOwnProperty.call(obj, prop)) result.push(prop);
                }

                if (hasDontEnumBug) {
                    for (var i = 0; i < dontEnumsLength; i++) {
                        if (hasOwnProperty.call(obj, dontEnums[i])) result.push(dontEnums[i]);
                    }
                }
                return result;
            }
        })()
    }
    return Object.keys(params)
        .map(k => esc(k) + '=' + esc(params[k]))
        .join('&');
};

Vue.prototype.bra_common_page = function (module, page_name, params = {}, si_api = false, callback, method = '', set_data = true, show_load = false) {
    let action = this.bra_service('bra', 'bra_page', si_api);
    params["page_name"] = page_name;
    params["module"] = module;
    this.bra_load_page(action, params, callback, method, set_data, show_load);
};

Vue.prototype.bra_load_page = function (action, params, callback, method, set_data, show_load = false) {
    this.fetch(action, params, method, show_load, false).then(data => {
        if (set_data && data.data) {
            this.elements = data.data;
        }
        typeof callback === "function" && callback(data);
    }, error => {
        console.log(error);
        typeof callback === "function" && callback(false);
    });
};


Vue.prototype.load_page = function (module, page_name, params = {}, si_api = false, callback, method = '', show_load = false) {
    let action = this.bra_service(module, 'load_page', si_api);
    params.page_name = page_name;
    let promise = this.fetch(action, params, method, show_load, false);
    promise.then(data => {
        if (data.data) {
            this.elements = data.data;
        }
        typeof callback === "function" && callback(data);
    }, error => {
        typeof callback === "function" && callback(false);
    });
};

Vue.prototype.load_diy_page = function (modulo, page_name, params = {}, si_api = false, callback) {
    let action = this.bra_diy_service(modulo, 'load_page', si_api);
    params.page_name = page_name;
    let promise = this.fetch(action, params, data => {
        if (data.data) {
            this.elements = data.data;
        }
    }, error => {
        console.log(error);
    });

    promise.then(data => {
        typeof callback === "function" && callback(data);
    }, error => {
        typeof callback === "function" && callback(false);
    });
};

Vue.prototype.show_toast = function (msg, cb) {
    setTimeout(function () {
        uni.showToast({
            title: msg,
            duration: 2000,
            icon: 'none',
            mask : true ,
            success(res) {
                typeof cb == "function" && cb()
            }
        });
    }, 100)
};


Vue.prototype.show_loading = function (msg, cb) {
    setTimeout(function () {
        uni.showLoading({
            title: msg
        });
    }, 100)
};


Vue.prototype.on_form_val = function (fucking) {
    this.fucking_params[fucking[0]] = fucking[1];
};

Vue.prototype.get_location = function (cb) {
    uni.getLocation({
        type: 'wgs84',
        success: (res) => {
            return typeof cb == "function" && cb(res);
        },
        fail: () => {
            this.show_toast('获取位置信息失败!！');
        }
    });
};

Vue.prototype.onCall = function (e) {
    const dataset = e.currentTarget.dataset, mobile = dataset.mobile;

    if (mobile) {
        uni.makePhoneCall({
            phoneNumber: mobile
        });
    } else {
        this.toast(dataset.tips)
    }

};
/**
 * 文字转语音功能
 * @param txt
 */
Vue.prototype.bra_tts = function (txt) {

};
App.mpType = 'app';

const app = new Vue({
    store,
    ...App
});
app.$mount();
