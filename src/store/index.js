import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)

import dialog_stroe from './dialog_store'

export default new vuex.Store({
    // modules: {
    //     dialog: dialog_stroe
    // },
    state: {
        show: false
    },
    mutations: {
        changeShow(state) { // 这里的state对应着上面这个state
            state.show = state.show ? false : true;
        }
    },
    action: {
        changeShowAction(context) { // 这里的context和我们使用的$store拥有相同的对象和方法
            context.commit('changeShow')
            // 你还可以在这里触发其他的mutations方法
        }
    }

})