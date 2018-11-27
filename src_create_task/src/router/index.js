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

// 任务详情
const task_detail = (resolve) => {
    import ('views/home/task_detail.vue').then((module) => {
        resolve(module)
    })
}

// 相关会员列表
const member_relative_list = (resolve) => {
    import ('views/home/member_relative_list.vue').then((module) => {
        resolve(module)
    })
}

// 会员列表
const member_result_list = (resolve) => {
    import ('views/home/member_result_list.vue').then((module) => {
        resolve(module)
    })
}

// 创建任务
const create_task = (resolve) => {
    import ('views/home/create_task.vue').then((module) => {
        resolve(module)
    })
}


export default new Router({
    routes: [{
            path: '/',
            component: Main,
            children: [
                {
                    path: '/',
                    name: '任务列表',
                    meta: {
                        title: "任务列表"
                    },
                    component: home
                },
                {
                    path: '/task_detail',
                    name: '任务详情',
                    meta: {
                        title: "任务详情"
                    },
                    component: task_detail
                },
                {
                    path: '/member_relative_list',
                    name: '相关会员列表',
                    meta: {
                        title: "相关会员列表"
                    },
                    component: member_relative_list
                },
                {
                    path: '/member_result_list',
                    name: '会员列表',
                    meta: {
                        title: "会员列表"
                    },
                    component: member_result_list
                },
                {
                    path: '/create_task',
                    name: '创建任务',
                    meta: {
                        title: "创建任务"
                    },
                    component: create_task
                }
                
            ]
        },
        {
            path: '/',
            redirect: '/publicContent',
        }
    ]
})