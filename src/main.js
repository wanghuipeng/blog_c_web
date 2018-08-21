// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入ele组件及样式
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入font-awesome字体图标样式
import 'font-awesome/css/font-awesome.min.css'
// 引入公共样式
import './assets/css/common.less'
// 引入设置的store
import store from './store'
//引入设置的axios
import axios from "./assets/js/api";
Vue.prototype.$ajax = axios;

Vue.config.productionTip = false
Vue.use(ElementUI)

// 防止多次提交表单
Vue.directive('dbClick', {
    inserted(el, binding) {
        el.addEventListener('click', e => {
            if (!el.disabled) {
                el.disabled = true;
                let timer = setTimeout(() => {
                    el.disabled = false;
                }, 2500)
            }
        })
    }
})

// 本地没有user值，重定位到登录页
// router.beforeEach((to, from, next) => {
//     if (to.path === '/login') {
//         sessionStorage.clear()
//     }
//     let user = JSON.parse(sessionStorage.getItem('user'))
//     if (!user && to.path !== '/login') {
//         next({ path: '/login' })
//     } else {
//         next()
//     }
//     // 该账号的菜单项中无此路由名称时跳转至404页面
//     let menu = JSON.parse(sessionStorage.getItem('menu'))
//     if (menu && Object.values(menu).indexOf(to.path.substring(1)) === -1) {
//         next({ path: '/notFound' })
//     } else {
//         next()
//     }
// })

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})