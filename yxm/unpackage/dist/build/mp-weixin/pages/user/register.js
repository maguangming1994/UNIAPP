(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/register"],{"2e65":function(n,e,t){"use strict";(function(n){t("5e7b"),t("921b");o(t("66fd"));var e=o(t("2fe9"));function o(n){return n&&n.__esModule?n:{default:n}}n(e.default)}).call(this,t("543d")["createPage"])},"2fe9":function(n,e,t){"use strict";t.r(e);var o=t("5d7b"),i=t("d09d");for(var c in i)"default"!==c&&function(n){t.d(e,n,function(){return i[n]})}(c);t("7b72");var r,u=t("f0c5"),s=Object(u["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],r);e["default"]=s.exports},5360:function(n,e,t){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;getApp();var t={data:function(){return{count:60,mobile_number:"",mobile_refer:"",token:"",btn_txt:"获取验证码",show_weixin:!0,code:""}},onLoad:function(){n.setStorageSync("wexin_connect",!1)},onShow:function(){var e=n.getStorageSync("wexin_connect");e.openid},methods:{wx_login:function(){var e=this;n.login({provider:"weixin",success:function(n){console.log(JSON.stringify(n)),wx.setStorageSync("wexin_connect",n.authResult);var t=n.authResult,o=e.bra_service("bra_app","connect_weixin_user"),i=e.fetch(o,t);i.then(function(n){console.log(n),e.log_user_in(n.user,function(n){return e.onNav({url:"/pages/hotel/index/index",type:"switch"})})},function(n){console.log(n),e.show_toast("您还没有绑定注册账号 请先注册账号!")})}})},recount:function(){var n=this;n.count>0?(setTimeout(function(){n.count--,n.recount()},1e3),this.btn_txt=n.count):(n.count=60,this.btn_txt="获取验证码")},send_sms:function(e){var t=this,o=this.bra_service("bra","send_reg_verify_code"),i=this,c={mobile:i.mobile_number,is_mixed:2},r=this.fetch(o,c,"post");r.then(function(e){n.showToast({icon:"none",title:"已经发送",duration:2e3}),t.recount()},function(e){setTimeout(function(){n.showToast({icon:"none",title:e.msg,duration:2e3})},100)})},send_verify_code:function(){this.send_sms(this.mobile_number)},verify_code:function(){var e=this;if(this.code.length<4)return n.showToast({icon:"none",title:"请输入正确的验证码",duration:2e3});var t=this.bra_service("bra","verify_login_code"),o=this,i=this.fetch(t,{mobile:o.mobile_number,code:this.code,mobile_refer:this.mobile_refer});i.then(function(t){var o=t.data;o.user?e.log_user_in(o.user,function(){console.log(o),e.$store.commit("change_login",!0),e.onNav({url:"/pages/hotel/index/index",type:"switch"})}):n.showToast({icon:"none",title:o.msg||"系统错误",duration:2e3}),console.log(o)},function(e){n.showToast({icon:"none",title:e.msg||"系统错误",duration:2e3})})}}};e.default=t}).call(this,t("543d")["default"])},"5d7b":function(n,e,t){"use strict";var o,i=function(){var n=this,e=n.$createElement;n._self._c},c=[];t.d(e,"b",function(){return i}),t.d(e,"c",function(){return c}),t.d(e,"a",function(){return o})},"76a7":function(n,e,t){},"7b72":function(n,e,t){"use strict";var o=t("76a7"),i=t.n(o);i.a},d09d:function(n,e,t){"use strict";t.r(e);var o=t("5360"),i=t.n(o);for(var c in o)"default"!==c&&function(n){t.d(e,n,function(){return o[n]})}(c);e["default"]=i.a}},[["2e65","common/runtime","common/vendor"]]]);