import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import store from '@/components/store.vue'

import goods from '@/components/goods/goods'
import ratings from '@/components/ratings/ratings'
import sellers from '@/components/sellers/sellers'
Vue.use(Router)

export default new Router({
	linkActiveClass: 'active',
	routes: [
		{
			path: '/',
			name: 'goods',
			component: goods
		},
		{
			path: '/goods',
			name: 'goods',
			component: goods
		},
		{
			path: '/ratings',
			name: 'ratings',
			component: ratings
		},
		{
			path: '/sellers',
			name: 'sellers',
			component: sellers
		}
	]
})
