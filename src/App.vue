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
		<!-- 保留状态 -->
		<keep-alive>
			<router-view :seller="seller"></router-view>
		</keep-alive>
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
						// console.log(queryParm.id); // 拿到 id 值 
						return queryParm.id;
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
				this.$ajax.get("/apis/seller?id="+ this.seller.id)  // 拼接请求路径 （当然这里是假的）
					.then(response => {
						// console.log(response.data);
						if (response.data.errno == ERR_OK) {
							// this.seller = response.data.data;
							// Object.assign 合并对象 一共三个参数
							this.seller = Object.assign({}, this.seller, response.data.data);  // 合并对象
							
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