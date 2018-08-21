import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

const state = {
    isLoading: true, //表格loading状态
    activeTabName: '', //标签页名称
    isExport: false //是否触发excel导出的标识
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})