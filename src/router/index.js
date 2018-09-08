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

// 首页
const creat = (resolve) => {
    import ('views/home/creat.vue').then((module) => {
        resolve(module)
    })
}

// 首页
const publicContent = (resolve) => {
    import ('views/home/publicContent.vue').then((module) => {
        resolve(module)
    })
}

// 首页
const personCreat = (resolve) => {
    import ('views/home/personCreat.vue').then((module) => {
        resolve(module)
    })
}

// 搜索
const searchContent = (resolve) => {
    import ('views/home/searchContent.vue').then((module) => {
        resolve(module)
    })
}

export default new Router({
    routes: [
        {
            path: '/',
            component: Main,
            children: [{
                    path: '/',
                    name: 'home',
                    meta: {
                        title: "话述"
                    },
                    component: home
                },
                {
                    path: '/creat',
                    name: 'creat',
                    meta: {
                        title: "创建新内容"
                    },
                    component: creat
                },
                {
                    path: '/publicContent',
                    name: 'publicContent',
                    meta: {
                        title: "话述"
                    },
                    component: publicContent
                },
                {
                    path: '/personCreat',
                    name: 'personCreat',
                    meta: {
                        title: "话述"
                    },
                    component: personCreat
                },
                {
                    path: '/searchContent',
                    name: 'searchContent',
                    meta: {
                        title: "搜索"
                    },
                    component: searchContent
                }
            ]

        },
        {
            path: '/',
            redirect: '/publicContent',
        }
    ]
})