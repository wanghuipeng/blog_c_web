import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import login from '@/components/login'
import notFound from '@/components/notFound'
import index from '@/components/index/index'
import technology from '@/components/technology/technology'
import life from '@/components/life/life'
import thoughts from '@/components/thoughts/thoughts'
import memo from '@/components/memo/memo'
import blogDetail from '@/components/common/detail'
Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'home',
            component: home
        },
        {
            path: '/home',
            name: 'home',
            component: home,
            children: [
                // 首页
                {
                    path: '/index',
                    name: 'index',
                    component: index
                },
                // 博客详情
                {
                    path: '/blogDetail',
                    name: 'blogDetail',
                    component: blogDetail
                },
                // 技术
                {
                    path: '/technology',
                    name: 'technology',
                    component: technology
                },
                // 生活
                {
                    path: '/life',
                    name: 'life',
                    component: life
                },
                // 感想
                {
                    path: '/thoughts',
                    name: 'thoughts',
                    component: thoughts
                },
                // 备忘
                {
                    path: '/memo',
                    name: 'memo',
                    component: memo
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path: '*',
            component: notFound
        }
    ]
})