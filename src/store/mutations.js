export default {
    // 设置表格的loading隐藏
    setLoadingFalse(state) {
        state.isLoading = false
    },
    // 设置表格的loading显示
    setLoadingTrue(state) {
        state.isLoading = true
    },
    // 获取tab标签切的切换名称
    setActiveTabName(state, data) {
        state.activeTabName = data
    },
    // 设置excel导出状态
    setExportTrue(state) {
        state.isExport = true
    },
    // 触发excel不导出状态
    setExportFalse(state) {
        state.isExport = false
    }
}