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
import frontEnd from '@/components/frontEnd/frontEnd'
import backEnd from '@/components/backEnd/backEnd'
import chain from '@/components/chain/chain'
import search from '@/components/common/search'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            redirect: '/index'
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
                },
                // 前端
                {
                    path: '/frontEnd',
                    name: 'frontEnd',
                    component: frontEnd
                },
                // 后端
                {
                    path: '/backEnd',
                    name: 'backEnd',
                    component: backEnd
                },
                // 区块链
                {
                    path: '/chain',
                    name: 'chain',
                    component: chain
                },
                // 搜索结果页
                {
                    path: '/search',
                    name: 'search',
                    component: search
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