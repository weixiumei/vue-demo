import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 大背景页
const Main = (resolve) => {
    import ('@/main/main.vue').then((module) => {
        resolve(module)
    })
}

// 首页
const home = (resolve) => {
    import ('views/home/index.vue').then((module) => {
        resolve(module)
    })
}


export default new Router({
    routes: [{
            path: '/',
            component: Main,
            children: [{
                    path: '/',
                    name: 'home',
                    meta: {
                        title: "查看任务列表"
                    },
                    component: home
                }
            ]
        },
        {
            path: '/',
            redirect: '/publicContent',
        }
    ]
})