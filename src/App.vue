<template>
	<div id="app">
		<!-- 父组件传参数到子组件 -->
		<Header :seller="seller"></Header>
		<div class="tab border-1px">
			<div class="tab-item">
				<router-link to="/goods">商品</router-link>
			</div>
			<div class="tab-item">
				<router-link to="/ratings">评价</router-link>
			</div>
			<div class="tab-item">
				<router-link to="/sellers">商家</router-link>
			</div>
		</div>
		<router-view :seller="seller"></router-view>
	</div>
</template>

<script>
	import Header from "./components/header/header";
	import {urlParse} from './common/js/util.js';
	const ERR_OK = 0;
	export default {
		//   name: "App",
		data() {
			return {
				seller: {
					id:(()=>{
						let queryParm = urlParse();
						return queryParm;
					})()
				}
			};
		},
		created() {
			this.getSeller();
			this.ad()
		},
		methods: {
			getSeller() {
				this.$ajax.get("/apis/seller")
					.then(response => {
						// console.log(response.data);
						if (response.data.errno == ERR_OK) {
							// this.seller = response.data.data;
							this.seller = Object.assign({}, this.seller, response.data.data);
							// console.log(this.seller);
						}
					}).catch(response => {
						console.log(response);
					});
			},
			ad(){
				urlParse();
			}
		},
		components: {
			Header: Header
		}
	};
</script>

<style lang="scss" scoped="" type="text/scss">
	@import "../src/common/stylus/mixin";

#app {
	.tab {
		display: flex;
		width: 100%;
		height: 40px;
		@include border-px(rgba(7,17,27,0.1));
		.tab-item {
			height: 40px;
			line-height: 40px;
			flex: 1;
			text-align: center;
			& > a {
				display: block;
				font-size: 14px;
				line-height: 40px;
				color: rgb(77, 85, 93);
				&.active {
					color: red;
				}
			}
		}
	}
}
</style>