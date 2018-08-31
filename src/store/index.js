import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

const state = {
    keyword: '', //搜索关键字
    loginDialogVisible: false, //登录弹框
    registDialogVisible: false, //登录弹框
    userName: '', //用户名
    account: '' //账户名（手机或邮箱）
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})