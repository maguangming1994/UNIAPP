(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/yxm/user/my_poster"],{"02d5":function(e,t,a){"use strict";(function(e){a("5e7b"),a("921b");n(a("66fd"));var t=n(a("d41a"));function n(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,a("543d")["createPage"])},"1b68":function(e,t,a){"use strict";var n,o=function(){var e=this,t=e.$createElement;e._self._c},i=[];a.d(t,"b",function(){return o}),a.d(t,"c",function(){return i}),a.d(t,"a",function(){return n})},"37be":function(e,t,a){"use strict";a.r(t);var n=a("c106"),o=a.n(n);for(var i in n)"default"!==i&&function(e){a.d(t,e,function(){return n[e]})}(i);t["default"]=o.a},c106:function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=i(a("6444")),o=a("7424");function i(e){return e&&e.__esModule?e:{default:e}}var r=function(){return a.e("bra/common/item_qrcode2").then(a.bind(null,"958e"))},s=function(){return a.e("bra/common/canvasdrawer").then(a.bind(null,"12e3"))},u={components:{item_qrcode2:r,canvasdrawer:s},data:function(){return{page_name:"yxm_user_my_poster",module:"yxm",is_page_loaded:!1,page_data:{},ifShow:!0,val:"",size:350,unit:"upx",background:"#b4e9e2",foreground:"#309286",pdground:"#32dbc6",icon:"",onval:!1,painting:{},shareImage:"",img:""}},onLoad:function(){},onShow:function(){this.is_page_loaded||this.onMhcmsPull()},methods:{onMhcmsPull:function(){var t=this;this.bra_common_page(this.module,this.page_name,{},!0,function(a){t.page_data=t.elements.page_data,t.val=t.bra_web("bra_app","index","share_install",{refer:t.page_data.user.id,appid:t.site_info.bra_app_id}),t.img=n.default.createQrCodeImg(t.val,{size:parseInt(t.size)}),(0,o.base64ToPath)(n.default.createQrCodeImg(t.val,{size:parseInt(t.size)})).then(function(e){t.val=e,console.log(e)}).catch(function(e){console.error(e)}),console.log(t.val),t.is_page_loaded=!0,e.stopPullDownRefresh()})},capture:function(){var t=getCurrentPages(),a=t[t.length-1];console.log(t);var n=null,o=a.$getAppWebview();n=new plus.nativeObj.Bitmap("amway_img"),o.draw(n,function(){console.log("截屏绘制图片成功"),n.save("_doc/"+Math.random()+"a.jpg",{},function(t){console.log("保存图片成功："+JSON.stringify(t)),e.saveImageToPhotosAlbum({filePath:t.target,success:function(){n.clear(),e.showToast({title:"保存图片成功",mask:!1,duration:1500})}})},function(e){console.log("保存图片失败："+JSON.stringify(e))})},function(e){console.log("截屏绘制图片失败："+JSON.stringify(e))})},eventDraw:function(){e.showLoading({title:"绘制分享图片中",mask:!0}),this.painting={width:375,height:555,clear:!0,views:[{type:"image",url:this.page_data.cover,top:0,left:0,width:375,height:555},{type:"image",url:this.val,top:400,left:136,width:100,height:100},{type:"text",content:"推荐人:"+this.page_data.user.nickname,fontSize:16,color:"#402D16",textAlign:"left",top:360,left:96,bolder:!0},{type:"text",content:"手机号码:"+this.page_data.user.mobile[0]+this.page_data.user.mobile[1]+this.page_data.user.mobile[2]+"*******"+this.page_data.user.mobile[9]+this.page_data.user.mobile[10],fontSize:15,color:"#563D20",textAlign:"left",top:380,left:96}]}},eventSave:function(){if(!this.shareImage)return this.show_toast("请先生成海报");e.saveImageToPhotosAlbum({filePath:this.shareImage,success:function(t){e.showToast({title:"保存图片成功",icon:"success",duration:2e3})}})},eventGetImage:function(t){e.hideLoading();var a=t.tempFilePath,n=t.errMsg;"canvasdrawer:ok"===n&&(this.page_data.cover=this.shareImage=a,this.painting={})}}};t.default=u}).call(this,a("543d")["default"])},d41a:function(e,t,a){"use strict";a.r(t);var n=a("1b68"),o=a("37be");for(var i in o)"default"!==i&&function(e){a.d(t,e,function(){return o[e]})}(i);var r,s=a("f0c5"),u=Object(s["a"])(o["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],r);t["default"]=u.exports}},[["02d5","common/runtime","common/vendor"]]]);