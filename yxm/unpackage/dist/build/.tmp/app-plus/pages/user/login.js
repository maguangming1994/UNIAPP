(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/login"],{1365:function(n,t,e){"use strict";(function(n,e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=getApp(),i={data:function(){return{count:60,mobile_number:"",token:"",btn_txt:"获取验证码",show_weixin:!0,code:""}},onLoad:function(){n.setStorageSync("wexin_connect",!1)},onShow:function(){var t=n.getStorageSync("wexin_connect");t.openid&&(this.show_weixin=!1)},methods:{wx_login:function(){var t=this;n.login({provider:"weixin",success:function(n){console.log(e(JSON.stringify(n)," at pages\\user\\login.vue:101")),wx.setStorageSync("wexin_connect",n.authResult);var i=n.authResult,u=t.bra_service("bra","connect_weixin_user"),c=t.fetch(u,i);c.then(function(n){t.log_user_in(n.user,function(n){if(!o.globalData.forward)return t.onNav({url:"/pages/hotel/index/index",type:"switch"});t.onNav(o.globalData.forward)})},function(n){t.toast("您还没有绑定注册账号 请先注册账号!"),t.show_weixin=!1})}})},recount:function(){var n=this;n.count>0?(setTimeout(function(){n.count--,n.recount()},1e3),this.btn_txt=n.count):(n.count=60,this.btn_txt="获取验证码")},send_sms:function(t){var e=this,o=this.bra_service("bra","send_login_verify_code"),i=this,u={mobile:i.mobile_number,is_mixed:2},c=this.fetch(o,u,"post");c.then(function(t){n.showToast({icon:"none",title:"已经发送",duration:2e3}),e.recount()},function(t){setTimeout(function(){n.showToast({icon:"none",title:t.msg,duration:2e3})},100)})},send_verify_code:function(){this.send_sms(this.mobile_number)},verify_code:function(){var t=this;if(this.code.length<4)return n.showToast({icon:"none",title:"请输入正确的验证码",duration:2e3});var o=this.bra_service("bra","verify_login_code"),i=this,u=this.fetch(o,{mobile:i.mobile_number,code:this.code});u.then(function(o){var i=o.data;i.user?t.log_user_in(i.user,function(){console.log(e(i," at pages\\user\\login.vue:182")),t.onNav({url:"/pages/hotel/index/index",type:"switch"})}):n.showToast({icon:"none",title:i.msg||"系统错误",duration:2e3}),console.log(e(i," at pages\\user\\login.vue:195"))},function(t){n.showToast({icon:"none",title:t.msg||"系统错误",duration:2e3})})}}};t.default=i}).call(this,e("6e42")["default"],e("0de9")["default"])},"4c35":function(n,t,e){"use strict";(function(n){e("5e7b"),e("921b");o(e("66fd"));var t=o(e("f63d"));function o(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,e("6e42")["createPage"])},"6c3d":function(n,t,e){},"6efa":function(n,t,e){"use strict";var o=function(){var n=this,t=n.$createElement;n._self._c},i=[];e.d(t,"a",function(){return o}),e.d(t,"b",function(){return i})},"73c3":function(n,t,e){"use strict";var o=e("6c3d"),i=e.n(o);i.a},9095:function(n,t,e){"use strict";e.r(t);var o=e("1365"),i=e.n(o);for(var u in o)"default"!==u&&function(n){e.d(t,n,function(){return o[n]})}(u);t["default"]=i.a},f63d:function(n,t,e){"use strict";e.r(t);var o=e("6efa"),i=e("9095");for(var u in i)"default"!==u&&function(n){e.d(t,n,function(){return i[n]})}(u);e("73c3");var c=e("2877"),s=Object(c["a"])(i["default"],o["a"],o["b"],!1,null,null,null);t["default"]=s.exports}},[["4c35","common/runtime","common/vendor"]]]);