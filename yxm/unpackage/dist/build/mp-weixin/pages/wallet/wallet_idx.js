(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/wallet/wallet_idx"],{"0b4a":function(t,e,a){},"4d27":function(t,e,a){"use strict";(function(t){a("5e7b"),a("921b");n(a("66fd"));var e=n(a("f450"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,a("543d")["createPage"])},6087:function(t,e,a){"use strict";var n,o=function(){var t=this,e=t.$createElement;t._self._c;t._isMounted||(t.e0=function(e){t.unit_type=1},t.e1=function(e){t.unit_type=2})},i=[];a.d(e,"b",function(){return o}),a.d(e,"c",function(){return i}),a.d(e,"a",function(){return n})},a66b:function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{page_name:"bra_wallet_index",module:"bra",is_page_loaded:!1,page_data:{},params:{},items:[],loader:{is_loading:!1,has_more:!0,page:1},unit_type:1}},onLoad:function(){this.onMhcmsPull(1)},onShow:function(){},onPullDownRefresh:function(){this.onMhcmsPull(),t.stopPullDownRefresh()},onReachBottom:function(){this.bra_list_res(0)},methods:{onMhcmsPull:function(){var e=this,a={};this.load_page(this.module,this.page_name,a,!0,function(a){e.page_data=e.elements.page_data,e.is_page_loaded=!0,e.bra_list_res(1),t.stopPullDownRefresh()})},bra_list_res:function(e){var a=this;if(1===e&&(a.items=[],a.loader.page=1,a.loader.is_loading=!1,a.loader.has_more=!0),!a.loader.is_loading&&a.loader.has_more){a.loader.is_loading=!0;var n=this.bra_service(this.module,"list_wallet_log",!0),o=a.params;o.page=a.loader.page,o.unit_type=this.unit_type;var i=this.fetch(n,o);i.then(function(n){t.stopPullDownRefresh(),a.loader.has_more=n.data.data.length>0,a.loader.is_loading=!1,a.loader.has_more&&a.loader.page++,a.items=1===e?n.data.data:a.items.concat(n.data.data)},function(t){a.loader.is_loading=!1})}}},watch:{unit_type:function(t){this.bra_list_res(1)}}};e.default=a}).call(this,a("543d")["default"])},bc30:function(t,e,a){"use strict";a.r(e);var n=a("a66b"),o=a.n(n);for(var i in n)"default"!==i&&function(t){a.d(e,t,function(){return n[t]})}(i);e["default"]=o.a},c305:function(t,e,a){"use strict";var n=a("0b4a"),o=a.n(n);o.a},f450:function(t,e,a){"use strict";a.r(e);var n=a("6087"),o=a("bc30");for(var i in o)"default"!==i&&function(t){a.d(e,t,function(){return o[t]})}(i);a("c305");var l,r=a("f0c5"),u=Object(r["a"])(o["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],l);e["default"]=u.exports}},[["4d27","common/runtime","common/vendor"]]]);