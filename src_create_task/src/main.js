// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import Weui from 'weui'
import Vueui from 'vue-weui'
import 'common/util/rem.js'
import Loading from 'components/loading.js'

import '@/common/style/common.less'
import '@/common/style/weui.css'
import '@/common/style/base.css'
import '@/common/style/reset.css'
import '@/common/style/loading.css'

Vue.use(Loading)
Vue.use(Vuex)
Vue.use(Weui)
Vue.use(Vueui)
Vue.config.productionTip = false

//设置每个子页面的标题
router.beforeEach((to, from, next) => {
    window.document.title = to.meta.title;
    next();
})
const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        increment (state) {
            state.count++
        }
    }
})
console.log(store.state.count)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})