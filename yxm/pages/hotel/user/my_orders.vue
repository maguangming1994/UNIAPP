<style lang="scss">
	#user {

	}

	.user-nos{
		.no{
			font-size: 36upx;
		}
		.txt{
			font-size: 24upx;
			color: #697685;
		}
		padding-bottom:37upx;
	}

	.menus{
		padding-left: 33upx;
		padding-right: 33upx;

		position: relative;
		background: #fff;
		font-size: 32upx;
		.item-menu{
			border-bottom: solid 1px #f0f5fb;
		}

		.icon-item{
			img{
				width: 50upx;
				height: 50upx;
				vertical-align: middle;
				margin-right: 24upx;
			}
		}
	}
	.is-bg-orange{
		background: #ff7528;
	}

</style>
<template>
	<view class="full_screen is-clipped" style="height:auto">

		<div class="bta-tabs columns is-mobile has-text-centered is-marginless orange f14 has-background-white" style="line-height:80upx">
			<div class="bta-tab column" @click="status=''" :class="{'bra-active' : status == ''}">全部</div>
			<div class="bta-tab column" @click="status=1" :class="{'bra-active' : status == 1}">待支付</div>
			<div class="bta-tab column" @click="status=2" :class="{'bra-active' : status == 2}">代入住</div>
			<div class="bta-tab column" @click="status=99" :class="{'bra-active' : status == 99}">已完成</div>
		</div>
<div class="bk10"></div>

		<view  v-for="item in items">
			<div
				 class="bra-radius-5 hotel bra-pic-item has-background-white  padded bb10" style="margin:0 15px ">
				<div class="columns is-mobile is-gapless is-marginless bb1 padded-v" @click="onNav" :data-url="'/pages/hotel/user/order_detail?id='+ item.id">
					<div class="column is-narrow">
						<div class="img has-shadow" style="width:40px;height:40px;margin-right:10px">
							<image v-if="item.store.logo[0]" style="width:40px;height:40px" :src="item.store.logo[0].url" mode="aspectFill"></image>
						</div>
					</div>
					<div class="column f14" style="width:0">
						<div class="f14 fb">{{item.store.title}}
							<span class="has-text-danger f14 is-pulled-right">
								<span style="font-size:10px;color:#333;font-weight:normal">含押金</span> <span class="iconfont icon-renminbi1688"></span> {{item.money}}

							</span>
						</div>
						<div class="has-text-left margined-v">
							<view >
								{{item.rooms}} 间 , {{item.room_type_id}}

								<span class="has-text-info f14 is-pulled-right">{{item.status}}</span>
							</view>

						</div>

						<div class="has-text-left">
							<view class="has-text-grey f12">
								{{item.create_at}}
							</view>

						</div>

					</div>
				</div>
				<div class="column is-12 bra-pic-list-footer f12 padded-t has-text-right">
					<div @click="delete_order(item)" class="bra-btn margined-h mini is-inline-block orange" v-if="item.old_data.status==6 || item.old_data.status==5">删除订单</div>
					<div @click="onNav"
						 :data-url="'/pages/hotel/index/hotel_detail?id='+ item.store.id" class="bra-btn margined-h mini is-inline-block orange">再次预定</div>
					<div @click="cancel_order(item)" class="bra-btn margined-h mini is-inline-block orange" v-if="item.old_data.status==1">取消订单</div>
					<div @click="pay_order(item)" class="bra-btn margined-h mini is-inline-block orange" v-if="item.old_data.status==1">立刻支付</div>

				</div>
			</div>

			<div class="bk10"></div>
		</view>
		<view class="page-tips">
			<div class="weui-loadmore weui-loadmore_line">
				<span class="weui-loadmore__tips">暂无数据</span>
			</div>
		</view>

	</view>


</template>


<script>

	export default {
		data() {
			return {
				page_name: 'hotel_user_my_orders',
				module: 'hotel',
				is_page_loaded: false,
				page_data: {} ,
				params: {},
				items: [],
				loader: {
					is_loading: false,
					has_more: true,
					page: 1
				},
				status : '' ,

			};
		},
		onLoad() {
		},
		onShow() {
			if(!this.is_page_loaded){
				this.onMhcmsPull();
			}
		},

		onPullDownRefresh() {
			this.onMhcmsPull();
			uni.stopPullDownRefresh();
		},
		onReachBottom: function () {

			this.bra_list_res(0);
		},

		methods: {
			delete_order : function(item){
				uni.showModal({
					title: '警告',
					cancelText : '取消' ,
					confirmText : '删除' ,
					content: '您好 您确定要删除订单吗!',
					success:  (res) => {
						if (res.confirm) {
							let params = {};
							params.id = item.id;
							this.bra_common_page(this.module, 'hotel_order_delete', params, true, (ret) => {
								console.log(ret)

								let data = ret.data.page_data;
								this.show_toast(data.msg);
								if(data.code == 1){

									return this.onMhcmsPull();
								}else{
									return this.show_toast(data.msg);
								}

							} , 'post' , false);
						}
					}
				});
			},
			cancel_order : function(item){
				uni.showModal({
					title: '警告',
					cancelText : '关闭' ,
					confirmText : '取消订单' ,
					content: '您好 您确定要取消订单吗!',
					success:  (res) => {
						if (res.confirm) {
							let params = {};
							params.id = item.id;
							this.bra_common_page(this.module, 'hotel_order_cancel', params, true, (ret) => {
								console.log(ret)

								let data = ret.data.page_data;
								this.show_toast(data.msg);
								if(data.code == 1){

									return this.onMhcmsPull();
								}else{
									return this.show_toast(data.msg);
								}

							} , 'post' , false);
						}
					}
				});
			},
			pay_order : function(item){
				console.log(item);
				return this.get_app_pay_params(item.order_id, 'micropay', (orderInfo) => {
					console.log(JSON.stringify(orderInfo));
					uni.requestPayment({
						provider: 'wxpay',
						orderInfo: JSON.stringify(orderInfo),
						success: (res) => {
							this.show_toast('支付完成');
							this.onNav({
								url : '/pages/hotel/user/index',
								type : 'switch'
							});
							console.log('success:' + JSON.stringify(res));
						},
						fail: (err) => {
							console.log('fail:' + JSON.stringify(err));

							this.show_toast('支付失败！');

							this.onNav({
								url : '/pages/hotel/user/index',
								type : 'switch'
							});
						}
					});

				})
			},
			onMhcmsPull() {
				let params = {};
				console.log(params)
				this.bra_common_page(this.module, this.page_name, params, true, (data) => {
					this.page_data = this.elements.page_data;
					this.is_page_loaded = true;
					this.bra_list_res(1);
					uni.stopPullDownRefresh();
				});
			},

			bra_list_res: function (init) {

				let $this = this;
				if (init === 1) {
					$this.items = [];
					$this.loader.page = 1;
					$this.loader.is_loading = false;
					$this.loader.has_more = true;
				}

				if ($this.loader.is_loading || !$this.loader.has_more) {
					return;
				}
				$this.loader.is_loading = true;


				let params = $this.params;
				params.page = $this.loader.page;
				params.status = this.status;
				this.bra_common_page(this.module, this.page_name, params, true, (ret) => {

					let data = ret.data.page_data;
					console.log(ret);
					this.is_page_loaded = true;

					$this.loader.has_more = data.data.length > 0;
					$this.loader.is_loading = false;

					if ($this.loader.has_more) {
						$this.loader.page++;
					}

					$this.items = init === 1 ? data.data : $this.items.concat(data.data);

					uni.stopPullDownRefresh();
				}, 'post', false);

			},
		} ,
		watch : {
			status : function (new_status) {
				this.onMhcmsPull();
			}
		}
	}
</script>

