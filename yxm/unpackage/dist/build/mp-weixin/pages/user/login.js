(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/login"],{"0055":function(n,t,e){"use strict";var o,i=function(){var n=this,t=n.$createElement;n._self._c},c=[];e.d(t,"b",function(){return i}),e.d(t,"c",function(){return c}),e.d(t,"a",function(){return o})},1681:function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;getApp();var e={data:function(){return{count:60,mobile_number:"",token:"",btn_txt:"获取验证码",show_weixin:!0,code:""}},onLoad:function(){n.setStorageSync("wexin_connect",!1)},onShow:function(){var t=n.getStorageSync("wexin_connect");t.openid},methods:{wx_login:function(){var t=this;n.login({provider:"weixin",success:function(n){console.log(JSON.stringify(n)),wx.setStorageSync("wexin_connect",n.authResult);var e=n.authResult,o=t.bra_service("bra_app","connect_weixin_user"),i=t.fetch(o,e);i.then(function(n){console.log(n),t.log_user_in(n.user,function(n){return t.onNav({url:"/pages/hotel/index/index",type:"switch"})})},function(n){console.log(n),t.show_toast("您还没有绑定注册账号 请先注册账号!")})}})},recount:function(){var n=this;n.count>0?(setTimeout(function(){n.count--,n.recount()},1e3),this.btn_txt=n.count):(n.count=60,this.btn_txt="获取验证码")},send_sms:function(t){var e=this,o=this.bra_service("bra","send_login_verify_code"),i=this,c={mobile:i.mobile_number,is_mixed:2},u=this.fetch(o,c,"post");u.then(function(t){n.showToast({icon:"none",title:"已经发送",duration:2e3}),e.recount()},function(t){setTimeout(function(){n.showToast({icon:"none",title:t.msg,duration:2e3})},100)})},send_verify_code:function(){this.send_sms(this.mobile_number)},verify_code:function(){var t=this;if(this.code.length<4)return n.showToast({icon:"none",title:"请输入正确的验证码",duration:2e3});var e=this.bra_service("bra","verify_login_code"),o=this,i=this.fetch(e,{mobile:o.mobile_number,code:this.code});i.then(function(e){var o=e.data;o.user?t.log_user_in(o.user,function(){console.log(o),t.$store.commit("change_login",!0),t.onNav({url:"/pages/hotel/index/index",type:"switch"})}):n.showToast({icon:"none",title:o.msg||"系统错误",duration:2e3}),console.log(o)},function(t){n.showToast({icon:"none",title:t.msg||"系统错误",duration:2e3})})}}};t.default=e}).call(this,e("543d")["default"])},"4c35":function(n,t,e){"use strict";(function(n){e("5e7b"),e("921b");o(e("66fd"));var t=o(e("f63d"));function o(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,e("543d")["createPage"])},"73c3":function(n,t,e){"use strict";var o=e("cd71"),i=e.n(o);i.a},9095:function(n,t,e){"use strict";e.r(t);var o=e("1681"),i=e.n(o);for(var c in o)"default"!==c&&function(n){e.d(t,n,function(){return o[n]})}(c);t["default"]=i.a},cd71:function(n,t,e){},f63d:function(n,t,e){"use strict";e.r(t);var o=e("0055"),i=e("9095");for(var c in i)"default"!==c&&function(n){e.d(t,n,function(){return i[n]})}(c);e("73c3");var u,s=e("f0c5"),r=Object(s["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],u);t["default"]=r.exports}},[["4c35","common/runtime","common/vendor"]]]);